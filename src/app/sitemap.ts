import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { serviceDetails } from "./services/[slug]/service-data";
import { serviceAreas } from "@/lib/service-areas";

const BASE_URL = "https://meticulous802.com";

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/**
 * "July 2026" -> Date(2026-07-01). Returns null on anything unrecognised.
 *
 * Parsed explicitly rather than via `new Date(p.date)`: engine handling of
 * non-ISO date strings is implementation-defined, and a sitemap is the wrong
 * place to find out that a runtime disagreed.
 */
function parsePostMonth(raw: string): Date | null {
  const m = /^\s*([A-Za-z]+)\s+(\d{4})\s*$/.exec(raw ?? "");
  if (!m) return null;
  const month = MONTHS[m[1].toLowerCase()];
  if (month === undefined) return null;
  const year = Number(m[2]);
  if (!Number.isInteger(year) || year < 2000 || year > 2100) return null;
  return new Date(Date.UTC(year, month, 1));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceDetails.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const areaRoutes: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE_URL}/service-areas/${a.slug}`,
    lastModified: new Date(a.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Blog lastmod comes from each post's own publish date, NOT `now`.
  //
  // Until 2026-07-29 this used `lastModified: now`, so every rebuild stamped all
  // 23 posts with the build date — the live sitemap showed 23 identical
  // 2026-07-28 stamps while the rest of the site correctly spanned 07-02..07-28.
  // A blanket lastmod is a false freshness claim on every post at once, and it
  // teaches Google to distrust lastmod site-wide (the same rule already applied
  // to JL Tile's sitemap). `areaRoutes` above always got this right.
  //
  // `date` is month-precision prose ("July 2026"), so this resolves to the first
  // of that month. That understates recency for a post edited later, which is
  // the safe direction to be wrong — overstating it is the actual harm.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => {
    const published = parsePostMonth(p.date);
    return {
      url: `${BASE_URL}/blog/${p.slug}`,
      // Omitted rather than faked when the date string is unrecognised: no
      // lastmod is honest, a wrong one is not.
      ...(published ? { lastModified: published } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  const serviceCityRoutes: MetadataRoute.Sitemap = serviceAreas.flatMap((a) =>
    serviceDetails.map((s) => ({
      url: `${BASE_URL}/service-areas/${a.slug}/${s.slug}`,
      lastModified: new Date(a.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...serviceCityRoutes, ...blogRoutes];
}

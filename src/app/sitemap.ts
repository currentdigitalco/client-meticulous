import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { serviceDetails } from "./services/[slug]/service-data";
import { serviceAreas } from "@/lib/service-areas";

const BASE_URL = "https://meticulous802.com";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

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

/**
 * "2026-10-05" -> Date(2026-10-05T00:00Z). Returns null on anything else,
 * including a calendar-impossible day, so a typo in a data file becomes an
 * omitted lastmod rather than a wrong one.
 */
function parseIsoDay(raw: string | undefined): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw ?? "");
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]) - 1;
  const day = Number(m[3]);
  const date = new Date(Date.UTC(year, month, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
    return null;
  }
  return date;
}

/** The lastmod field only when there is a real date: an omitted lastmod is honest, a faked one is not. */
function lastmod(date: Date | null): { lastModified?: Date } {
  return date ? { lastModified: date } : {};
}

/**
 * Last real change per static route: the last commit that changed the route's
 * own page module, maintained by hand because these pages have no data-file
 * date of their own. NEVER `new Date()`. Until 2026-10-06 these routes and the
 * nine service hubs were stamped with the build time, so 16 URLs claimed a
 * change on every deploy while the 2026-10-05 rewrite of 30 posts reported
 * nothing, and Google honoured 8% of the sitemap's claims (127 claimed since
 * 2026-09-22, 10 crawled). Site-wide layout and schema commits are deliberately
 * not counted: stamping all 250 URLs for a layout tweak is the same false
 * signal. Understating is the safe direction. Bump a date here when that
 * page's own content changes.
 */
const STATIC_LASTMOD: Record<string, string> = {
  "/": "2026-10-06", // in-season links row on the homepage panels
  "/about": "2026-08-06", // og:url fix (1039674); copy last changed 2026-04-07
  "/services": "2026-09-15", // title + meta pass (351bf76); fall cleanup listed 2026-08-06
  "/service-areas": "2026-08-06", // lists the 9 hubs: fall cleanup added (2044bb9)
  "/portfolio": "2026-08-06", // og:url fix (1039674); photos 2026-04-03
  "/contact": "2026-08-06", // og:url fix (1039674); form 2026-05-12
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Blog lastmod is the post's own date, NOT `now`.
  //
  // Until 2026-07-29 this used `lastModified: now`, so every rebuild stamped all
  // 23 posts with the build date. A blanket lastmod is a false freshness claim
  // on every post at once, and it teaches Google to distrust lastmod site-wide.
  // From 2026-07-29 to 2026-10-06 it was the publish month, which hid every
  // later edit: the 2026-10-05 company-voice rewrite of 30 posts showed as
  // zero posts changed in October. Now: `updated` (the post's last real change)
  // when set, else `datePublished`, else the first of the "Month Year" string.
  // Understating recency is the safe direction to be wrong; overstating it is
  // the actual harm.
  const blogEntries = blogPosts.map((p) => {
    const published = parseIsoDay(p.datePublished) ?? parsePostMonth(p.date);
    const changed = parseIsoDay(p.updated);
    // A stale `updated` must never understate the publish date.
    const date = changed && (!published || changed >= published) ? changed : published;
    return { slug: p.slug, published, date };
  });

  // /blog lists every post, so it last changed when the newest post was
  // published. Title and excerpt rewrites are not counted (a body-only edit
  // leaves the index unchanged, and the data cannot tell the two apart), which
  // again errs on the understating side.
  const publishTimes = blogEntries
    .map((e) => e.published)
    .filter((d): d is Date => d !== null)
    .map((d) => d.getTime());
  const blogIndexDate = publishTimes.length ? new Date(Math.max(...publishTimes)) : null;

  const staticRoute = (
    path: string,
    changeFrequency: ChangeFrequency,
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}${path}`,
    ...lastmod(parseIsoDay(STATIC_LASTMOD[path])),
    changeFrequency,
    priority,
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    staticRoute("/", "weekly", 1.0),
    staticRoute("/about", "monthly", 0.8),
    staticRoute("/services", "monthly", 0.9),
    staticRoute("/service-areas", "monthly", 0.8),
    staticRoute("/portfolio", "monthly", 0.7),
    { url: `${BASE_URL}/blog`, ...lastmod(blogIndexDate), changeFrequency: "weekly", priority: 0.7 },
    staticRoute("/contact", "yearly", 0.6),
  ];

  // Service hubs: each hub's own `lastUpdated` (title/meta, copy, Q&A, related
  // posts), omitted when a hub has none. Was `now` until 2026-10-06.
  const serviceRoutes: MetadataRoute.Sitemap = serviceDetails.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    ...lastmod(parseIsoDay(s.lastUpdated)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Town pages render the town's `localContext`, which the weekly sweep
  // refreshes together with `lastUpdated`, so the town's date is the page's.
  const areaRoutes: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE_URL}/service-areas/${a.slug}`,
    ...lastmod(parseIsoDay(a.lastUpdated)),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogEntries.map((e) => ({
    url: `${BASE_URL}/blog/${e.slug}`,
    ...lastmod(e.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Service x city pages carry NO lastmod. Each one is a composition of the
  // generated pair copy (2026-05-28; fall cleanup 2026-08-06), the service
  // Q&A (2026-09-15) and one to three sentences borrowed from the town, and no
  // field holds the page's own date. Until 2026-10-06 they inherited the
  // TOWN's `lastUpdated`, so the 2026-10-01 sweep of six `localContext`
  // strings stamped 54 matrix pages that re-render a borrowed sentence or
  // two, and Google crawled 1 of them. Omitted until the generator records a
  // per-pair date: an omitted lastmod is honest, an inherited one was not.
  const serviceCityRoutes: MetadataRoute.Sitemap = serviceAreas.flatMap((a) =>
    serviceDetails.map((s) => ({
      url: `${BASE_URL}/service-areas/${a.slug}/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...serviceCityRoutes, ...blogRoutes];
}

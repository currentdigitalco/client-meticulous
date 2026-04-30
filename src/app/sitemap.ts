import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { serviceDetails } from "./services/[slug]/service-data";
import { serviceAreas } from "@/lib/service-areas";

const BASE_URL = "https://meticulous802.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
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

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

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

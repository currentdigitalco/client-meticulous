import type { Metadata } from "next";

const SITE = "https://meticulous802.com";

const DEFAULT_OG_IMAGE = {
  url: `${SITE}/images/hero-landing.jpeg`,
  width: 1920,
  height: 1072,
  alt: "Meticulous LLC — complete property care in Rutland County, Vermont",
};

/**
 * Build a COMPLETE Open Graph object so every page emits og:title, og:type,
 * og:url, and og:image. Next.js does NOT field-merge a child route's openGraph
 * into the parent's, so any route that sets openGraph must supply all four
 * itself or Ahrefs flags "Open Graph tags incomplete". Setting `url` to the
 * page's own canonical also keeps og:url === canonical (fixes the
 * "Open Graph URL not matching canonical" warning).
 */
export function buildOpenGraph({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  /** Absolute path beginning with "/", matching the page's canonical. */
  path: string;
  /** Page-relevant image path or URL; falls back to the site hero. */
  image?: string;
  type?: "website" | "article";
}): NonNullable<Metadata["openGraph"]> {
  const url = `${SITE}${path}`;
  const images = image
    ? [{ url: image.startsWith("http") ? image : `${SITE}${image}` }]
    : [DEFAULT_OG_IMAGE];
  return { title, description, type, url, images };
}

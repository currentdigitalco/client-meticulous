import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildOpenGraph } from "@/lib/og";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";
import { BlogPostPage } from "./blog-post-page";

type Params = { slug: string };

const BASE = "https://meticulous802.com";
const AUTHOR = "Daniel Villarreal";
const PUBLISHER_ID = `${BASE}/#organization`;

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractFaqs(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const question = stripTags(m[1]);
    const answer = stripTags(m[2]);
    if (question.endsWith("?")) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

function extractCapsule(html: string): string {
  const m = html.match(/<p[^>]*data-speakable[^>]*>([\s\S]*?)<\/p>/i);
  if (m) return stripTags(m[1]);
  const first = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return first ? stripTags(first[1]) : "";
}

// Rough word-count -> ISO 8601 duration for schema.wordCount / timeRequired.
function wordCount(html: string): number {
  return stripTags(html).split(/\s+/).filter(Boolean).length;
}

// Best-effort ISO date parse from strings like "July 2026" — day defaults to the 1st.
function parseIsoDate(dateStr: string): string {
  const parsed = new Date(dateStr + " 1");
  if (Number.isNaN(parsed.getTime())) return "2026-07-06";
  return parsed.toISOString().slice(0, 10);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Meticulous LLC Blog`,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: buildOpenGraph({
      title: post.title,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
      image: post.image,
      type: "article",
    }),
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${BASE}/blog/${post.slug}`;
  const datePublished = parseIsoDate(post.date);
  const dateModified = "2026-07-13";
  const capsule = extractCapsule(post.content);
  const faqs = extractFaqs(post.content);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.metaDescription,
    image: [`${BASE}${post.image}`],
    author: { "@type": "Person", name: AUTHOR, jobTitle: "Owner", url: BASE },
    publisher: { "@id": PUBLISHER_ID },
    datePublished,
    dateModified,
    articleSection: post.category,
    wordCount: wordCount(post.content),
    inLanguage: "en-US",
    url,
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]", "h3"],
    },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Speakable capsule is emitted as a hidden meta node so the crawler picks it up early. */}
      {capsule && (
        <meta name="description-capsule" content={capsule.slice(0, 320)} />
      )}
      <BlogPostPage post={post} />
    </>
  );
}

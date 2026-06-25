import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildOpenGraph } from "@/lib/og";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";
import { BlogPostPage } from "./blog-post-page";

type Params = { slug: string };

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

  return <BlogPostPage post={post} />;
}

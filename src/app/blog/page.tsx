import type { Metadata } from "next";
import { BlogPage } from "./blog-page";
import { buildOpenGraph } from "@/lib/og";

export const metadata: Metadata = {
  title: "Blog | Meticulous Mowing & Property Management",
  description: "Tips, insights, and project stories from Vermont's all-season property experts.",
  alternates: { canonical: "/blog" },
  openGraph: buildOpenGraph({
    title: "Blog | Meticulous Mowing & Property Management",
    description: "Tips, insights, and project stories from Vermont's all-season property experts.",
    path: "/blog",
  }),
};

export default function Blog() {
  return <BlogPage />;
}

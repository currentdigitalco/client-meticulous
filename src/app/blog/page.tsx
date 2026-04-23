import type { Metadata } from "next";
import { BlogPage } from "./blog-page";

export const metadata: Metadata = {
  title: "Blog | Meticulous Mowing & Property Management",
  description: "Tips, insights, and project stories from Vermont's all-season property experts.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return <BlogPage />;
}

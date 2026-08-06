import type { Metadata } from "next";
import { PortfolioPage } from "./portfolio-page";
import { buildOpenGraph } from "@/lib/og";

export const metadata: Metadata = {
  title: "Portfolio | Meticulous Mowing & Property Management",
  description: "Browse our project gallery — patios, fences, flooring, lawn care, snow removal and construction work across Vermont.",
  alternates: { canonical: "/portfolio" },
  openGraph: buildOpenGraph({
    title: "Portfolio | Meticulous Mowing & Property Management",
    description: "Browse our project gallery — patios, fences, flooring, lawn care, snow removal and construction work across Vermont.",
    path: "/portfolio",
  }),
};

export default function Portfolio() {
  return <PortfolioPage />;
}

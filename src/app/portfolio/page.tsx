import type { Metadata } from "next";
import { PortfolioPage } from "./portfolio-page";

export const metadata: Metadata = {
  title: "Portfolio | Meticulous Mowing & Property Management",
  description: "Browse our project gallery — patios, fences, flooring, lawn care, snow removal and construction work across Vermont.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return <PortfolioPage />;
}

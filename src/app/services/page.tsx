import type { Metadata } from "next";
import { ServicesPage } from "./services-page";
import { buildOpenGraph } from "@/lib/og";

// GSC 2026-09-15 (90d): 600 impr / 6 clicks / pos 11.6. The old title led with
// the generic word "Services" and the description named "six trades" including
// fencing and flooring, which are not on this page; it lists nine services.
const TITLE = "Property Services in Rutland County, VT | Meticulous";
const DESCRIPTION =
  "Property services in Rutland County, VT: grounds, landscaping, maintenance, fall cleanup, snow plowing, hardscaping, carpentry, housekeeping, rentals.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: buildOpenGraph({
    title: TITLE,
    description: DESCRIPTION,
    path: "/services",
  }),
};

export default function Services() {
  return <ServicesPage />;
}

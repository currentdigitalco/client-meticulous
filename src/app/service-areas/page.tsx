import type { Metadata } from "next";
import { serviceAreas } from "@/lib/service-areas";
import { serviceDetails } from "@/app/services/[slug]/service-data";
import { buildOpenGraph } from "@/lib/og";
import { ServiceAreasHub } from "./service-areas-hub";

const TITLE = "Service Areas in Rutland County, VT | Meticulous LLC";
const DESCRIPTION =
  "Meticulous LLC provides year-round property care across Rutland County, Vermont — Killington, Rutland, Brandon, Pittsford, Proctor, Wallingford and more. Find your town. Call 802-342-8293.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/service-areas" },
  openGraph: buildOpenGraph({
    title: TITLE,
    description: DESCRIPTION,
    path: "/service-areas",
  }),
};

export default function Page() {
  return <ServiceAreasHub areas={serviceAreas} services={serviceDetails} />;
}

import type { Metadata } from "next";
import { ServicesPage } from "./services-page";

export const metadata: Metadata = {
  title: "Services | Meticulous Mowing & Property Management",
  description: "Lawn care, hardscaping, fencing, flooring, snow removal & construction. Six trades, four seasons, one standard of excellence.",
};

export default function Services() {
  return <ServicesPage />;
}

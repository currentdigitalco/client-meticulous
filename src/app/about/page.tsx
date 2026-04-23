import type { Metadata } from "next";
import { AboutPage } from "./about-page";

export const metadata: Metadata = {
  title: "About | Meticulous LLC — Vermont Property Care Since 2009",
  description: "Owner-led, professionally credentialed, and GPS-tracked. Learn why Vermont property owners trust Meticulous LLC for complete year-round property care across Rutland County.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}

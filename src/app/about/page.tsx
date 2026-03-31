import type { Metadata } from "next";
import { AboutPage } from "./about-page";

export const metadata: Metadata = {
  title: "About | Meticulous Mowing & Property Management",
  description: "Since 2009, Meticulous has been Vermont's all-season property experts. Learn our story, values, and commitment to quality.",
};

export default function About() {
  return <AboutPage />;
}

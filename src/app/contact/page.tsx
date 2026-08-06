import type { Metadata } from "next";
import { ContactPage } from "./contact-page";
import { buildOpenGraph } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contact | Meticulous Mowing & Property Management",
  description: "Get in touch with Vermont's all-season property experts. Free consultations, transparent pricing.",
  alternates: { canonical: "/contact" },
  openGraph: buildOpenGraph({
    title: "Contact | Meticulous Mowing & Property Management",
    description: "Get in touch with Vermont's all-season property experts. Free consultations, transparent pricing.",
    path: "/contact",
  }),
};

export default function Contact() {
  return <ContactPage />;
}

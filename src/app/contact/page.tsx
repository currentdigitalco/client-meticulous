import type { Metadata } from "next";
import { ContactPage } from "./contact-page";

export const metadata: Metadata = {
  title: "Contact | Meticulous Mowing & Property Management",
  description: "Get in touch with Vermont's all-season property experts. Free consultations, transparent pricing.",
};

export default function Contact() {
  return <ContactPage />;
}

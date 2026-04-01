import type { Metadata } from "next";
import { WhyChooseUsPage } from "./why-choose-us-page";

export const metadata: Metadata = {
  title: "Why Choose Meticulous LLC | Reliable Property Care in Vermont",
  description:
    "Reliable service, clear communication, professional credentials, and GPS-tracked accountability. Learn why Vermont property owners trust Meticulous LLC for complete property care.",
};

export default function Page() {
  return <WhyChooseUsPage />;
}

import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meticulous Mowing & Property Management | Vermont's Premier Property Care",
  description:
    "Vermont's all-season property experts since 2009. Lawn care, hardscaping, fencing, flooring, snow removal & construction. One company, every season, done right. Call 802-342-8293.",
  keywords: [
    "Vermont property management",
    "lawn care Vermont",
    "hardscaping Vermont",
    "fence installation Vermont",
    "flooring installation Vermont",
    "snow removal Vermont",
    "Meticulous Mowing",
    "802 property care",
  ],
  openGraph: {
    title: "Meticulous Mowing & Property Management",
    description:
      "One company. Every season. Done right. Vermont's premier property care since 2009.",
    type: "website",
    locale: "en_US",
    url: "https://www.meticulous802.com",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Meticulous Mowing & Property Management, LLC",
    description:
      "Vermont's all-season property experts. Lawn care, hardscaping, fencing, flooring, snow removal & construction.",
    telephone: "+1-802-342-8293",
    areaServed: {
      "@type": "State",
      name: "Vermont",
    },
    foundingDate: "2009",
    slogan: "One Company. Every Season. Done Right.",
    serviceType: [
      "Lawn Care",
      "Hardscaping",
      "Fence Installation",
      "Flooring Installation",
      "Snow Removal",
      "Construction",
    ],
  };

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${satoshi.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

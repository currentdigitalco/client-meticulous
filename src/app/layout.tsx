import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://meticulous802.com"),
  title: "Meticulous LLC | Complete Property Care in Killington, Rutland & Vermont",
  description:
    "Complete property care built around higher standards. Grounds maintenance, snow & ice management, landscaping, construction, rental property support & more. Serving Rutland County since 2009. Call 802-342-8293.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Vermont property care",
    "grounds maintenance Vermont",
    "snow plowing Killington",
    "landscaping Rutland Vermont",
    "property maintenance Vermont",
    "rental property management Vermont",
    "hardscaping Vermont",
    "Meticulous LLC",
    "Rutland County property services",
  ],
  openGraph: {
    title: "Meticulous LLC | Complete Property Care",
    description:
      "Complete property care, built around higher standards. Serving Killington, Rutland & surrounding Vermont communities since 2009.",
    type: "website",
    locale: "en_US",
    url: "https://meticulous802.com",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/images/logo-m.png", type: "image/png" },
    ],
    shortcut: "/images/logo-m.png",
    apple: "/images/logo-m.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Meticulous LLC",
    description:
      "Complete property care built around higher standards. Grounds maintenance, landscaping, snow & ice management, hardscaping, carpentry, housekeeping, and rental property support.",
    telephone: "+1-802-342-8293",
    email: "getmeticulous@gmail.com",
    url: "https://meticulous802.com",
    areaServed: {
      "@type": "State",
      name: "Vermont",
    },
    foundingDate: "2009",
    slogan: "Meticulous isn't just our name. It's our standard.",
    serviceType: [
      "Grounds Maintenance",
      "Landscaping & Exterior Enhancements",
      "Property Maintenance",
      "Snow & Ice Management",
      "Hardscaping & Exterior Improvements",
      "Carpentry & Construction Services",
      "Housekeeping & Turnover Services",
      "Rental Property Support & Management",
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
        <Analytics />
      </body>
    </html>
  );
}

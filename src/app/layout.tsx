import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V4HN0DL14L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V4HN0DL14L');
          `}
        </Script>
      </head>
      <body>
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://meticulous802.com/#organization",
              name: "Meticulous LLC",
              url: "https://meticulous802.com",
              foundingDate: "2009",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-802-342-8293",
                email: "getmeticulous@gmail.com",
                contactType: "customer service",
                areaServed: "US-VT",
                availableLanguage: "English",
              },
            }),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://meticulous802.com/#website",
              url: "https://meticulous802.com",
              name: "Meticulous LLC",
              publisher: { "@id": "https://meticulous802.com/#organization" },
              inLanguage: "en-US",
            }),
          }}
        />
        <SmoothScroll />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

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
  title: "Lawn Care & Landscaping in Rutland County, VT | Meticulous LLC",
  description:
    "Lawn care, landscaping, grounds maintenance & snow management across Rutland County, Vermont — Killington to Rutland. Higher standards since 2009. Call 802-342-8293 for a fast quote.",
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
    images: [
      {
        url: "https://meticulous802.com/images/hero-landing.jpeg",
        width: 1920,
        height: 1072,
        alt: "Meticulous LLC — complete property care in Rutland County, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meticulous LLC | Complete Property Care",
    description:
      "Complete property care, built around higher standards. Serving Killington, Rutland & surrounding Vermont communities since 2009.",
    images: ["https://meticulous802.com/images/hero-landing.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const BASE = "https://meticulous802.com";
  const serviceAreaCities = [
    "Killington", "Rutland", "Woodstock", "Ludlow", "Pittsfield", "Chittenden",
    "Mendon", "Proctor", "West Rutland", "Brandon", "Castleton", "Wallingford",
    "Pittsford", "Clarendon", "Shrewsbury", "Tinmouth", "Florence", "Fair Haven",
    "Mount Holly",
  ];
  const services = [
    { name: "Grounds Maintenance", slug: "grounds-maintenance", desc: "Year-round lawn care, mowing, edging, leaf cleanup, and seasonal property upkeep across Rutland County, VT." },
    { name: "Landscaping & Exterior Enhancements", slug: "landscaping", desc: "Design and installation of garden beds, plantings, walkways, and exterior refresh work for Vermont homes." },
    { name: "Property Maintenance", slug: "property-maintenance", desc: "Ongoing maintenance for primary residences, second homes, and rental properties — eyes-on-the-ground service for remote owners." },
    { name: "Snow & Ice Management", slug: "snow-ice-management", desc: "Seasonal plow contracts with pre-dawn dispatch, sidewalk clearing, sanding, and ice management for Vermont's 200+ inch snow seasons." },
    { name: "Hardscaping & Exterior Improvements", slug: "hardscaping", desc: "Bluestone patios, retaining walls, fire pits, walkways, and outdoor living installations." },
    { name: "Carpentry & Construction Services", slug: "carpentry", desc: "Decks, fences, repair carpentry, and small-scale construction projects." },
    { name: "Housekeeping & Turnover Services", slug: "housekeeping", desc: "Hospitality-grade housekeeping and short-term rental turnovers for Killington-area and statewide vacation properties." },
    { name: "Rental Property Support & Management", slug: "rental-support", desc: "Full rental property support: turnovers, inspections, maintenance, snow, and grounds — one accountable team for absentee owners." },
  ];
  const realReviews = [
    { author: "Sarah M.", location: "Shelburne, VT", body: "They transformed our backyard from a bare lawn into a complete outdoor living space. The bluestone patio is stunning. Every neighbor has asked for their number." },
    { author: "Dave & Linda K.", location: "Burlington, VT", body: "15 years using Meticulous for everything — lawn care, snow removal, now flooring. One call handles it all. That kind of reliability is rare." },
    { author: "Tom R.", location: "Middlebury, VT", body: "Woke up after that February nor'easter and our entire driveway and walkway were already cleared. These guys don't wait for a phone call." },
    { author: "Jennifer P.", location: "Williston, VT", body: "The cedar privacy fence they built is absolutely beautiful. Set the posts deep, finished clean, and it was done two days ahead of schedule." },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BASE}/#business`,
    additionalType: "https://schema.org/LocalBusiness",
    name: "Meticulous LLC",
    legalName: "Meticulous Mowing & Property Management LLC",
    alternateName: "Meticulous",
    description:
      "Complete property care built around higher standards. Grounds maintenance, landscaping, snow & ice management, hardscaping, carpentry, housekeeping, and rental property support across Rutland County, Vermont since 2009.",
    telephone: "+1-802-342-8293",
    email: "getmeticulous@gmail.com",
    url: BASE,
    logo: `${BASE}/images/logo-m.png`,
    image: `${BASE}/images/hero-landing.jpeg`,
    priceRange: "$$",
    foundingDate: "2009",
    slogan: "Meticulous isn't just our name. It's our standard.",
    founder: {
      "@type": "Person",
      name: "Daniel Villarreal",
      jobTitle: "Owner",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "463 West St",
      addressLocality: "Rutland",
      addressRegion: "VT",
      postalCode: "05701",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6106,
      longitude: -72.9726,
    },
    areaServed: serviceAreaCities.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        // Woodstock & Ludlow are in Windsor County, not Rutland.
        name: ["Woodstock", "Ludlow"].includes(city)
          ? "Windsor County, Vermont"
          : "Rutland County, Vermont",
      },
    })),
    serviceArea: {
      "@type": "State",
      name: "Vermont",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property Care Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${BASE}/services/${s.slug}`,
          description: s.desc,
          provider: { "@id": `${BASE}/#business` },
          areaServed: { "@type": "State", name: "Vermont" },
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: realReviews.length,
      ratingCount: realReviews.length,
    },
    review: realReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author, address: r.location },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.body,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    paymentAccepted: ["Cash", "Check", "Credit Card", "ACH Transfer"],
    currenciesAccepted: "USD",
    knowsAbout: [
      "Property Care",
      "Grounds Maintenance",
      "Snow and Ice Management",
      "Plow Contract Dispatch",
      "Short-Term Rental Turnovers",
      "Hospitality-Grade Housekeeping",
      "Bluestone Patio Installation",
      "Hardscaping",
      "Cedar Fence Construction",
      "Mud Season Property Care",
      "Vermont Second-Home Management",
      "Killington Rental Property Support",
    ],
    award: [
      "16+ Years Serving Rutland County",
      "Year-Round Property Care",
      "Pre-Dawn Snow Dispatch",
    ],
    sameAs: [
      "https://www.google.com/maps?q=meticulous+llc+rutland+vt",
    ],
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${BASE}/#howto-spring-opening`,
    name: "How to Open a Vermont Second Home After Mud Season",
    description:
      "Step-by-step process Meticulous follows to ready Rutland County and Killington-area properties for the spring/summer season after the snow melts.",
    inLanguage: "en-US",
    totalTime: "PT4H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "350",
    },
    supply: [
      { "@type": "HowToSupply", name: "Gutter cleaning kit" },
      { "@type": "HowToSupply", name: "Pressure washer" },
      { "@type": "HowToSupply", name: "Replacement weather stripping" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Commercial-grade leaf blower" },
      { "@type": "HowToTool", name: "Extension ladder" },
      { "@type": "HowToTool", name: "Wet/dry shop vacuum" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Exterior walk-around inspection",
        text:
          "Walk the full perimeter checking for ice-dam damage, lifted shingles, displaced gutter sections, foundation cracks, and winter-killed shrubs. Photograph any damage and flag for repair before turf work begins.",
        url: `${BASE}/services/property-care`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Gutter and downspout clearance",
        text:
          "Remove winter debris from gutters and downspouts, flush with water, and confirm drainage flows away from the foundation. Reseat any gutter brackets loosened by ice load.",
        url: `${BASE}/services/property-care`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Lawn dethatch and first cut",
        text:
          "Dethatch winter matting, edge beds, and complete the season's first cut at 3.5 inches to encourage root recovery without stressing dormant grass. Bag clippings on the first pass only.",
        url: `${BASE}/services/lawn-care`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Hardscape and outdoor furniture reset",
        text:
          "Pressure-wash bluestone, patios, and walkways. Reposition outdoor furniture from winter storage, inspect for rot or rust, and confirm umbrella bases and grill connections are sound.",
        url: `${BASE}/services/hardscaping`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Interior turnover and systems check",
        text:
          "Run every faucet and flush every toilet to clear stagnant lines. Test HVAC switchover to AC, swap furnace filters, confirm smoke and CO detectors, and stage linens and welcome supplies for owner or guest arrival.",
        url: `${BASE}/services/property-care`,
      },
    ],
  };
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}/`,
    url: `${BASE}/`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]", ".speakable"],
    },
  };

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${satoshi.variable} antialiased`}
    >
      <head>
        {/* Preload LCP image (hero poster) so the first paint isn't blocked on the network */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-landing.jpeg"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V4HN0DL14L"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceAreas, getServiceAreaBySlug } from "@/lib/service-areas";
import type { ServiceArea } from "@/lib/service-areas";
import { serviceDetails, getServiceBySlug } from "@/app/services/[slug]/service-data";
import type { ServiceDetail } from "@/app/services/[slug]/service-data";
import { InnerLayout } from "@/components/shared/inner-layout";

// ── STATIC PARAMS ─────────────────────────────────────

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const area of serviceAreas) {
    for (const svc of serviceDetails) {
      params.push({ city: area.slug, service: svc.slug });
    }
  }
  return params;
}

// ── METADATA ──────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city, service } = await params;
  const area = getServiceAreaBySlug(city);
  const svc = getServiceBySlug(service);
  if (!area || !svc) return {};

  const title = `${svc.title} in ${area.name}, VT | Meticulous LLC`;
  const description = `${svc.title} in ${area.name}, Vermont. ${svc.seoDescription.split(".")[0]}. Serving ${area.region}. Call 802-342-8293.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://meticulous802.com/service-areas/${area.slug}/${svc.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://meticulous802.com/service-areas/${area.slug}/${svc.slug}`,
    },
  };
}

// ── CONTENT HELPERS ───────────────────────────────────

function getPageContent(area: ServiceArea, svc: ServiceDetail, variant: number) {
  const { name: city, landmarks, localContext, priorityServices, region } = area;
  const landmark = landmarks[0] ?? city;
  const isPriority = priorityServices.includes(svc.slug);
  const featuresShort = svc.features.slice(0, 4).join(", ");

  const intros = [
    // Variant 0 — "Why this service matters in this specific place"
    [
      isPriority
        ? `${svc.title} is one of the services we get called for most in ${city} — and the reason is specific to how ${city} properties work. ${localContext.split(".")[0]}.`
        : `${svc.title} in ${city} follows its own schedule, shaped by how Vermont properties in ${region} actually behave through the seasons. ${localContext.split(".")[0]}.`,
      `We cover ${featuresShort} — all of it scoped to what ${city} properties actually require. That means accounting for elevation, property type, and the owner situation specific to this town, not running the same playbook that works in a flat-state suburb.`,
      `Meticulous LLC has been working in ${region} long enough to know what ${city} properties need before the first visit. We're not estimating based on assumptions. We see the property, understand the scope, and set service levels that match.`,
    ],
    // Variant 1 — "Local challenges first"
    [
      `${city} has ${svc.title.toLowerCase()} challenges that a generic contractor from outside the area won't account for. ${localContext.split(".").slice(0, 2).join(". ")}.`,
      `We handle ${featuresShort} with crews who know the ${landmark} area and understand what ${region} properties go through over a full calendar year. Every service we offer here is sized and scheduled around the actual site — not a flat-rate package that ignores terrain.`,
      `The result: fewer callbacks, no surprises mid-project, and ${city} property owners who know exactly what they're getting before we start. Call 802-342-8293 to walk through your property and get a clear plan.`,
    ],
    // Variant 2 — "Owner context" framing
    [
      `Most property owners in ${city} we work with are either year-round residents who want consistent reliability, or second-home and rental owners who need a trusted local partner when they're not on-site. ${svc.title} looks different depending on which you are — and we approach it accordingly.`,
      `For ${city} properties near ${landmark}, we cover ${featuresShort}. Scope is based on the actual property: what it is, how it's used, and what the Vermont calendar demands from it. Nothing is templated.`,
      `${localContext.split(".")[0]}. We build service plans around that reality, not around what's easiest for the contractor. Meticulous LLC is a registered residential contractor and Property Management Firm in Vermont — properly licensed for everything we do here.`,
    ],
  ];

  return intros[variant];
}

function getServiceFAQs(
  area: ServiceArea,
  svc: ServiceDetail,
): { question: string; answer: string }[] {
  const { name: city, landmarks, region, slug: citySlug } = area;
  const landmark = landmarks[0] ?? city;
  const isMountain = ["killington", "ludlow", "pittsfield", "mount-holly", "shrewsbury"].includes(citySlug);
  const isLake = ["castleton", "chittenden"].includes(citySlug);
  const isUrban = citySlug === "rutland";
  const isHistoric = ["woodstock", "brandon", "proctor"].includes(citySlug);

  const credQ = {
    question: `Are you licensed and insured for ${svc.title.toLowerCase()} in Vermont?`,
    answer: `Yes. Meticulous LLC is a registered residential contractor and registered Property Management Firm in Vermont — properly licensed and insured for ${svc.title.toLowerCase()} and all services we provide in ${city} and the surrounding ${region} towns. Call 802-342-8293 to ask about coverage specifics.`,
  };

  switch (svc.slug) {
    case "snow-ice-management":
      return [
        {
          question: `When should I set up a snow contract for my ${city} property?`,
          answer: `September and October. We fill seasonal contracts before the ground freezes and our route capacity fills early. ${isMountain ? `${city} properties at elevation see more snow and longer winters than the valley — early signup matters.` : `${city} gets consistent winter snow, and contract holders get priority dispatch over one-off requests.`} Call 802-342-8293 to get on the schedule before the season starts.`,
        },
        {
          question: `Do you plow properties in the ${landmark} area of ${city}?`,
          answer: `Yes. The ${landmark} area and surrounding ${city} roads are within our regular routing. We match equipment to the property — long rural driveways, tight village lots, and commercial entryways each get appropriate machines, not whatever's available.`,
        },
        credQ,
      ];

    case "grounds-maintenance":
      return [
        {
          question: `When does the grounds maintenance season start in ${city}?`,
          answer: `Late April through early May, once the ground firms up after mud season. Rushing spring work in wet conditions damages lawns and compacts soil. We schedule ${city} clients for when the timing is actually right — not the first warm week that gets everyone excited.`,
        },
        {
          question: `Do you offer full-season grounds care contracts in ${city}?`,
          answer: `Yes. Full-season contracts covering everything from first thaw to final leaf drop are how most ${city} clients work with us. One agreement, consistent crew, no back-and-forth scheduling each visit. ${isHistoric ? `For ${city}'s older properties with established landscaping, consistency in crew is especially important — the same people who know where your specimen plantings are.` : `Pricing is based on actual property scope, not a fixed-tier package.`}`,
        },
        credQ,
      ];

    case "landscaping":
      return [
        {
          question: `What plants and materials do you use for ${city} landscaping?`,
          answer: `We design around what actually survives Vermont's climate in ${region}. ${isHistoric ? `${city} properties often have historic plantings and mature specimens — we work around those and select native or proven-hardy species that fit the character of the property.` : `Perennials suited to Rutland County's hardiness zone, proper soil amendment, and drainage planning before anything goes in the ground.`} No one-size-fits-all plant list.`,
        },
        {
          question: `Do you handle landscaping design and installation in ${city}?`,
          answer: `Yes. We handle design-to-installation: site assessment, layout planning, plant selection, bed preparation, installation, and follow-up care. ${isLake ? `Waterside and shoreline work near ${landmark} gets extra care given the environmental sensitivity and site conditions.` : `Projects range from garden bed refreshes to full exterior landscape overhauls.`}`,
        },
        credQ,
      ];

    case "property-maintenance":
      return [
        {
          question: `Do you do property check-ins for out-of-state ${city} owners?`,
          answer: `Yes. Scheduled property checks with photo documentation are a standard service for our ${city} clients, especially during winter when storms can create issues that need quick response. We flag anything that needs attention and coordinate repairs so you don't have to manage it remotely.`,
        },
        {
          question: `What does property maintenance typically cover in ${city}?`,
          answer: `General exterior upkeep, gutter cleaning, minor repairs, pressure washing, seasonal system checks, and second-home oversight. ${isMountain ? `For ${city} rental and second-home owners, we also coordinate between guests, manage urgent repairs, and handle the seasonal transitions that mountain properties need.` : `We build the scope around your property and how you use it — no padded packages.`}`,
        },
        credQ,
      ];

    case "hardscaping":
      return [
        {
          question: `When is the best time to do hardscape work in ${city}?`,
          answer: `Summer through early fall — once the frost is fully out of the ground and before it returns. ${isMountain ? `${city} properties at elevation have shorter windows: late May through September is ideal. We schedule hardscape projects early in the season.` : `May through September is our primary hardscape season for ${city} properties.`} Projects that get started in spring get finished before the first freeze.`,
        },
        {
          question: `How do you build hardscape for Vermont's freeze-thaw cycles?`,
          answer: `Proper base depth is the difference between hardscape that lasts and hardscape that fails after two winters. We excavate to the correct depth for ${region}'s frost line, compact base material in lifts, and use materials rated for freeze-thaw. ${isHistoric ? `${city} properties often have existing stone features — we match materials and craftsmanship to the character of what's already there.` : `This isn't optional — it's what separates a 20-year installation from a 5-year repair.`}`,
        },
        credQ,
      ];

    case "carpentry":
      return [
        {
          question: `Do you handle exterior carpentry repairs on ${city} homes?`,
          answer: `Yes. Rot repair, siding, trim, decks, and structural work are all within our scope as a registered Vermont residential contractor. ${isHistoric ? `${city}'s historic homes have detail and character worth preserving — we work to match original materials and craftsmanship rather than substituting whatever's easiest.` : `Most ${city} properties we see have winter damage that shows up in spring: frost heave on deck footings, moisture damage behind flashing, and trim that moved through freeze-thaw.`}`,
        },
        {
          question: `Can you build decks and outbuildings in ${city}?`,
          answer: `Yes. New deck construction, deck rebuilds, pergolas, and accessory structures are all services we handle in ${city}. We build to code with proper footings — especially important in ${region} where frost depth makes shallow footings a liability. Permit coordination included when required.`,
        },
        credQ,
      ];

    case "housekeeping":
      return [
        {
          question: `Do you handle turnover cleaning for ${city} short-term rentals?`,
          answer: `Yes. Rental turnover is a core service for our ${city} clients${isMountain ? ` — the ${landmark} market drives significant short-term rental activity and turnovers need to happen on tight windows between guests` : isLake ? ` — especially around ${landmark} where seasonal rentals see high summer turnover volume` : ""}. We sync with your booking calendar, execute to a hospitality-grade checklist, and send photo confirmation before the next guest arrives.`,
        },
        {
          question: `Can you do deep cleaning for ${city} second homes before the season opens?`,
          answer: `Yes. Pre-season deep cleaning — airing the property, cleaning all surfaces, restocking essentials, checking appliances, and preparing the space for arrival — is a common service for ${city} second-home owners. We also do post-season closing cleans and off-season checks.`,
        },
        credQ,
      ];

    case "rental-support":
      return [
        {
          question: `Do you manage ${city} rental properties as a point-of-contact for remote owners?`,
          answer: `Yes. As a registered Property Management Firm in Vermont, we serve as the local point of contact for ${city} rental owners who aren't on-site. We coordinate maintenance, handle guest turnover logistics, respond to urgent issues, and keep you informed without requiring you to manage every detail from a distance.`,
        },
        {
          question: `What does rental property support include for ${city} properties?`,
          answer: `Readiness checks before arrivals, maintenance coordination, turnover oversight, property condition reporting, and emergency response. ${isMountain ? `For ${city} properties in the ${landmark} rental market, we also handle seasonal transitions — opening, winterization, and the spring prep that gets properties back to guest-ready after ski season.` : `We define the scope based on what you need — some owners want full hands-off management, others want us to fill specific gaps.`}`,
        },
        credQ,
      ];

    default:
      return [
        {
          question: `Do you provide ${svc.title.toLowerCase()} in ${city}, Vermont?`,
          answer: `Yes. We service properties throughout ${city} and ${region}. Call 802-342-8293 to discuss your property's needs.`,
        },
        {
          question: `How do I get a quote for ${svc.title.toLowerCase()} in ${city}?`,
          answer: `Call 802-342-8293 or use the contact form at meticulous802.com. We'll schedule a property walkthrough and provide a clear, itemized quote based on what your ${city} property actually needs.`,
        },
        credQ,
      ];
  }
}

// ── SCHEMA ────────────────────────────────────────────

function buildSchema(area: ServiceArea, svc: ServiceDetail, faqs: { question: string; answer: string }[]) {
  const pageUrl = `https://meticulous802.com/service-areas/${area.slug}/${svc.slug}`;
  return {
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://meticulous802.com" },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://meticulous802.com/service-areas" },
        { "@type": "ListItem", position: 3, name: area.name, item: `https://meticulous802.com/service-areas/${area.slug}` },
        { "@type": "ListItem", position: 4, name: svc.title, item: pageUrl },
      ],
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${svc.title} in ${area.name}, VT`,
      description: svc.seoDescription,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "Meticulous LLC",
        telephone: "+1-802-342-8293",
        url: "https://meticulous802.com",
      },
      areaServed: {
        "@type": "City",
        name: area.name,
        containedInPlace: { "@type": "AdministrativeArea", name: area.region },
      },
      serviceType: svc.title,
      url: pageUrl,
    },
  };
}

// ── PAGE ──────────────────────────────────────────────

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city, service } = await params;
  const area = getServiceAreaBySlug(city);
  const svc = getServiceBySlug(service);
  if (!area || !svc) notFound();

  const cityIndex = serviceAreas.findIndex((a) => a.slug === city);
  const serviceIndex = serviceDetails.findIndex((s) => s.slug === service);
  const variant = (cityIndex * serviceDetails.length + serviceIndex) % 3;

  const introParagraphs = getPageContent(area, svc, variant);
  const faqs = getServiceFAQs(area, svc);
  const schema = buildSchema(area, svc, faqs);

  const otherServices = serviceDetails.filter((s) => s.slug !== svc.slug);
  const priorityOtherServices = otherServices.filter((s) =>
    area.priorityServices.includes(s.slug),
  );
  const relatedInCity = priorityOtherServices.length > 0
    ? priorityOtherServices.slice(0, 4)
    : otherServices.slice(0, 4);

  return (
    <InnerLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.service) }}
      />

      {/* Breadcrumbs */}
      <nav className="pt-28 md:pt-36 px-6 md:px-8 mx-auto max-w-7xl">
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.15em] text-copper-light/70">
          <li>
            <Link href="/" className="hover:text-copper-light transition-colors">
              Home
            </Link>
          </li>
          <li className="text-stone-dark/30">/</li>
          <li>
            <Link href="/service-areas" className="hover:text-copper-light transition-colors">
              Service Areas
            </Link>
          </li>
          <li className="text-stone-dark/30">/</li>
          <li>
            <Link
              href={`/service-areas/${area.slug}`}
              className="hover:text-copper-light transition-colors"
            >
              {area.name}
            </Link>
          </li>
          <li className="text-stone-dark/30">/</li>
          <li className="text-cream/80">{svc.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="pt-10 pb-20 md:pb-28 px-6 md:px-8 mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
          {area.region}
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] max-w-4xl">
          {svc.title} in {area.name}, Vermont
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60 max-w-2xl">
          {svc.subtitle}. Serving {area.name} and surrounding {area.region} towns.
          Call 802-342-8293 for a property walkthrough.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {svc.features.map((f) => (
            <span
              key={f}
              className="text-xs font-medium text-stone-dark/70 border border-white/10 rounded-full px-4 py-1.5"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-soil-light/20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-7">
              <div className="w-10 h-0.5 bg-forest-light mb-8" />
              {introParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-5 first:mt-0 text-[15px] leading-relaxed text-stone-dark/65"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="md:col-span-5">
              <div className="sticky top-32 p-8 rounded-2xl bg-soil-light/20 ring-1 ring-white/5">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light mb-6">
                  What We Cover
                </h3>
                <ul className="space-y-3">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-forest-light flex-shrink-0" />
                      <span className="text-sm text-stone-dark/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-forest-light hover:text-cream transition-colors"
                  >
                    Request a quote &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Details */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
            Included in This Service
          </p>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-12">
            What {svc.title.toLowerCase()} covers in {area.name}.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {svc.featureDetails.map((fd) => (
              <div key={fd.title}>
                <h3 className="text-base font-medium text-cream tracking-tight mb-2">
                  {fd.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-dark/60">
                  {fd.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-soil-light/20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
            How It Works
          </p>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-12">
            {svc.title} in {area.name}: the process.
          </h2>
          <div className="space-y-10">
            {svc.process.map((step) => (
              <div key={step.step} className="flex items-start gap-8">
                <span className="text-xs font-medium text-copper-light/50 tracking-[0.2em] pt-1 flex-shrink-0 w-8">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-base font-medium text-cream tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-dark/60">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
            Common Questions
          </p>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-12">
            {svc.title} in {area.name}: what owners ask.
          </h2>
          <div className="space-y-10">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-white/5 pt-8 first:border-t-0 first:pt-0">
                <h3 className="text-base font-medium text-cream tracking-tight mb-3">
                  {faq.question}
                </h3>
                <p className="text-[15px] leading-relaxed text-stone-dark/65">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services in This City */}
      <section className="py-20 md:py-28 bg-soil-light/20">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
            More in {area.name}
          </p>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-10">
            Other services for {area.name} properties.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedInCity.map((s) => (
              <Link
                key={s.slug}
                href={`/service-areas/${area.slug}/${s.slug}`}
                className="group flex items-center justify-between p-6 rounded-2xl bg-soil-light/15 ring-1 ring-white/5 transition-colors hover:ring-white/10 hover:bg-soil-light/25"
              >
                <span className="text-[15px] font-medium text-cream">
                  {s.title}
                </span>
                <span className="text-forest-light/60 group-hover:text-forest-light transition-colors text-lg">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            <Link
              href={`/service-areas/${area.slug}`}
              className="text-sm font-medium text-forest-light hover:text-cream transition-colors"
            >
              All services in {area.name} &rarr;
            </Link>
            <Link
              href={`/services/${svc.slug}`}
              className="text-sm font-medium text-stone-dark/60 hover:text-cream transition-colors"
            >
              {svc.title} across all areas &rarr;
            </Link>
            <Link
              href="/service-areas"
              className="text-sm font-medium text-stone-dark/60 hover:text-cream transition-colors"
            >
              All service areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
            Get Started
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight mb-5">
            Ready to talk about {svc.title.toLowerCase()} <br />
            for your {area.name} property?
          </h2>
          <p className="text-[15px] leading-relaxed text-stone-dark/60 max-w-xl mx-auto">
            Call 802-342-8293 or request a quote online. We walk the property,
            understand what you need, and give you a clear plan with no guesswork.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+18023428293"
              className="inline-flex items-center justify-center px-8 py-4 bg-forest-light text-soil font-medium text-sm tracking-wide rounded-xl hover:bg-cream transition-colors"
            >
              Call 802-342-8293
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 ring-1 ring-white/15 text-cream font-medium text-sm tracking-wide rounded-xl hover:ring-white/30 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { LocalMapEmbed } from "@/components/shared/local-map-embed";
import { ArrowRight, ArrowLeft, MapPin, Check } from "lucide-react";
import type { ServiceArea } from "@/lib/service-areas";
import type { ServiceDetail } from "@/app/services/[slug]/service-data";

gsap.registerPlugin(ScrollTrigger);

export function CityPage({
  area,
  allServices,
  allAreas,
}: {
  area: ServiceArea;
  allServices: ServiceDetail[];
  allAreas: ServiceArea[];
}) {
  const priorityServiceEntries = allServices.filter((s) =>
    area.priorityServices.includes(s.slug)
  );
  const otherServices = allServices.filter(
    (s) => !area.priorityServices.includes(s.slug)
  );
  const nearbyAreas = allAreas.filter((a) => a.slug !== area.slug).slice(0, 4);

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Property Care in ${area.name}, Vermont`,
    provider: {
      "@type": "LocalBusiness",
      name: "Meticulous LLC",
      telephone: "+1-802-342-8293",
      url: "https://meticulous802.com",
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: area.region,
      },
    },
    description: area.seoDescription,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".city-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".city-hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
      );

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <InnerLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={area.heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/70 to-soil/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-copper-light hover:text-cream transition-colors mb-6"
          >
            <ArrowLeft size={12} strokeWidth={2} />
            All Services
          </a>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
            {area.region}
          </p>
          <h1 className="city-hero-title font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
            Property Care in {area.name}
          </h1>
          <p className="city-hero-sub mt-4 text-lg text-stone-dark/70 max-w-2xl leading-relaxed">
            Year-round property services for {area.name} homeowners,
            second-home owners, and rental operators. Backed by a Vermont-registered
            residential contractor and property management firm.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-7">
              <div className="fade-up">
                <div className="w-10 h-0.5 bg-forest-light mb-8" />
                {area.intro.map((p, i) => (
                  <p
                    key={i}
                    className="mt-5 first:mt-0 text-[15px] leading-relaxed text-stone-dark/60"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="fade-up sticky top-32 p-8 rounded-2xl bg-soil-light/20 ring-1 ring-white/5">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light mb-6">
                  Local Context
                </h3>
                <p className="text-sm leading-relaxed text-stone-dark/70">
                  {area.localContext}
                </p>
                {area.landmarks.length > 0 && (
                  <>
                    <h4 className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-copper-light mb-4">
                      Known For
                    </h4>
                    <ul className="space-y-2">
                      {area.landmarks.map((l) => (
                        <li
                          key={l}
                          className="flex items-center gap-2 text-sm text-stone-dark/70"
                        >
                          <MapPin
                            className="h-3 w-3 text-forest-light flex-shrink-0"
                            strokeWidth={2}
                          />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <a
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest-light hover:text-cream transition-colors"
                >
                  Request a quote <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Services */}
      <section className="py-24 md:py-32 bg-soil-light/20">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              What We Focus On Here
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
              Services most relevant to {area.name}.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {priorityServiceEntries.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="fade-up group block"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest-light/15 flex-shrink-0">
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className="text-forest-light"
                    />
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-cream tracking-tight group-hover:text-forest-light transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-dark/55">
                      {s.introParagraphs[0]}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-forest-light">
                      Learn more{" "}
                      <ArrowRight size={12} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Full Scope
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
              Every service available in {area.name}.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allServices.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="fade-up group flex items-center justify-between p-6 rounded-2xl bg-soil-light/15 ring-1 ring-white/5 transition-colors hover:ring-white/10 hover:bg-soil-light/25"
              >
                <span className="text-[15px] font-medium text-cream">
                  {s.title}
                </span>
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="text-forest-light/60 group-hover:text-forest-light transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-soil-light/20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Common Questions
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
              What {area.name} owners ask us.
            </h2>
          </div>
          <div className="space-y-8">
            {area.faqs.map((f, i) => (
              <div key={i} className="fade-up">
                <h3 className="text-lg font-medium text-cream tracking-tight">
                  {f.question}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-dark/65">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Service Areas */}
      {nearbyAreas.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="fade-up text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
                Nearby
              </p>
              <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
                We also serve
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyAreas.map((n) => (
                <a
                  key={n.slug}
                  href={`/service-areas/${n.slug}`}
                  className="fade-up inline-flex items-center gap-2 rounded-full bg-soil-light/25 px-5 py-2.5 text-sm font-medium text-cream/90 ring-1 ring-white/10 hover:ring-white/20 hover:text-cream transition-all"
                >
                  <MapPin
                    className="h-3 w-3 text-forest-light"
                    strokeWidth={2}
                  />
                  {n.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 bg-soil-light/20">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <div className="fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Get Started
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Ready to talk about your <br />
              <span className="text-stone italic">
                {area.name} property?
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone-dark/60 max-w-xl mx-auto">
              Call 802-342-8293 or request a quote online. We&apos;ll walk the
              property, understand what you&apos;re looking for, and give you a
              clear plan.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-forest-light px-7 py-3 text-sm font-medium text-soil hover:bg-cream transition-colors"
              >
                Request a quote <ArrowRight size={14} strokeWidth={2} />
              </a>
              <a
                href="tel:8023428293"
                className="inline-flex items-center gap-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors"
              >
                Call 802-342-8293
              </a>
            </div>
          </div>
        </div>
      </section>

      <LocalMapEmbed city={area.name} state="VT" />
    </InnerLayout>
  );
}

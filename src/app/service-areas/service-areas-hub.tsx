"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { ArrowRight, MapPin } from "lucide-react";
import type { ServiceArea } from "@/lib/service-areas";
import type { ServiceDetail } from "@/app/services/[slug]/service-data";

gsap.registerPlugin(ScrollTrigger);

export function ServiceAreasHub({
  areas,
  services,
}: {
  areas: ServiceArea[];
  services: ServiceDetail[];
}) {
  // Group towns by their county/region, preserving the source order.
  const byRegion = areas.reduce<Record<string, ServiceArea[]>>((acc, a) => {
    (acc[a.region] ??= []).push(a);
    return acc;
  }, {});
  const regions = Object.keys(byRegion);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Service Areas — Meticulous LLC",
    description:
      "Towns across Rutland County and surrounding Vermont served by Meticulous LLC for property care, snow management, landscaping, and rental support.",
    url: "https://meticulous802.com/service-areas",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: areas.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Property Care in ${a.name}, VT`,
        url: `https://meticulous802.com/service-areas/${a.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://meticulous802.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: "https://meticulous802.com/service-areas",
      },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sa-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".sa-hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.45 },
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
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <InnerLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-28 md:pt-36 px-6 md:px-8 mx-auto max-w-7xl">
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.15em] text-copper-light/70">
          <li>
            <Link href="/" className="hover:text-copper-light transition-colors">
              Home
            </Link>
          </li>
          <li className="text-stone-dark/30">/</li>
          <li className="text-cream/80">Service Areas</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="pt-10 pb-16 md:pb-24 px-6 md:px-8 mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
          Rutland County &amp; Surrounding Vermont
        </p>
        <h1 className="sa-hero-title font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] max-w-4xl">
          Where we work.
        </h1>
        <p
          data-speakable
          className="sa-hero-sub mt-6 text-[15px] leading-relaxed text-stone-dark/65 max-w-2xl"
        >
          Meticulous LLC provides complete property care — grounds maintenance, snow &amp; ice
          management, landscaping, hardscaping, and rental support — across {areas.length} towns in
          Rutland County and the surrounding Vermont communities. Find your town below, or call
          802-342-8293.
        </p>
      </section>

      {/* Towns by region */}
      {regions.map((region) => (
        <section key={region} className="pb-14 md:pb-20 px-6 md:px-8 mx-auto max-w-7xl">
          <div className="fade-up flex items-center gap-3 mb-8">
            <MapPin className="h-4 w-4 text-forest-light" strokeWidth={2} />
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light">
              {region}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {byRegion[region].map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="fade-up group flex items-center justify-between p-6 rounded-2xl bg-soil-light/15 ring-1 ring-white/5 transition-colors hover:ring-white/15 hover:bg-soil-light/25"
              >
                <span className="text-base font-medium text-cream">
                  Property Care in {a.name}
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  className="text-forest-light/60 group-hover:text-forest-light transition-colors"
                />
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Services across the region */}
      <section className="py-16 md:py-24 bg-soil-light/20">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="fade-up mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-3">
              Every Service, Every Town
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">
              What we do across the region.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="fade-up group flex items-center justify-between p-6 rounded-2xl bg-soil-light/15 ring-1 ring-white/5 transition-colors hover:ring-white/10 hover:bg-soil-light/25"
              >
                <span className="text-[15px] font-medium text-cream">{s.title}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="text-forest-light/60 group-hover:text-forest-light transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center fade-up">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
            Don&apos;t see your town?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-stone-dark/60 max-w-xl mx-auto mb-8">
            We cover Rutland County and the surrounding Vermont communities. If you&apos;re nearby,
            we probably serve you — call 802-342-8293 or send a note and we&apos;ll confirm.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-forest-light"
          >
            Request a quote <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </InnerLayout>
  );
}

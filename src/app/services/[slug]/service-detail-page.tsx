"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { ArrowRight, ArrowLeft, MapPin, Check } from "lucide-react";
import type { ServiceDetail } from "./service-data";

gsap.registerPlugin(ScrollTrigger);

const towns = [
  "Killington", "Rutland", "West Rutland", "Proctor", "Wallingford",
  "Brandon", "Pittsford", "Mendon", "Chittenden", "Pittsfield",
  "Florence", "Clarendon", "Tinmouth", "Shrewsbury",
];

export function ServiceDetailPage({
  service,
  allServices,
}: {
  service: ServiceDetail;
  allServices: ServiceDetail[];
}) {
  const related = allServices.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".svc-hero-sub",
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
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
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
          <h1 className="svc-hero-title font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
            {service.title}
          </h1>
          <p className="svc-hero-sub mt-4 text-lg text-stone-dark/70 max-w-2xl leading-relaxed">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* SEO Intro Content */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-7">
              <div className="fade-up">
                <div className="w-10 h-0.5 bg-forest-light mb-8" />
                {service.introParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mt-5 first:mt-0 text-[15px] leading-relaxed text-stone-dark/60"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Features sidebar */}
            <div className="md:col-span-5">
              <div className="fade-up sticky top-32 p-8 rounded-2xl bg-soil-light/20 ring-1 ring-white/5">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light mb-6">
                  What We Provide
                </h3>
                <ul className="space-y-4">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-stone-dark/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-light flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest-light hover:text-cream transition-colors"
                >
                  Request a quote{" "}
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Breakdown */}
      <section className="py-24 md:py-32 bg-soil-light/20">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              What&apos;s Included
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
              A closer look at what we do.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {service.featureDetails.map((fd, i) => (
              <div key={i} className="fade-up">
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest-light/15 flex-shrink-0">
                    <Check size={13} strokeWidth={2.5} className="text-forest-light" />
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-cream tracking-tight">
                      {fd.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-dark/55">
                      {fd.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work — Process */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              How We Work
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
              Simple process, reliable results.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="fade-up group relative p-8 rounded-2xl bg-soil-light/15 ring-1 ring-white/5 transition-colors hover:ring-white/10"
              >
                <span className="block font-display text-3xl text-forest-light/30 mb-4 tracking-tight">
                  {step.step}
                </span>
                <h3 className="text-lg font-medium text-cream tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meticulous */}
      <section className="py-24 md:py-32 bg-soil-light/20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
                  Why Meticulous
                </p>
                <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-tight">
                  What sets us apart<br />
                  <span className="text-stone italic">from the rest.</span>
                </h2>
              </div>
              <div className="md:col-span-7">
                <ul className="space-y-6">
                  {service.differentiators.map((d, i) => (
                    <li key={i} className="fade-up flex items-start gap-4">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-forest-light flex-shrink-0" />
                      <p className="text-[15px] leading-relaxed text-stone-dark/65">
                        {d}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
          <div className="fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Service Area
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
              Serving Rutland County &<br />
              <span className="text-stone italic">surrounding communities.</span>
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {towns.map((town) => (
              <span
                key={town}
                className="inline-flex items-center gap-1.5 rounded-full bg-soil px-4 py-2 text-xs font-medium text-cream/80 ring-1 ring-white/10"
              >
                <MapPin
                  className="h-3 w-3 text-forest-light"
                  strokeWidth={2}
                />
                {town}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-24 md:py-32 bg-soil-light/20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="fade-up text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
                Related Services
              </p>
              <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
                You might also need
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="fade-up group relative rounded-2xl overflow-hidden aspect-[16/9]"
                >
                  <img
                    src={r.heroImage}
                    alt={r.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soil/90 via-soil/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl text-cream tracking-tight">
                      {r.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-forest-light group-hover:text-cream transition-colors">
                      Learn more{" "}
                      <ArrowRight size={12} strokeWidth={2} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-cream tracking-tight">
            Let&apos;s talk about<br />your property.
          </h2>
          <p className="mt-4 text-stone-dark/70">
            Reliable service starts with a conversation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light"
            >
              Get a Quote
            </a>
            <a
              href="tel:802-342-8293"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent ring-1 ring-cream/30 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-cream/10"
            >
              Call 802-342-8293
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import {
  Shield,
  MessageSquare,
  User,
  CalendarRange,
  Award,
  Satellite,
  Wrench,
  Home,
  Building2,
  Hotel,
  Briefcase,
  MapPin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const valueBlocks = [
  {
    icon: Shield,
    title: "Reliable Service",
    body: "We show up, follow through, and take our commitments seriously.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    body: "Property owners should always know what\u2019s being done, when it\u2019s being done, and what to expect next.",
  },
  {
    icon: User,
    title: "Owner Involvement",
    body: "Our company remains actively owner-led, helping ensure service quality and accountability.",
  },
  {
    icon: CalendarRange,
    title: "Year-Round Support",
    body: "From summer maintenance to winter response, we provide dependable support across every season.",
  },
  {
    icon: Award,
    title: "Professional Credentials",
    body: "Lead Certified through the State of Vermont. A Registered Property Management Firm. A Registered Residential Contractor.",
  },
  {
    icon: Wrench,
    title: "Complete Property Care",
    body: "A broader solution for owners who want one trusted company they can count on.",
  },
];

const serveBlocks = [
  { icon: Home, label: "Homeowners" },
  { icon: Home, label: "Second-home owners" },
  { icon: Hotel, label: "Vacation rental owners" },
  { icon: Briefcase, label: "Property managers" },
  { icon: Building2, label: "Commercial properties" },
  { icon: Building2, label: "Multi-unit & managed properties" },
];

const towns = [
  "Killington",
  "Rutland",
  "West Rutland",
  "Proctor",
  "Wallingford",
  "Brandon",
  "Pittsford",
  "Mendon",
  "Chittenden",
  "Pittsfield",
  "Florence",
  "Clarendon",
  "Tinmouth",
  "Shrewsbury",
];

const techPoints = [
  "Real-time service tracking",
  "Employee accountability",
  "GPS-tracked routes",
  "Time-stamped service activity",
  "Better service documentation",
];

export function WhyChooseUsPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wcu-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".wcu-hero-sub",
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

      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".serve-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".serve-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".town-tag",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: ".towns-grid", start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <InnerLayout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/bg-story.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/70 to-soil/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
            Why Choose Us
          </p>
          <h1 className="wcu-hero-title mt-4 font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
            More than getting<br />
            <span className="text-stone italic">the work done.</span>
          </h1>
          <p className="wcu-hero-sub mt-6 text-lg text-stone-dark/70 max-w-xl leading-relaxed">
            At Meticulous LLC, we believe great service is about doing it
            consistently, professionally, and with accountability.
          </p>
        </div>
      </section>

      {/* Value Blocks */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueBlocks.map((v) => (
              <div
                key={v.title}
                className="value-card p-8 rounded-2xl bg-soil-light/20 ring-1 ring-white/5"
              >
                <v.icon
                  className="h-6 w-6 text-forest-light"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-display text-xl text-cream tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark/60">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Accountability */}
      <section className="py-24 md:py-32 bg-soil-light/30">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
                Technology & Accountability
              </p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Professional systems.<br />
                <span className="text-stone italic">
                  Real-time accountability.
                </span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60">
                We use a CSM management system, employee portal, and GPS-tracked
                service vehicles to help ensure a higher standard of service
                across our operations.
              </p>
              <ul className="mt-8 space-y-4">
                {techPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-stone-dark/70"
                  >
                    <Satellite
                      className="h-4 w-4 text-forest-light flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fade-up relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/bg-property-maintenance.jpeg"
                alt="Meticulous property maintenance"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-soil/80 to-transparent">
                <p className="font-display text-lg text-cream italic">
                  Professional systems. Real-time accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="fade-up text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Who We Serve
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              Property care built for<br />
              <span className="text-stone italic">
                the way you use your property.
              </span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60">
              Whether your property is your home, an investment, or part of your
              business, we&apos;re here to help keep it maintained, protected,
              and presentation-ready.
            </p>
          </div>
          <div className="serve-grid grid grid-cols-2 md:grid-cols-3 gap-6">
            {serveBlocks.map((s) => (
              <div
                key={s.label}
                className="serve-card flex items-center gap-4 p-6 rounded-2xl bg-soil-light/20 ring-1 ring-white/5"
              >
                <s.icon
                  className="h-5 w-5 text-forest-light flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm font-medium text-cream">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 md:py-32 bg-soil-light/30">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
          <div className="fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Service Area
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              Proudly serving<br />
              <span className="text-stone italic">Vermont properties.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60 max-w-2xl mx-auto">
              Meticulous LLC proudly serves clients throughout Rutland County and
              surrounding Vermont communities.
            </p>
          </div>
          <div className="towns-grid mt-12 flex flex-wrap justify-center gap-3">
            {towns.map((town) => (
              <span
                key={town}
                className="town-tag inline-flex items-center gap-2 rounded-full bg-soil px-5 py-2.5 text-sm font-medium text-cream ring-1 ring-white/10"
              >
                <MapPin className="h-3.5 w-3.5 text-forest-light" strokeWidth={2} />
                {town}
              </span>
            ))}
            <span className="town-tag inline-flex items-center gap-2 rounded-full bg-forest/20 px-5 py-2.5 text-sm font-medium text-forest-light ring-1 ring-forest/30">
              & surrounding areas
            </span>
          </div>
          <p className="mt-8 text-sm text-stone-dark/50">
            Not sure if your property falls within our service area? Feel free
            to reach out.
          </p>
        </div>
      </section>

      {/* Community */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <div className="fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Community
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              Rooted in<br />
              <span className="text-stone italic">the community.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60 max-w-xl mx-auto">
              We believe in doing more than just working in the communities we
              serve — we believe in being part of them. Supporting local
              families, organizations, and community initiatives is something we
              value and take pride in.
            </p>
          </div>
        </div>
      </section>

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

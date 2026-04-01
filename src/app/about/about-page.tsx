"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { Shield, Users, Clock, MapPin, Award, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Shield, title: "Reliable Service", body: "We show up, follow through, and take our commitments seriously. Property owners deserve a company they can count on." },
  { icon: Users, title: "Clear Communication", body: "We believe property owners should always know what's being done, when it's being done, and what to expect next." },
  { icon: Clock, title: "Year-Round Support", body: "From summer maintenance to winter response, we provide dependable support across every season. One company for complete property care." },
  { icon: MapPin, title: "Owner Involvement", body: "Meticulous LLC remains an owner-led company with a hands-on approach to daily operations, service quality, and customer care." },
  { icon: Award, title: "Professional Credentials", body: "Lead Certified through the State of Vermont. A Registered Property Management Firm. A Registered Residential Contractor licensed to operate in Vermont." },
  { icon: Wrench, title: "Technology & Accountability", body: "We use a CSM management system, employee portal, and GPS-tracked service vehicles to help ensure a higher standard of service and accountability." },
];

const credentials = [
  { label: "Lead Certified", detail: "Through the State of Vermont" },
  { label: "Registered Property Management Firm", detail: "Licensed to operate in Vermont" },
  { label: "Registered Residential Contractor", detail: "Licensed to operate in Vermont" },
];

export function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(".about-hero-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 });

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.fromTo(".value-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
      });

      gsap.fromTo(".milestone", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".timeline-section", start: "top 75%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <InnerLayout>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/bg-story.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/70 to-soil/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">About Us</p>
          <h1 className="about-hero-title mt-4 font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
            Built on service.<br /><span className="text-stone italic">Driven by standards.</span>
          </h1>
          <p className="about-hero-sub mt-6 text-lg text-stone-dark/70 max-w-xl leading-relaxed">
            What started in 2009 as a lawn and landscape company has grown into Meticulous LLC — a company built to provide complete property care. At the core of our business is a simple belief: customer service comes first.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Our Story</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight leading-tight">
                More than lawn care.<br /><span className="text-stone italic">Complete property care.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60">
                As our clients&apos; needs evolved, so did our services. Today, we provide far more than lawn care. From routine maintenance to snow management, construction support, rental property services, and exterior improvements, our mission remains the same: provide dependable, professional service our clients can rely on.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-stone-dark/60">
                We believe property owners deserve a company they can trust to handle more than just one piece of the puzzle. That&apos;s why we&apos;ve built Meticulous LLC to be a single trusted source for complete property care.
              </p>
            </div>
            <div className="fade-up relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img src="/images/detail-story.jpeg" alt="Meticulous crew at work" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-soil/80 to-transparent">
                <p className="font-display text-lg text-cream italic">Meticulous isn&apos;t just our name. It&apos;s our standard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-soil-light/30">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="fade-up text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Why Choose Meticulous</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              Great service is more than<br /><span className="text-stone italic">getting the work done.</span>
            </h2>
          </div>
          <div className="values-grid mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="value-card p-8 rounded-2xl bg-soil ring-1 ring-white/5">
                <v.icon className="h-6 w-6 text-forest-light" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl text-cream tracking-tight">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark/60">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="timeline-section py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Professional. Registered. Built to Serve.</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              Owner-led.<br /><span className="text-stone italic">Quality-driven.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60 max-w-2xl mx-auto">
              Meticulous LLC remains an owner-led company with a hands-on approach to daily operations, service quality, and customer care. That involvement helps us maintain the standards, accountability, and consistency our clients have come to expect.
            </p>
          </div>
          <div className="space-y-8">
            {credentials.map((c) => (
              <div key={c.label} className="milestone flex gap-8 items-start">
                <span className="font-display text-lg text-forest-light flex-shrink-0 w-8"><Award className="h-5 w-5" strokeWidth={1.5} /></span>
                <div className="flex-1 pt-1">
                  <div className="h-px bg-white/10 mb-4" />
                  <p className="text-[15px] text-cream font-medium">{c.label}</p>
                  <p className="text-sm text-stone-dark/60 mt-1">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Do What We Do */}
      <section className="py-24 md:py-32 bg-soil-light/30">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <div className="fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Why We Do What We Do</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              A property is more than<br /><span className="text-stone italic">just a place.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60">
              It&apos;s an investment. It&apos;s a first impression. It&apos;s part of your home, your business, or your guest experience. Our job is to help protect that investment and make ownership easier through reliable service, strong communication, and work we stand behind.
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
          <p className="mt-4 text-stone-dark/70">Reliable service starts with a conversation.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light">
              Get a Quote
            </a>
            <a href="tel:802-342-8293" className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent ring-1 ring-cream/30 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-cream/10">
              Call 802-342-8293
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { Shield, Users, Clock, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Shield, title: "Quality Is Non-Negotiable", body: "Every project — whether it's a patio or a plow run — gets the same obsessive attention. We don't cut corners. We cut straight lines." },
  { icon: Users, title: "Relationships Over Transactions", body: "Most of our clients have been with us for years. We foster trust, communicate openly, and treat your property like it's our own." },
  { icon: Clock, title: "Show Up. On Time. Every Time.", body: "Reliability isn't a feature — it's the baseline. We're there when we say we'll be there, and we finish when we say we'll finish." },
  { icon: MapPin, title: "Vermont Through & Through", body: "Born here, built here, serving here. We know the soil, the seasons, the freeze-thaw cycles, and the standards Vermonters expect." },
];

const milestones = [
  { year: "2009", text: "Founded as a lawn care service in Vermont" },
  { year: "2012", text: "Expanded into hardscaping and patio installation" },
  { year: "2015", text: "Added fence installation and snow removal services" },
  { year: "2018", text: "Launched interior flooring division" },
  { year: "2021", text: "Grew into full-scope construction and framing" },
  { year: "2025", text: "Serving 1,200+ properties across Vermont" },
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
            Built on pride.<br /><span className="text-stone italic">Driven by craft.</span>
          </h1>
          <p className="about-hero-sub mt-6 text-lg text-stone-dark/70 max-w-xl leading-relaxed">
            Meticulous isn&apos;t just our name — it&apos;s our standard. Since 2009, we&apos;ve been transforming Vermont properties with precision, reliability, and an obsessive attention to detail.
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
                From lawn stripes to<br /><span className="text-stone italic">full property transformations.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/60">
                What started as one person, one mower, and a commitment to making lawns look their absolute best has grown into a full-service property company covering six trades across four seasons. We do lawn care, hardscaping, fencing, flooring, snow removal, and construction — and we bring the same precision to every single one.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-stone-dark/60">
                We&apos;ve never chased growth for growth&apos;s sake. Every service we added was because our clients asked for it and trusted us to deliver. That trust is everything. It&apos;s why most of our business comes from referrals and repeat customers.
              </p>
            </div>
            <div className="fade-up relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img src="/images/detail-story.jpeg" alt="Meticulous crew at work" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-soil/80 to-transparent">
                <p className="font-display text-lg text-cream italic">One company. Every season. Done right.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-soil-light/30">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="fade-up text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">What We Stand For</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              Four principles.<br /><span className="text-stone italic">Zero exceptions.</span>
            </h2>
          </div>
          <div className="values-grid mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Timeline */}
      <section className="timeline-section py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="fade-up text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Our Journey</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl tracking-tight">
              15+ years of<br /><span className="text-stone italic">building trust.</span>
            </h2>
          </div>
          <div className="space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="milestone flex gap-8 items-start">
                <span className="font-display text-2xl text-forest-light tabular-nums flex-shrink-0 w-16">{m.year}</span>
                <div className="flex-1 pt-1">
                  <div className="h-px bg-white/10 mb-4" />
                  <p className="text-[15px] text-stone-dark/70">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-cream tracking-tight">
            Ready to talk about<br />your property?
          </h2>
          <p className="mt-4 text-stone-dark/70">Free consultations. Transparent pricing. No pressure.</p>
          <a href="tel:802-342-8293" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light">
            Call 802-342-8293
          </a>
        </div>
      </section>
    </InnerLayout>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: "+", label: "Years in Business" },
  { value: 1200, suffix: "+", label: "Properties Served" },
  { value: 4, suffix: "", label: "Seasons Covered" },
  { value: 802, suffix: "", label: "Vermont Through & Through" },
];

export function IntroBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Tagline reveal
      gsap.fromTo(
        ".intro-tagline",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Counter animations
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;

        if (prefersReducedMotion) {
          el.textContent = stat.value.toLocaleString();
          return;
        }

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              { val: stat.value },
              {
                val: stat.value,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  const current = Math.round(this.targets()[0].val);
                  el.textContent = current.toLocaleString();
                },
              }
            );
          },
        });
      });

      // Stat cards stagger
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Tagline */}
        <p className="intro-tagline text-center font-display text-3xl md:text-4xl lg:text-5xl text-soil tracking-tight leading-tight">
          Meticulous isn&apos;t just our name —
          <br />
          <span className="text-forest italic">it&apos;s our standard.</span>
        </p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card text-center p-6 rounded-2xl bg-cream/60 ring-1 ring-stone-dark/20"
            >
              <div className="font-display text-4xl md:text-5xl text-forest tabular-nums">
                <span
                  ref={(el) => {
                    counterRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-copper tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

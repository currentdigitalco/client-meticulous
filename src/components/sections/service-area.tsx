"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const areas = [
  "Burlington",
  "Shelburne",
  "Middlebury",
  "Williston",
  "South Burlington",
  "Essex",
  "Colchester",
  "Winooski",
  "Richmond",
  "Hinesburg",
  "Charlotte",
  "Vergennes",
];

export function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".area-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".area-tag",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".area-tags", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="area-heading grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-copper">
              Service Area
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-soil tracking-tight leading-[1.1]">
              Proudly serving<br />
              <span className="text-forest italic">Vermont.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-soil/70 max-w-md">
              Based in the 802. We cover Chittenden County and the surrounding
              areas — from Burlington to Middlebury, Williston to Vergennes.
              If you&apos;re in our range, we&apos;ll be there.
            </p>

            <a
              href="tel:802-342-8293"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-all duration-200 hover:bg-forest-light shadow-lg shadow-forest/20"
            >
              <MapPin className="h-4 w-4" strokeWidth={2} />
              Check if we cover your area
            </a>
          </div>

          {/* Right — Area tags */}
          <div className="area-tags flex flex-wrap gap-3">
            {areas.map((area) => (
              <span
                key={area}
                className="area-tag inline-flex items-center gap-2 rounded-full bg-cream/60 px-5 py-2.5 text-sm font-medium text-soil ring-1 ring-stone-dark/15"
              >
                <MapPin className="h-3.5 w-3.5 text-forest" strokeWidth={2} />
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

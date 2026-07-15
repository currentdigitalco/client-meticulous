"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real Google reviews, verbatim, from the live GBP (location 16794034017415809612),
// verified 2026-07-15. `project` describes work the reviewer names in their own
// quote — it is a label, not a claim. The GBP API does not expose reviewer town,
// so there is no location line here; do not add one back from inference.
// Keep in sync with realReviews in src/app/layout.tsx (schema).
const testimonials = [
  {
    quote:
      "We would happily recommend Meticulous Mowing and Property Management to anyone considering landscaping or masonry services. The crew was very professional, hardworking and personable. We are thrilled with our new walkway.",
    name: "Jack Mangan",
    project: "Walkway & Masonry",
  },
  {
    quote:
      "Meticulous really lives up to their name! Everything about the project we hired them to do was done meticulously. Not only does the fence look great, it was done in record time! From the layout, install and clean up they took pride in what they were doing.",
    name: "Isabelle Hardina",
    project: "Fence Installation",
  },
  {
    quote:
      "WOW, Dan and his team are amazing! They go above and beyond for their customers… Meticulous is my one stop shop for all lawn maintenance, plowing, home improvement and property management.",
    name: "Kellie Esty",
    project: "Full Property Care",
  },
  {
    quote:
      "Amazing landscaping service. We use them for our spring, weekly summer and fall cleanup. They go above and beyond to provide not only reliable, but stellar service. Highly recommended!",
    name: "Ashley DiMeola",
    project: "Seasonal Grounds Maintenance",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(nextTestimonial, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextTestimonial]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 md:py-32"
    >
      <div className="testimonial-section mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-copper">
          From Our Clients
        </p>

        {/* Quote */}
        <div className="mt-10 min-h-[200px] flex items-center justify-center">
          <blockquote
            key={activeIndex}
            className="animate-fadeIn"
          >
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-soil leading-snug tracking-tight italic">
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="text-base font-medium text-forest">{current.name}</p>
              <p className="mt-1 text-sm text-copper">{current.project}</p>
            </footer>
          </blockquote>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(nextTestimonial, 6000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-forest"
                  : "w-2 bg-stone-dark/40 hover:bg-stone-dark/60"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>
    </section>
  );
}

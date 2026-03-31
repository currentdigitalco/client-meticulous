"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "They transformed our backyard from a bare lawn into a complete outdoor living space. The bluestone patio is stunning. Every neighbor has asked for their number.",
    name: "Sarah M.",
    location: "Shelburne, VT",
    project: "Patio & Landscaping",
  },
  {
    quote:
      "15 years using Meticulous for everything — lawn care, snow removal, now flooring. One call handles it all. That kind of reliability is rare.",
    name: "Dave & Linda K.",
    location: "Burlington, VT",
    project: "Full Property Care",
  },
  {
    quote:
      "Woke up after that February nor'easter and our entire driveway and walkway were already cleared. These guys don't wait for a phone call.",
    name: "Tom R.",
    location: "Middlebury, VT",
    project: "Snow Removal",
  },
  {
    quote:
      "The cedar privacy fence they built is absolutely beautiful. Set the posts deep, finished clean, and it was done two days ahead of schedule.",
    name: "Jennifer P.",
    location: "Williston, VT",
    project: "Fence Installation",
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
              <p className="mt-1 text-sm text-copper">
                {current.location} — {current.project}
              </p>
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

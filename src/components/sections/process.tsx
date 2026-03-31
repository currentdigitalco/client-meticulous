"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, ClipboardList, Hammer, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Walk the property together. Understand your vision, assess the site, identify opportunities you might not see yet. No cost, no pressure.",
    Icon: MessageSquare,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Detailed scope, materials selection, timeline, and transparent pricing. You'll know exactly what's happening, when, and what it costs before we break ground.",
    Icon: ClipboardList,
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Our crew shows up on time, works clean, and communicates daily. Every phase built to spec. No surprises, no excuses.",
    Icon: Hammer,
  },
  {
    number: "04",
    title: "Reveal",
    description:
      "Final walkthrough together. We don't leave until you're satisfied. Your property, perfected — exactly as promised.",
    Icon: Sparkles,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".process-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // SVG line draw
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-timeline",
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
      }

      // Step cards stagger
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: { trigger: ".process-timeline", start: "top 70%" },
        }
      );

      // Step nodes illuminate
      gsap.fromTo(
        ".step-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          stagger: 0.25,
          scrollTrigger: { trigger: ".process-timeline", start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-stone py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="process-heading text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-copper">
            How We Work
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-soil tracking-tight leading-[1.1]">
            Four steps to<br />
            <span className="text-forest italic">done right.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="process-timeline relative mt-20">
          {/* Vertical line SVG */}
          <svg
            className="absolute left-6 md:left-8 top-0 bottom-0 h-full w-px overflow-visible hidden md:block"
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#1B3A2D"
              strokeWidth="2"
            />
          </svg>

          <div className="space-y-16">
            {steps.map((step) => (
              <div key={step.number} className="process-step relative flex gap-8 md:gap-12">
                {/* Node */}
                <div className="step-node relative z-10 flex-shrink-0">
                  <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-forest text-cream shadow-lg shadow-forest/20">
                    <step.Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-copper">
                    Step {step.number}
                  </span>
                  <h3 className="mt-1 font-display text-2xl md:text-3xl text-soil tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-soil/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

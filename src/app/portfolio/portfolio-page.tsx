"use client";

import { useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Lawn", "Hardscape", "Fencing", "Flooring", "Snow", "Construction"] as const;
type Category = (typeof categories)[number];

const projects = [
  { title: "Bluestone Patio — Shelburne", category: "Hardscape" as Category, image: "/images/bg-hardscape.jpeg", span: "md:col-span-2 md:row-span-2" },
  { title: "Cedar Privacy Fence", category: "Fencing" as Category, image: "/images/bg-fencing.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "Summer Diamond Stripes", category: "Lawn" as Category, image: "/images/bg-lawn.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "Wide Plank Hardwood", category: "Flooring" as Category, image: "/images/bg-flooring.jpeg", span: "md:col-span-1 md:row-span-2" },
  { title: "Flagstone Walkway", category: "Hardscape" as Category, image: "/images/detail-hardscape.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "Winter Storm Response", category: "Snow" as Category, image: "/images/bg-snow.jpeg", span: "md:col-span-2 md:row-span-1" },
  { title: "Deck Framing — Burlington", category: "Construction" as Category, image: "/images/hero-landing.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "Vinyl Fence — Williston", category: "Fencing" as Category, image: "/images/detail-fencing.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "LVP Bathroom Install", category: "Flooring" as Category, image: "/images/detail-flooring.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "Property Transformation", category: "Lawn" as Category, image: "/images/detail-lawn.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "3am Plow Run", category: "Snow" as Category, image: "/images/detail-snow.jpeg", span: "md:col-span-1 md:row-span-1" },
  { title: "Patio Foundation Prep", category: "Hardscape" as Category, image: "/images/detail-story.jpeg", span: "md:col-span-1 md:row-span-1" },
];

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<typeof projects[0] | null>(null);

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".portfolio-hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".gallery-item", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
    });
  }, [activeCategory]);

  useEffect(() => {
    if (lightbox) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <InnerLayout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-soil-light/50 to-soil" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Portfolio</p>
          <h1 className="portfolio-hero-title mt-4 font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
            Built to last.<br /><span className="text-stone italic">Made to impress.</span>
          </h1>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-3 mb-12" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "bg-forest text-cream ring-1 ring-forest-light/30"
                    : "bg-white/5 text-stone-dark/50 hover:bg-white/10 hover:text-cream ring-1 ring-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[240px] gap-4">
            {filtered.map((project) => (
              <button
                key={project.title}
                onClick={() => setLightbox(project)}
                className={cn(
                  "gallery-item group relative overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest text-left",
                  project.span
                )}
              >
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-copper-light">{project.category}</span>
                  <p className="mt-1 text-sm font-medium text-cream">{project.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-cream tracking-tight">
            Want your property<br />in this gallery?
          </h2>
          <a href="tel:802-342-8293" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light">
            Call 802-342-8293
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-soil/95 backdrop-blur-sm p-6" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-cream hover:bg-white/20 transition-colors" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.title} className="w-full rounded-xl object-contain max-h-[80vh]" />
            <div className="mt-4 text-center">
              <span className="text-xs font-medium uppercase tracking-wider text-copper-light">{lightbox.category}</span>
              <p className="mt-1 text-lg font-display text-cream">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </InnerLayout>
  );
}

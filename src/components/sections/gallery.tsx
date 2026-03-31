"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  image: string;
  span: string; // grid span class
}

const projects: Project[] = [
  { title: "Bluestone Patio — Shelburne", category: "Hardscape", image: "https://picsum.photos/seed/met-patio1/600/500", span: "md:col-span-2 md:row-span-2" },
  { title: "Cedar Privacy Fence", category: "Fencing", image: "https://picsum.photos/seed/met-fence1/400/400", span: "md:col-span-1 md:row-span-1" },
  { title: "Summer Striping", category: "Lawn", image: "https://picsum.photos/seed/met-lawn1/400/300", span: "md:col-span-1 md:row-span-1" },
  { title: "Hardwood Install", category: "Flooring", image: "https://picsum.photos/seed/met-floor1/400/500", span: "md:col-span-1 md:row-span-2" },
  { title: "Flagstone Walkway", category: "Hardscape", image: "https://picsum.photos/seed/met-walk1/400/300", span: "md:col-span-1 md:row-span-1" },
  { title: "Winter Plowing", category: "Snow", image: "https://picsum.photos/seed/met-snow1/600/400", span: "md:col-span-2 md:row-span-1" },
  { title: "Deck Construction", category: "Construction", image: "https://picsum.photos/seed/met-deck1/400/400", span: "md:col-span-1 md:row-span-1" },
  { title: "Vinyl Fence — Burlington", category: "Fencing", image: "https://picsum.photos/seed/met-fence2/400/400", span: "md:col-span-1 md:row-span-1" },
  { title: "LVP Bathroom", category: "Flooring", image: "https://picsum.photos/seed/met-floor2/400/300", span: "md:col-span-1 md:row-span-1" },
];

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-heading",
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
        ".gallery-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="relative bg-soil py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="gallery-heading max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-copper-light">
              Our Work
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight leading-[1.1]">
              Built to last.<br />
              <span className="text-stone italic">Made to impress.</span>
            </h2>
          </div>

          {/* Masonry grid */}
          <div className="gallery-grid mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[220px] gap-4">
            {projects.map((project) => (
              <button
                key={project.title}
                onClick={() => setSelectedImage(project)}
                className={cn(
                  "gallery-item group relative overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
                  project.span
                )}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-copper-light">
                    {project.category}
                  </span>
                  <p className="mt-1 text-sm font-medium text-cream">
                    {project.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-soil/95 backdrop-blur-sm p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-cream transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full rounded-xl object-contain max-h-[80vh]"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-medium uppercase tracking-wider text-copper-light">
                {selectedImage.category}
              </span>
              <p className="mt-1 text-lg font-display text-cream">
                {selectedImage.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

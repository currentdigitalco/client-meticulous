"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Lawn", "Hardscape", "Fencing", "Flooring", "Snow", "Construction"] as const;

type Category = (typeof categories)[number];

interface Service {
  title: string;
  category: Category;
  description: string;
  image: string;
  features: string[];
}

const services: Service[] = [
  {
    title: "Precision Lawn Care",
    category: "Lawn",
    description:
      "Diamond-cut stripes that stop traffic. Weekly mowing, edging, fertilization, and seasonal programs that keep your property looking like a golf course from April through November.",
    image: "https://picsum.photos/seed/meticulous-lawn/800/600",
    features: ["Weekly mowing & edging", "Fertilization programs", "Overseeding & aeration", "Spring & fall cleanups"],
  },
  {
    title: "Hardscape & Patios",
    category: "Hardscape",
    description:
      "Bluestone flagging, natural stone patios, retaining walls, and walkways built to endure Vermont's freeze-thaw cycles. Engineered foundations. No shortcuts.",
    image: "https://picsum.photos/seed/meticulous-patio/800/600",
    features: ["Bluestone & flagstone patios", "Retaining walls", "Walkways & steps", "Drainage solutions"],
  },
  {
    title: "Fence Installation",
    category: "Fencing",
    description:
      "Vinyl, cedar, chain-link, split rail — every style, properly set. Posts anchored below the frost line. Gates that swing true in January and July.",
    image: "https://picsum.photos/seed/meticulous-fence/800/600",
    features: ["Vinyl fencing", "Cedar privacy fencing", "Chain-link fencing", "Cedar split rail"],
  },
  {
    title: "Interior Flooring",
    category: "Flooring",
    description:
      "Hardwood, luxury vinyl plank, ceramic tile — installed with the same precision we bring outside. Subfloor prep to final trim. Your home, elevated.",
    image: "https://picsum.photos/seed/meticulous-floor/800/600",
    features: ["Hardwood installation", "Luxury vinyl plank", "Ceramic & porcelain tile", "Subfloor preparation"],
  },
  {
    title: "Snow Removal",
    category: "Snow",
    description:
      "When Vermont buries your driveway at 3am, we're already on it. Commercial plowing, residential clearing, salt and sand applications. Reliable before you wake up.",
    image: "https://picsum.photos/seed/meticulous-snow/800/600",
    features: ["Commercial plowing", "Residential clearing", "Salt & sand application", "24/7 storm response"],
  },
  {
    title: "Construction & Framing",
    category: "Construction",
    description:
      "From deck framing to outbuilding construction. Structural builds that meet code and exceed expectations. Vermont-grade craftsmanship on every joint.",
    image: "https://picsum.photos/seed/meticulous-build/800/600",
    features: ["Deck construction", "Outbuildings & sheds", "Structural framing", "Permit coordination"],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-heading",
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".service-panel");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
      }
    );
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-cream py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="services-heading max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-copper">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-soil tracking-tight leading-[1.1]">
            Every season.<br />
            <span className="text-forest italic">Every surface.</span>
          </h2>
        </div>

        {/* Category filter chips */}
        <div className="mt-10 flex flex-wrap gap-3" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "bg-forest text-cream shadow-lg shadow-forest/20"
                  : "bg-stone/50 text-soil/70 hover:bg-stone hover:text-soil ring-1 ring-stone-dark/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service panels — alternating layout */}
        <div className="mt-16 space-y-20">
          {filtered.map((service, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={service.title}
                className={cn(
                  "service-panel grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center",
                  isReversed && "md:direction-rtl"
                )}
              >
                {/* Image */}
                <div
                  className={cn(
                    "md:col-span-7 overflow-hidden rounded-2xl",
                    isReversed && "md:order-2 md:direction-ltr"
                  )}
                >
                  <div className="relative aspect-[4/3] bg-stone">
                    <img
                      src={service.image}
                      alt={`${service.title} by Meticulous`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-soil/80 px-4 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                      {service.category}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "md:col-span-5",
                    isReversed && "md:order-1 md:direction-ltr"
                  )}
                >
                  <h3 className="font-display text-3xl md:text-4xl text-soil tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-soil/70">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-soil/80"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-forest flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

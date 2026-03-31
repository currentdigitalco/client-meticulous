"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "lawn",
    title: "Precision Lawn Care",
    subtitle: "Diamond-cut stripes that stop traffic.",
    image: "/images/bg-lawn.jpeg",
    detailImage: "/images/detail-lawn.jpeg",
    description: "Weekly mowing with competition-grade stripes. Edging, fertilization, overseeding, aeration, and full seasonal programs. Spring cleanups to fall leaf removal. We treat your property like the golf course down the road.",
    features: ["Weekly mowing & edging", "Fertilization programs", "Overseeding & aeration", "Spring & fall cleanups", "Mulch installation", "Shrub & hedge trimming"],
  },
  {
    id: "hardscape",
    title: "Hardscape & Stone",
    subtitle: "Engineered for Vermont's freeze-thaw cycles.",
    image: "/images/bg-hardscape.jpeg",
    detailImage: "/images/detail-hardscape.jpeg",
    description: "Patios, walkways, retaining walls, and steps built on engineered foundations. We source Vermont stone when possible and set every piece with the kind of care that means your patio looks better in year ten than year one.",
    features: ["Bluestone & flagstone patios", "Natural stone walkways", "Retaining walls", "Stone steps & landings", "Drainage solutions", "Foundation engineering"],
  },
  {
    id: "fencing",
    title: "Fence Installation",
    subtitle: "Posts anchored below the frost line.",
    image: "/images/bg-fencing.jpeg",
    detailImage: "/images/detail-fencing.jpeg",
    description: "Every post set below the frost line. Every gate hung level. Your fence should look as good five winters from now as the day we build it.",
    features: ["Vinyl fencing", "Cedar privacy fencing", "Chain-link fencing", "Cedar split rail", "Gate installation", "Post-and-rail repairs"],
  },
  {
    id: "flooring",
    title: "Interior Flooring",
    subtitle: "Your home, elevated from the ground up.",
    image: "/images/bg-flooring.jpeg",
    detailImage: "/images/detail-flooring.jpeg",
    description: "Hardwood, luxury vinyl plank, ceramic tile — installed with meticulous attention to subfloor prep, transitions, and trim. We don't just lay flooring; we transform rooms.",
    features: ["Hardwood installation", "Luxury vinyl plank (LVP)", "Ceramic & porcelain tile", "Subfloor preparation", "Baseboard & trim", "Pattern & inlay work"],
  },
  {
    id: "snow",
    title: "Snow Removal",
    subtitle: "Battling winter before you even wake up.",
    image: "/images/bg-snow.jpeg",
    detailImage: "/images/detail-snow.jpeg",
    description: "When Vermont buries your driveway at 3am, we're already on it. Commercial plowing, residential clearing, salt and sand applications — 24/7 storm response.",
    features: ["Commercial plowing", "Residential clearing", "Salt & sand application", "24/7 storm response", "Walkway & step clearing", "Seasonal contracts"],
  },
  {
    id: "construction",
    title: "Construction & Framing",
    subtitle: "Built to code. Built to last.",
    image: "/images/hero-landing.jpeg",
    detailImage: "/images/detail-story.jpeg",
    description: "From deck framing to outbuilding construction. Structural builds that meet code and exceed expectations. Vermont-grade craftsmanship on every joint.",
    features: ["Deck construction", "Outbuildings & sheds", "Structural framing", "Permit coordination", "Additions & renovations", "Custom carpentry"],
  },
];

export function ServicesPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 });

      gsap.utils.toArray<HTMLElement>(".service-block").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <InnerLayout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-landing.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/70 to-soil/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Our Services</p>
          <h1 className="services-hero-title mt-4 font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
            Six trades.<br />Four seasons.<br /><span className="text-stone italic">One standard.</span>
          </h1>
        </div>
      </section>

      {/* Service Blocks */}
      {services.map((service, i) => {
        const isReversed = i % 2 !== 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`service-block py-24 md:py-32 ${i % 2 === 0 ? "" : "bg-soil-light/20"}`}
          >
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center ${isReversed ? "md:direction-rtl" : ""}`}>
                {/* Image */}
                <div className={`md:col-span-7 ${isReversed ? "md:order-2 md:direction-ltr" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-4 left-4 rounded-full bg-soil/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-cream ring-1 ring-white/10">
                      {service.id.charAt(0).toUpperCase() + service.id.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`md:col-span-5 ${isReversed ? "md:order-1 md:direction-ltr" : ""}`}>
                  <div className="w-10 h-0.5 bg-forest-light mb-6" />
                  <h2 className="font-display text-3xl md:text-4xl text-cream tracking-tight leading-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 font-display text-lg text-stone italic">{service.subtitle}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-dark/60">{service.description}</p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-stone-dark/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-light flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="tel:802-342-8293" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest-light hover:text-cream transition-colors">
                    Get a free estimate <ArrowRight size={14} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-cream tracking-tight">
            Not sure what you need?<br />Let&apos;s walk the property.
          </h2>
          <p className="mt-4 text-stone-dark/70">Free consultations. We&apos;ll figure it out together.</p>
          <a href="tel:802-342-8293" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light">
            Call 802-342-8293
          </a>
        </div>
      </section>
    </InnerLayout>
  );
}

"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InnerLayout } from "@/components/shared/inner-layout";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "grounds-maintenance",
    title: "Grounds Maintenance",
    subtitle: "Professional grounds care, consistently maintained.",
    image: "/images/bg-lawn.jpeg",
    detailImage: "/images/detail-lawn.jpeg",
    description: "Professional grounds care designed to keep your property sharp, healthy, and consistently maintained throughout the season. From routine mowing and trimming to seasonal cleanups and ongoing exterior upkeep, we help homeowners, second-home owners, and property managers maintain properties that look sharp and stay under control.",
    features: ["Routine mowing & trimming", "Edging & exterior upkeep", "Spring & fall cleanups", "Seasonal maintenance programs", "Mulch installation", "Shrub & hedge trimming"],
  },
  {
    id: "landscaping",
    title: "Landscaping & Exterior Enhancements",
    subtitle: "Curb appeal that feels clean and intentional.",
    image: "/images/bg-hardscape.jpeg",
    detailImage: "/images/detail-hardscape.jpeg",
    description: "Exterior upgrades and landscape improvements that enhance curb appeal and create a more polished overall presentation. From mulching and planting to seasonal cleanups and curb appeal upgrades, we bring a detail-focused approach to every project.",
    features: ["Mulching & planting", "Seasonal cleanups", "Curb appeal improvements", "Exterior property upgrades", "Garden bed maintenance", "Property presentation"],
  },
  {
    id: "property-maintenance",
    title: "Property Maintenance",
    subtitle: "Stay ahead of repairs and upkeep.",
    image: "/images/bg-fencing.jpeg",
    detailImage: "/images/detail-fencing.jpeg",
    description: "Reliable property support services designed to help owners stay ahead of repairs, upkeep, and seasonal maintenance needs. Keeping up with property maintenance can be time-consuming and overwhelming — especially for second-home owners and rental properties. We help simplify ownership and keep your property in top condition.",
    features: ["General exterior maintenance", "Property support services", "Repair coordination", "Seasonal maintenance", "Second-home oversight", "Preventative upkeep"],
  },
  {
    id: "snow-ice-management",
    title: "Snow & Ice Management",
    subtitle: "Dependable winter response when it matters most.",
    image: "/images/bg-snow.jpeg",
    detailImage: "/images/detail-snow.jpeg",
    description: "Winter in Vermont demands a company you can rely on. Professional snow and ice management services — including plowing, shoveling, and salting — designed to keep your property accessible, safer, and operational during winter conditions.",
    features: ["Commercial plowing", "Residential clearing", "Salt & sand application", "24/7 storm response", "Walkway & step clearing", "Seasonal contracts"],
  },
  {
    id: "hardscaping",
    title: "Hardscaping & Exterior Improvements",
    subtitle: "Custom outdoor features built to last.",
    image: "/images/bg-hardscape.jpeg",
    detailImage: "/images/detail-hardscape.jpeg",
    description: "Custom outdoor features and structural landscape elements built to enhance both the beauty and usability of your property. From concept to completion, we focus on clean installation, proper base preparation, and long-term durability.",
    features: ["Patios & walkways", "Retaining walls", "Natural stone installations", "Outdoor living features", "Drainage solutions", "Foundation engineering"],
  },
  {
    id: "carpentry",
    title: "Carpentry & Construction Services",
    subtitle: "Craftsmanship, professionalism, and care.",
    image: "/images/hero-landing.jpeg",
    detailImage: "/images/detail-story.jpeg",
    description: "Practical improvements and exterior construction solutions completed with craftsmanship, professionalism, and care. As a registered residential contractor in Vermont, we operate with accountability and a focus on quality workmanship.",
    features: ["Exterior repairs", "Structural improvements", "Custom builds", "Deck construction", "Remodeling support", "Permit coordination"],
  },
  {
    id: "housekeeping",
    title: "Housekeeping & Turnover Services",
    subtitle: "Refreshed, presentable, and ready for arrival.",
    image: "/images/bg-flooring.jpeg",
    detailImage: "/images/detail-flooring.jpeg",
    description: "Detailed cleaning and turnover support designed to keep rental and guest properties refreshed, presentable, and ready for arrival. Whether you manage bookings or need support keeping your property guest-ready, we provide dependable turnover solutions you can count on.",
    features: ["Vacation rental cleaning", "Turnover preparation", "Guest-ready inspections", "Consistent service standards", "Second-home refreshes", "Detail cleaning"],
  },
  {
    id: "rental-support",
    title: "Rental Property Support & Management",
    subtitle: "Dependable support for property owners.",
    image: "/images/bg-fencing.jpeg",
    detailImage: "/images/detail-fencing.jpeg",
    description: "Dependable support for property owners who need help maintaining readiness, presentation, and day-to-day operational care. As a registered Property Management Firm, we help owners keep their properties running smoothly, presentable, and ready for guests or tenants year-round.",
    features: ["Readiness checks", "Maintenance coordination", "Ongoing property care", "Tenant & guest preparation", "Property presentation", "Day-to-day operations"],
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
            Complete care.<br />Every season.<br /><span className="text-stone italic">One standard.</span>
          </h1>
          <p className="mt-6 text-lg text-stone-dark/70 max-w-xl leading-relaxed">
            Dependable, professional property services designed to keep your property maintained, protected, and looking its best year-round.
          </p>
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
                      {service.title}
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
                  <a href={`/services/${service.id}`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest-light hover:text-cream transition-colors">
                    Learn more <ArrowRight size={14} strokeWidth={2} />
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
            Need something<br />not listed?
          </h2>
          <p className="mt-4 text-stone-dark/70 max-w-lg mx-auto">If it falls within property care, maintenance, presentation, construction support, or rental operations, there&apos;s a good chance we can help.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light">
              Get a Quote
            </a>
            <a href="tel:802-342-8293" className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent ring-1 ring-cream/30 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-cream/10">
              Call 802-342-8293
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

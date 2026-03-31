"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  "Lawn Care",
  "Hardscaping & Patios",
  "Fence Installation",
  "Flooring",
  "Snow Removal",
  "Construction",
  "Full Property Care",
  "Other",
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to form handler (Formspree, Netlify Forms, or custom API)
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-soil py-24 md:py-32"
    >
      <div className="contact-content mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — CTA */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-copper-light">
              Get Started
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight leading-[1.1]">
              Let&apos;s talk about<br />
              <span className="text-stone italic">your property.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-light/70 max-w-md">
              Free consultations. Transparent pricing. No pressure, no runaround.
              Tell us what you need and we&apos;ll walk the property together.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:802-342-8293"
                className="flex items-center gap-3 text-cream transition-colors hover:text-stone-light"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/30 ring-1 ring-forest/50">
                  <Phone className="h-4 w-4" strokeWidth={2} />
                </div>
                <span className="text-lg font-medium">802-342-8293</span>
              </a>
              <a
                href="mailto:info@meticulous802.com"
                className="flex items-center gap-3 text-cream transition-colors hover:text-stone-light"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/30 ring-1 ring-forest/50">
                  <Mail className="h-4 w-4" strokeWidth={2} />
                </div>
                <span className="text-lg font-medium">info@meticulous802.com</span>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl bg-forest/10 p-12 ring-1 ring-forest/20">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest">
                    <Send className="h-6 w-6 text-cream" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-cream">
                    Message sent.
                  </h3>
                  <p className="mt-2 text-stone-light/70">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-light/80 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className={cn(
                      "w-full rounded-xl border-0 bg-soil-light/80 px-4 py-3.5 text-cream",
                      "ring-1 ring-white/10 placeholder:text-stone-light/30",
                      "focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
                    )}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-stone-light/80 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    className={cn(
                      "w-full rounded-xl border-0 bg-soil-light/80 px-4 py-3.5 text-cream",
                      "ring-1 ring-white/10 placeholder:text-stone-light/30",
                      "focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
                    )}
                    placeholder="(802) 555-0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-stone-light/80 mb-2"
                  >
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className={cn(
                      "w-full rounded-xl border-0 bg-soil-light/80 px-4 py-3.5 text-cream",
                      "ring-1 ring-white/10",
                      "focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled className="text-stone-light/30">
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-stone-light/80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={cn(
                      "w-full rounded-xl border-0 bg-soil-light/80 px-4 py-3.5 text-cream resize-none",
                      "ring-1 ring-white/10 placeholder:text-stone-light/30",
                      "focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
                    )}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-forest px-6 py-4 text-base font-medium text-cream transition-all duration-200 hover:bg-forest-light shadow-lg shadow-forest/20 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" strokeWidth={2} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

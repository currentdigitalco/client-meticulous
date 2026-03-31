"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { InnerLayout } from "@/components/shared/inner-layout";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(".contact-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 });
    gsap.fromTo(".contact-form", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.5 });
    gsap.fromTo(".contact-info", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.6 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <InnerLayout>
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          {/* Header */}
          <div className="contact-title text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">
              Contact
            </p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
              Let&apos;s talk about<br />
              <span className="text-stone italic">your property.</span>
            </h1>
            <p className="mt-4 text-stone-dark/50 text-base">
              Free consultations. Transparent pricing. No pressure.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="contact-form flex flex-col items-center justify-center py-20 rounded-2xl bg-forest/10 ring-1 ring-forest/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest">
                <Send className="h-6 w-6 text-cream" />
              </div>
              <h2 className="mt-6 font-display text-2xl text-cream">Message sent.</h2>
              <p className="mt-2 text-stone-dark/60">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-dark/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border-0 bg-white/5 px-5 py-4 text-cream ring-1 ring-white/10 placeholder:text-stone-dark/30 focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-dark/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border-0 bg-white/5 px-5 py-4 text-cream ring-1 ring-white/10 placeholder:text-stone-dark/30 focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-dark/80 mb-2">
                  What are you looking for?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border-0 bg-white/5 px-5 py-4 text-cream ring-1 ring-white/10 placeholder:text-stone-dark/30 focus:outline-none focus:ring-2 focus:ring-forest transition-all duration-200 resize-none"
                  placeholder="Tell us about your project — lawn care, patio, fence, flooring, snow removal, construction, or something else..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-forest px-6 py-4 text-base font-medium text-cream transition-all duration-200 hover:bg-forest-light flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                Send Message
              </button>
            </form>
          )}

          {/* Contact info below form */}
          <div className="contact-info mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/5 pt-12">
            <a href="tel:802-342-8293" className="flex items-center gap-3 text-stone-dark/60 hover:text-cream transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <Phone className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-stone-dark/40 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-medium text-cream">802-342-8293</p>
              </div>
            </a>
            <a href="mailto:info@meticulous802.com" className="flex items-center gap-3 text-stone-dark/60 hover:text-cream transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <Mail className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-stone-dark/40 uppercase tracking-wider">Email</p>
                <p className="text-sm font-medium text-cream">info@meticulous802.com</p>
              </div>
            </a>
            <div className="flex items-center gap-3 text-stone-dark/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <MapPin className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-stone-dark/40 uppercase tracking-wider">Area</p>
                <p className="text-sm font-medium text-cream">Serving Vermont</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

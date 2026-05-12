"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { InnerLayout } from "@/components/shared/inner-layout";
import { QuoteForm } from "@/components/shared/quote-form";

export function ContactPage() {
  return (
    <InnerLayout>
      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-8 mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
          Contact
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] max-w-3xl">
          Tell us about the property.
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-stone-dark/65 max-w-2xl">
          Free walkthrough. Clear quote. No cookie-cutter packages. We reply
          within one business day — usually faster.
        </p>
      </section>

      <section className="pb-24 md:pb-32 px-6 md:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-soil-light/15 ring-1 ring-white/5 p-7 md:p-10">
              <QuoteForm subjectLine="New lead — /contact page" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light mb-5">
                  Direct
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Phone
                      size={16}
                      strokeWidth={2}
                      className="text-forest-light flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <a
                        href="tel:+18023428293"
                        className="text-base text-cream hover:text-forest-light transition-colors"
                      >
                        802-342-8293
                      </a>
                      <p className="text-xs text-stone-dark/50 mt-0.5">
                        Storm response 24/7
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail
                      size={16}
                      strokeWidth={2}
                      className="text-forest-light flex-shrink-0 mt-0.5"
                    />
                    <a
                      href="mailto:getmeticulous@gmail.com"
                      className="text-base text-cream hover:text-forest-light transition-colors"
                    >
                      getmeticulous@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      strokeWidth={2}
                      className="text-forest-light flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-base text-cream">Rutland, Vermont</p>
                      <p className="text-xs text-stone-dark/50 mt-0.5">
                        Serving Rutland County + Woodstock + Ludlow
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light mb-4">
                  Credentials
                </h3>
                <ul className="space-y-2 text-sm text-stone-dark/70">
                  <li>Vermont-registered residential contractor</li>
                  <li>Registered Property Management Firm</li>
                  <li>Fully licensed and insured</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

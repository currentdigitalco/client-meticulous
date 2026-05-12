"use client";

import { useState } from "react";
import { Send, Phone } from "lucide-react";
import { FORM_ACCESS_KEY, FORM_SUBMIT_URL } from "@/lib/form-config";

const SERVICE_OPTIONS = [
  { value: "grounds-maintenance", label: "Grounds maintenance" },
  { value: "landscaping", label: "Landscaping" },
  { value: "property-maintenance", label: "Property maintenance" },
  { value: "snow-ice-management", label: "Snow & ice management" },
  { value: "hardscaping", label: "Hardscaping" },
  { value: "carpentry", label: "Carpentry" },
  { value: "housekeeping", label: "Housekeeping" },
  { value: "rental-support", label: "Rental support" },
  { value: "other", label: "Other / not sure yet" },
];

interface QuoteFormProps {
  defaultService?: string;
  defaultCity?: string;
  subjectLine?: string;
  compact?: boolean;
}

export function QuoteForm({
  defaultService,
  defaultCity,
  subjectLine,
  compact = false,
}: QuoteFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subject = subjectLine ?? (defaultCity && defaultService
    ? "New lead - " + defaultService + " / " + defaultCity
    : "New lead - meticulous802.com");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formEl = e.currentTarget;
    const payload = new FormData(formEl);
    payload.append("access_key", FORM_ACCESS_KEY);
    payload.append("subject", subject);
    if (defaultCity) payload.append("source_city", defaultCity);
    if (defaultService) payload.append("source_service", defaultService);
    payload.append(
      "source_url",
      typeof window !== "undefined" ? window.location.href : ""
    );

    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        body: payload,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        formEl.reset();
      } else {
        setError("Something went wrong. Please call 802-342-8293.");
      }
    } catch {
      setError("Network issue submitting. Please call 802-342-8293.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-forest-light/15 ring-1 ring-forest-light/30 p-8 text-center">
        <h3 className="text-xl font-medium text-cream tracking-tight mb-3">
          Got it. We&apos;ll be in touch.
        </h3>
        <p className="text-[15px] leading-relaxed text-stone-dark/70 max-w-md mx-auto">
          We typically respond within one business day. For urgent storm response or
          a same-day question, call{" "}
          <a href="tel:+18023428293" className="text-forest-light underline-offset-2 hover:underline">
            802-342-8293
          </a>.
        </p>
      </div>
    );
  }

  const inputBase = "w-full rounded-xl bg-soil-light/30 ring-1 ring-white/10 px-4 py-3 text-[15px] text-cream placeholder:text-stone-dark/40 focus:outline-none focus:ring-forest-light/50 transition";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-5"}>
      <div className={compact ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <label htmlFor="qf-name" className="sr-only">Name</label>
          <input id="qf-name" type="text" name="name" required placeholder="Your name" className={inputBase} />
        </div>
        <div>
          <label htmlFor="qf-phone" className="sr-only">Phone</label>
          <input id="qf-phone" type="tel" name="phone" required placeholder="Phone" className={inputBase} />
        </div>
      </div>
      <div>
        <label htmlFor="qf-email" className="sr-only">Email</label>
        <input id="qf-email" type="email" name="email" required placeholder="Email" className={inputBase} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="qf-service" className="sr-only">Service</label>
          <select id="qf-service" name="service" defaultValue={defaultService ?? ""} className={inputBase}>
            <option value="" disabled>Service needed</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="qf-town" className="sr-only">Town</label>
          <input id="qf-town" type="text" name="town" defaultValue={defaultCity ?? ""} placeholder="Town" className={inputBase} />
        </div>
      </div>
      <div>
        <label htmlFor="qf-message" className="sr-only">Message</label>
        <textarea id="qf-message" name="message" rows={compact ? 3 : 4} placeholder="What does the property need? (the more detail, the faster we can quote)" className={inputBase} />
      </div>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {error && (
        <p className="text-sm text-copper-light flex items-center gap-2">
          <Phone size={14} strokeWidth={2} /> {error}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-forest-light text-soil font-medium text-sm tracking-wide hover:bg-cream transition-colors disabled:opacity-60">
          {submitting ? "Sending..." : "Get my quote"}
          <Send size={14} strokeWidth={2} />
        </button>
        <a href="tel:+18023428293" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl ring-1 ring-white/15 text-cream font-medium text-sm tracking-wide hover:ring-white/30 transition-colors">
          <Phone size={14} strokeWidth={2} /> Call 802-342-8293
        </a>
      </div>
      <p className="text-xs text-stone-dark/45 pt-1">
        We reply within one business day. Free walkthrough — no obligation.
      </p>
    </form>
  );
}

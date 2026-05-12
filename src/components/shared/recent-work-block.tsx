import { CheckCircle2 } from "lucide-react";
import { getRecentWorkForCity } from "@/lib/service-areas-extras";

interface RecentWorkBlockProps {
  citySlug: string;
  cityName: string;
}

export function RecentWorkBlock({ citySlug, cityName }: RecentWorkBlockProps) {
  const jobs = getRecentWorkForCity(citySlug, 2);
  if (jobs.length === 0) return null;

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light mb-4">
          Work We've Done
        </p>
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-10">
          Recent jobs in and around {cityName}.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="rounded-2xl bg-soil-light/20 ring-1 ring-white/5 p-7"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-forest-light/15 flex-shrink-0">
                  <CheckCircle2 size={14} strokeWidth={2} className="text-forest-light" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-cream tracking-tight">
                    {job.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-dark/65">
                    {job.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

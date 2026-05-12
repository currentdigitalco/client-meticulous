import { ArrowRight } from "lucide-react";

type Season = "spring" | "summer" | "fall" | "winter";

function resolveSeason(): Season {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return "spring"; // Mar-May
  if (month >= 5 && month <= 7) return "summer"; // Jun-Aug
  if (month >= 8 && month <= 10) return "fall"; // Sep-Nov
  return "winter"; // Dec-Feb
}

interface SeasonalCTAProps {
  city: string;
  service: string;
}

export function SeasonalCTA({ city, service }: SeasonalCTAProps) {
  const season = resolveSeason();

  const content = (() => {
    switch (season) {
      case "spring":
        return {
          eyebrow: "Spring window",
          headline: `Mud-season walkthroughs are open for ${city}.`,
          body: `We're routing through ${city} this month for property assessments, driveway grading, and spring-open prep. Book before mid-May to lock the window before the summer schedule fills.`,
          buttonLabel: "Book a spring walkthrough",
        };
      case "summer":
        return {
          eyebrow: "Building season",
          headline: `${service} season is open in ${city}.`,
          body: `Quote turnaround under 48 hours for ${city} properties this week. Hardscape, grounds, and project work scheduled from May through the first hard frost.`,
          buttonLabel: "Get a 48-hour quote",
        };
      case "fall":
        return {
          eyebrow: "Snow contracts filling",
          headline: `2026-27 plow contracts for ${city} are open now.`,
          body: `Lock priority dispatch and trigger-based response before the route fills. We sign ${city} seasonal contracts in September and October — last call before the first storm.`,
          buttonLabel: "Reserve my plow spot",
        };
      case "winter":
        return {
          eyebrow: "Storm response active",
          headline: `${city} storm response is running 24/7.`,
          body: `Mid-season pickups for ${city} properties available on a case-by-case basis. Call to confirm slots before the next system.`,
          buttonLabel: "Check storm-response availability",
        };
    }
  })();

  return (
    <div className="rounded-2xl bg-forest-light/10 ring-1 ring-forest-light/25 p-7 md:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-forest-light mb-3">
        {content.eyebrow}
      </p>
      <h3 className="font-display text-xl md:text-2xl tracking-tight text-cream leading-snug">
        {content.headline}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-stone-dark/70 max-w-2xl">
        {content.body}
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href="#get-quote"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-light text-soil font-medium text-sm tracking-wide hover:bg-cream transition-colors"
        >
          {content.buttonLabel} <ArrowRight size={14} strokeWidth={2} />
        </a>
        <a
          href="tel:+18023428293"
          className="inline-flex items-center text-sm font-medium text-cream/80 hover:text-cream transition-colors py-2.5"
        >
          or call 802-342-8293
        </a>
      </div>
    </div>
  );
}

import { Shield, Phone, MapPin, Clock } from "lucide-react";

export function SocialProofStrip({ region }: { region?: string }) {
  const items = [
    {
      icon: Shield,
      label: "Vermont-registered residential contractor",
    },
    {
      icon: Shield,
      label: "Registered Property Management Firm",
    },
    {
      icon: MapPin,
      label: region ? `Serving ${region}` : "Serving Rutland County, VT",
    },
    {
      icon: Clock,
      label: "Reply within 1 business day",
    },
    {
      icon: Phone,
      label: "802-342-8293",
    },
  ];

  return (
    <div className="rounded-2xl bg-soil-light/20 ring-1 ring-white/5 px-6 py-5">
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 justify-center">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li
              key={it.label}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-stone-dark/70"
            >
              <Icon size={13} strokeWidth={2} className="text-forest-light flex-shrink-0" />
              <span>{it.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

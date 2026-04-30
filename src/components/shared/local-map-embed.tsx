type Props = {
  city: string;
  state?: string;
};

export function LocalMapEmbed({ city, state = "VT" }: Props) {
  const q = encodeURIComponent(`${city}, ${state}`);
  const src = `https://maps.google.com/maps?q=${q}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-soil/60">
          Service Area
        </p>
        <h2 className="mb-8 max-w-2xl text-3xl md:text-4xl font-light text-soil">
          {city}, {state}
        </h2>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-soil/10">
          <iframe
            src={src}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${city}, ${state} service area`}
          />
        </div>
      </div>
    </section>
  );
}

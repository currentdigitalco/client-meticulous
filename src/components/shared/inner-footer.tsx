import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function InnerFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-soil border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-2xl text-cream tracking-tight">
              Meticulous
            </span>
            <p className="mt-4 text-sm leading-relaxed text-stone-dark/50 max-w-sm">
              Meticulous isn&apos;t just our name — it&apos;s our standard.
              Vermont&apos;s all-season property experts since 2009.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="tel:802-342-8293" className="flex items-center gap-2 text-sm text-stone-dark/70 hover:text-cream transition-colors">
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />802-342-8293
              </a>
              <a href="mailto:info@meticulous802.com" className="flex items-center gap-2 text-sm text-stone-dark/70 hover:text-cream transition-colors">
                <Mail className="h-3.5 w-3.5" strokeWidth={2} />info@meticulous802.com
              </a>
              <span className="flex items-center gap-2 text-sm text-stone-dark/70">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />Serving Vermont
              </span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light">Pages</h3>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-stone-dark/70 hover:text-cream transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light">Services</h3>
            <div className="mt-4 flex flex-col gap-3">
              {["Lawn Care", "Hardscaping", "Fencing", "Flooring", "Snow Removal", "Construction"].map((s) => (
                <Link key={s} href="/services" className="text-sm text-stone-dark/70 hover:text-cream transition-colors">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-xs text-stone-dark/40">
            &copy; {year} Meticulous Mowing & Property Management, LLC
          </p>
          <p className="text-xs text-stone-dark/30">Meticulous since 2009.</p>
        </div>
      </div>
    </footer>
  );
}

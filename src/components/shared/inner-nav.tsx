"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/why-choose-us", label: "Why Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function InnerNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-soil/90 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-display text-xl tracking-tight text-cream">
              Meticulous
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-cream"
                      : "text-stone-dark/60 hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Phone CTA */}
            <a
              href="tel:802-342-8293"
              className="hidden md:flex items-center gap-2 rounded-full bg-forest/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-cream ring-1 ring-forest-light/30 transition-all duration-200 hover:bg-forest"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
              802-342-8293
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden relative z-[60] flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-cream transition-all duration-300 ${mobileOpen ? "w-6 -rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-soil flex flex-col items-center justify-center transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 visibility-visible"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-3xl tracking-tight transition-colors ${
                pathname === link.href ? "text-cream" : "text-stone-dark/50 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href="tel:802-342-8293"
          className="mt-10 flex items-center gap-2 text-sm text-copper-light"
        >
          <Phone className="h-3.5 w-3.5" strokeWidth={2} />
          802-342-8293
        </a>
      </div>
    </>
  );
}

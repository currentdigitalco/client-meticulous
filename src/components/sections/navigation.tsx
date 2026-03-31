"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top -100vh",
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => trigger.kill();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-full bg-soil/90 px-8 py-3 shadow-2xl shadow-soil/20 backdrop-blur-xl ring-1 ring-white/5">
          <a href="#" className="font-display text-xl text-cream tracking-tight">
            Meticulous
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm font-medium text-stone-light/80 transition-colors duration-200 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="tel:802-342-8293"
            className="flex items-center gap-2 rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-all duration-200 hover:bg-forest-light"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="hidden sm:inline">802-342-8293</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

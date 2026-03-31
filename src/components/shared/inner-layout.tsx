"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { InnerNav } from "./inner-nav";
import { InnerFooter } from "./inner-footer";

export function InnerLayout({ children }: { children: React.ReactNode }) {
  // Lenis smooth scroll for inner pages
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div
      className="min-h-screen bg-soil text-cream overflow-x-hidden"
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      <InnerNav />
      <main>{children}</main>
      <InnerFooter />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}

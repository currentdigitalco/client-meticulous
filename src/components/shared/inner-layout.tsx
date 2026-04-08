"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { InnerNav } from "./inner-nav";
import { InnerFooter } from "./inner-footer";

export function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

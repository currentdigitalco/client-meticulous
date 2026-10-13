// Thin GA4 event helper. gtag is loaded lazily in src/app/layout.tsx
// (G-V4HN0DL14L), so it may not exist yet when an event fires, and it never
// exists for visitors who block it. A missing gtag is a silent no-op: the
// page must work identically without analytics.

type GtagParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // Analytics must never break the page.
  }
}

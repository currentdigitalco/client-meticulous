// Conversion-focused extras keyed by city slug. Kept separate from service-areas.ts
// so the SEO data file stays focused on indexable content and this file stays focused
// on the levers that drive CTAs.

export interface RecentJob {
  title: string;
  service: string; // service slug
  outcome: string; // one-sentence result
}

export interface ServiceAreaExtras {
  // 3 closest city slugs for in-cluster cross-linking.
  nearestTowns: string[];
  // Single-sentence town-specific hook used in service-city hero subtitles.
  seasonalHook: string;
  // Proof statement specific to this town/region for trust strip.
  localProofPoint: string;
  // 1-2 recent jobs done in or near this city.
  recentWork?: RecentJob[];
  // Per-service pricing language (range or "after walkthrough").
  pricingNotes?: Partial<Record<string, string>>;
}

const COUNTY_FALLBACK: RecentJob[] = [
  {
    title: "Seasonal grounds contract — Rutland County",
    service: "grounds-maintenance",
    outcome: "Year-round bed care, mowing schedule, and seasonal cleanups across a 4-property roster — owner gets one invoice, one crew.",
  },
  {
    title: "Storm-response plowing — Killington corridor",
    service: "snow-ice-management",
    outcome: "Triggered dispatch at 3 AM before a powder day. Driveways cleared before guests arrived for first chair.",
  },
  {
    title: "Bluestone patio + dry-laid wall — central Vermont",
    service: "hardscaping",
    outcome: "Excavated to frost line, lifts compacted, finished ahead of the first hard freeze. Two-winter check confirmed zero movement.",
  },
];

export const serviceAreaExtras: Record<string, ServiceAreaExtras> = {
  killington: {
    nearestTowns: ["pittsfield", "mendon", "shrewsbury"],
    seasonalHook: "Ski-season-ready property care for Killington owners and rental operators.",
    localProofPoint: "Active routes through the Killington Road corridor every storm cycle.",
    recentWork: [
      {
        title: "Killington Road condo turnover stack",
        service: "housekeeping",
        outcome: "Synced to a 3-property booking calendar — back-to-back turnovers with photo confirmation before each arrival.",
      },
      {
        title: "Pre-season plow contract — slope-side single family",
        service: "snow-ice-management",
        outcome: "Triggers set for 4 in / 8 in / freezing-rain. Owner never has to call — dispatch is automatic.",
      },
    ],
    pricingNotes: {
      "snow-ice-management": "Killington seasonal plow contracts typically run higher than valley towns because of the snow load and elevation. We quote the contract after walking the driveway and confirming triggers.",
      "housekeeping": "Turnovers are priced per-property based on size and standard scope. Most Killington 3-bed rentals land in a predictable per-turn range.",
      "rental-support": "Full management for Killington rentals priced by scope. We bundle turnover + maintenance + property-check for a flat monthly rate where it makes sense.",
    },
  },
  rutland: {
    nearestTowns: ["west-rutland", "mendon", "clarendon"],
    seasonalHook: "Local crew, local equipment yard — same-county response for Rutland properties.",
    localProofPoint: "Equipment yard inside Rutland city limits. Closest-to-site response in the county.",
    recentWork: [
      {
        title: "Downtown Rutland commercial lot — winter contract",
        service: "snow-ice-management",
        outcome: "Storefront entryway cleared before opening, every storm. No phone calls, no excuses.",
      },
      {
        title: "Multi-family grounds program — central Rutland",
        service: "grounds-maintenance",
        outcome: "Weekly common-area care plus seasonal transitions — one point of contact for the property owner.",
      },
    ],
    pricingNotes: {
      "grounds-maintenance": "Rutland full-season grounds contracts are scoped by property size. Single-family typically lands in a predictable seasonal range; multi-family priced by unit count.",
      "snow-ice-management": "Commercial Rutland plow contracts priced by lot size and priority window. Residential by driveway length and trigger depth.",
    },
  },
  woodstock: {
    nearestTowns: ["mendon", "brandon", "pittsford"],
    seasonalHook: "Estate-grade grounds care that matches the village standard.",
    localProofPoint: "Vermont-registered contractor working historic Woodstock properties without taking shortcuts on materials.",
    recentWork: [
      {
        title: "Stone wall restoration — Woodstock estate",
        service: "hardscaping",
        outcome: "Sourced local stone to match the existing 1890s wall. Restored without losing the original character.",
      },
    ],
    pricingNotes: {
      "landscaping": "Woodstock design-and-install projects are scoped per property after a site walk. Estate work runs higher than village lots — we'll be transparent on the range before we start.",
      "hardscaping": "Hardscape pricing depends on stone selection and scope. Free walkthrough, fixed quote after.",
    },
  },
  ludlow: {
    nearestTowns: ["mount-holly", "killington", "shrewsbury"],
    seasonalHook: "Okemo-corridor property care that keeps your rental guest-ready.",
    localProofPoint: "Already routing through Ludlow and the Okemo base area every storm and every turnover window.",
    recentWork: [
      {
        title: "Jackson Gore condo — full-season management",
        service: "rental-support",
        outcome: "Turnovers, plowing, and property checks bundled. Owner is fully hands-off from a different time zone.",
      },
    ],
    pricingNotes: {
      "rental-support": "Ludlow rental-support packages are priced by scope — turnover-only is one rate, full management another. We quote both side by side so you can compare.",
      "snow-ice-management": "Ludlow seasonal plow contracts priced for the snow load. We confirm trigger depths before signing.",
    },
  },
  pittsfield: {
    nearestTowns: ["killington", "mendon", "shrewsbury"],
    seasonalHook: "Long-driveway property care for Pittsfield's spread-out homes.",
    localProofPoint: "Equipment sized for the long rural driveways that define Pittsfield property care.",
    pricingNotes: {
      "snow-ice-management": "Pittsfield plow contracts are scoped by driveway length and turnaround complexity. The free walkthrough is how we get the price right.",
    },
  },
  chittenden: {
    nearestTowns: ["mendon", "pittsford", "rutland"],
    seasonalHook: "Reliable grounds care for Chittenden's rural and reservoir-front properties.",
    localProofPoint: "Comfortable working the narrow back roads and waterside parcels Chittenden is built around.",
    pricingNotes: {
      "grounds-maintenance": "Larger Chittenden parcels are priced by actual acreage and scope — not a fixed-tier package. Free walkthrough first.",
    },
  },
  mendon: {
    nearestTowns: ["rutland", "killington", "pittsfield", "chittenden"],
    seasonalHook: "Route 4 corridor coverage — consistent service, no travel-time premium.",
    localProofPoint: "On Route 4 between our Rutland yard and Killington every day of the year.",
    recentWork: [
      {
        title: "Mendon hillside home — full-season contract",
        service: "property-maintenance",
        outcome: "Grounds + winter + spring-and-fall transitions on a single annual agreement.",
      },
    ],
  },
  proctor: {
    nearestTowns: ["rutland", "west-rutland", "pittsford"],
    seasonalHook: "Careful craftsmanship for Proctor's historic homes and tight village lots.",
    localProofPoint: "Equipment scaled to Proctor — smaller machines and hand-finishing where village lots demand it.",
    pricingNotes: {
      "carpentry": "Older home work is scoped after we see the materials. We quote the job, not a per-hour rate.",
    },
  },
  "west-rutland": {
    nearestTowns: ["rutland", "castleton", "proctor"],
    seasonalHook: "No-nonsense property care for West Rutland — fair pricing, crews that show up.",
    localProofPoint: "Core service area. Same-day responsiveness on the routes through Route 4A.",
    recentWork: [
      {
        title: "Route 4A small commercial — winter contract",
        service: "snow-ice-management",
        outcome: "Cleared before business open. Trigger-based dispatch, no morning phone calls.",
      },
    ],
  },
  brandon: {
    nearestTowns: ["pittsford", "woodstock", "proctor"],
    seasonalHook: "Property care that matches Brandon's village-standard presentation.",
    localProofPoint: "Working historic Brandon homes and downtown properties without forcing a template.",
    pricingNotes: {
      "landscaping": "Brandon design-install projects are scoped per property. Free walkthrough, fixed quote — no per-hour surprises.",
    },
  },
  castleton: {
    nearestTowns: ["fair-haven", "west-rutland", "rutland", "poultney"],
    seasonalHook: "Lakefront property care — spring opening through fall close on Lake Bomoseen.",
    localProofPoint: "Standing schedule for Bomoseen spring opens and fall closings — we book the route, not one-off visits.",
    recentWork: [
      {
        title: "Lake Bomoseen seasonal cottage — spring open",
        service: "property-maintenance",
        outcome: "Dock inspection, grounds reset, interior readiness. Owner arrived to a fully open property in May.",
      },
    ],
    pricingNotes: {
      "housekeeping": "Castleton rental turnovers and lakefront deep cleans priced per visit and per property. Standard sizes have predictable rates.",
    },
  },
  wallingford: {
    nearestTowns: ["clarendon", "tinmouth", "shrewsbury"],
    seasonalHook: "Year-round property care for Wallingford homes — local routing, no distance premium.",
    localProofPoint: "Route 7 corridor coverage means Wallingford properties aren't an afterthought stop.",
  },
  pittsford: {
    nearestTowns: ["brandon", "florence", "proctor", "chittenden"],
    seasonalHook: "Practical, durable property care for Pittsford homes and farms.",
    localProofPoint: "Year-round routing through Pittsford on the Route 7 corridor — same crew every visit.",
  },
  clarendon: {
    nearestTowns: ["wallingford", "rutland", "shrewsbury"],
    seasonalHook: "Commuter-priority property care for Clarendon homeowners.",
    localProofPoint: "Driveways cleared before the workday — automatic trigger-based dispatch for Clarendon contracts.",
  },
  shrewsbury: {
    nearestTowns: ["wallingford", "clarendon", "killington"],
    seasonalHook: "Mountain-grade property care for Shrewsbury's deep-snow properties.",
    localProofPoint: "Equipment sized for Shrewsbury's elevation — 150+ inch winters are the design baseline, not a surprise.",
    pricingNotes: {
      "snow-ice-management": "Shrewsbury contracts priced for the snow load, not the valley average. The walkthrough confirms equipment fit before we quote.",
    },
  },
  tinmouth: {
    nearestTowns: ["wallingford", "clarendon", "rutland"],
    seasonalHook: "Conservation-minded property care for Tinmouth's larger rural parcels.",
    localProofPoint: "Low-impact approach when the property calls for it — we adjust to the owner's conservation priorities.",
  },
  florence: {
    nearestTowns: ["pittsford", "brandon", "proctor"],
    seasonalHook: "Route 7 corridor property care — Florence on the regular schedule.",
    localProofPoint: "Florence is on our standing Route 7 route. No premium for distance.",
  },
  "fair-haven": {
    nearestTowns: ["castleton", "west-rutland", "rutland", "poultney"],
    seasonalHook: "Western-corridor property care for Fair Haven homes and small commercial.",
    localProofPoint: "Fair Haven sits on our western Rutland County route — Castleton and Fair Haven serviced the same morning.",
  },
  "mount-holly": {
    nearestTowns: ["ludlow", "shrewsbury", "killington"],
    seasonalHook: "Okemo-corridor property care that extends to Mount Holly's higher-elevation homes.",
    localProofPoint: "On Route 103 through the Okemo area every storm and every turnover cycle.",
    pricingNotes: {
      "snow-ice-management": "Mount Holly plow contracts are scoped for the elevation. We confirm equipment fit on the walkthrough before quoting.",
    },
  },
  poultney: {
    // Poultney was the only one of the 20 service areas with no extras entry at
    // all, which is why it had no outbound neighbour links and fell through to
    // the generic meta-description branch on all 9 of its service pages.
    // Neighbours and copy below restate what the town's own page already
    // publishes ("we already run routes through Fair Haven and Castleton"),
    // rather than asserting anything new about the business.
    nearestTowns: ["fair-haven", "castleton", "west-rutland"],
    seasonalHook: "Slate-belt property care along Route 30 — no long-haul drive premium.",
    localProofPoint: "Already routing through Fair Haven and Castleton on the way into the slate belt.",
  },
};

export function getExtras(slug: string): ServiceAreaExtras | undefined {
  return serviceAreaExtras[slug];
}

export function getRecentWorkForCity(slug: string, limit = 2): RecentJob[] {
  const extras = serviceAreaExtras[slug];
  if (extras?.recentWork && extras.recentWork.length > 0) {
    return extras.recentWork.slice(0, limit);
  }
  return COUNTY_FALLBACK.slice(0, limit);
}

export function getPricingNote(slug: string, serviceSlug: string): string | undefined {
  return serviceAreaExtras[slug]?.pricingNotes?.[serviceSlug];
}

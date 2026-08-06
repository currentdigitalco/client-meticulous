// Conversion-focused service extras: pricing language and city-type spin lines.
// Kept separate from service-data.ts so the SEO content stays focused.

export type TownType = "mountain" | "lake" | "urban" | "historic" | "rural";

export interface ServiceExtras {
  // Default price language used when the city doesn't override it.
  priceAnchor: string;
  // One-line "what this looks like here" by town type.
  townTypeSpins: Record<TownType, string>;
}

export const serviceExtras: Record<string, ServiceExtras> = {
  "grounds-maintenance": {
    priceAnchor: "Full-season grounds contracts are priced after a property walkthrough. Most single-family contracts land in a predictable seasonal range; we confirm the number before any work starts.",
    townTypeSpins: {
      mountain: "Schedule shifts later here — ground stays soft into May, and we hold heavy equipment off lawns until it's firm enough to support without compaction.",
      lake: "Spring opening drives the calendar — beds, shoreline grounds, and driveway approach all hit at the same window.",
      urban: "Tight lot care: mowing patterns set to avoid plow damage from the prior winter, edges re-cut clean, debris hauled, not bagged on-site.",
      historic: "Mature plantings get worked around carefully — same crew across the season so they learn where the specimens are.",
      rural: "Larger parcels priced by actual acreage, not a flat-tier package. Routing built around the rural roads, not against them.",
    },
  },
  landscaping: {
    priceAnchor: "Design-and-install projects are scoped from a free site walk. We give a fixed quote — no per-hour open meter.",
    townTypeSpins: {
      mountain: "Hardiness-zone-correct plantings only. Anything that doesn't survive a Vermont mountain winter doesn't go in.",
      lake: "Shoreline and waterside work gets extra care — environmental sensitivity is the constraint, not a checkbox.",
      urban: "Compact lots get layered planting plans — perennials, ornamentals, and structure plants that look intentional from the curb.",
      historic: "Plant palette respects the architectural era. New beds read like they've always been there.",
      rural: "Larger landscape jobs scheduled around field access and equipment routing — we don't tear up your lawn getting to the work.",
    },
  },
  "property-maintenance": {
    priceAnchor: "Property maintenance scoped by what your property actually needs. We build the package around your usage and quote it cleanly.",
    townTypeSpins: {
      mountain: "Property checks especially valuable here — winter weather creates issues that benefit from quick eyes on the ground.",
      lake: "Seasonal opening and closing are core — we book those routes early so lakefront owners aren't scrambling first warm weekend.",
      urban: "Gutters, walkways, drainage — the issues that compound on tight lots if no one's watching.",
      historic: "Older homes need attention to small things before they become big things. Photo documentation each visit.",
      rural: "Long absences are no problem — scheduled property checks with condition reports and photo-flagged issues.",
    },
  },
  "fall-cleanup": {
    priceAnchor: "Fall cleanups are priced per property after a walkthrough — tree cover, leaf load, bed count, and gutter length drive the scope. Standalone visits or bundled with a seasonal snow contract; we confirm the number before any work starts.",
    townTypeSpins: {
      mountain: "Leaf drop comes early at elevation and the snow follows fast — cleanup gets scheduled tight to conditions, often on the same visit that sets up the winter snow contract.",
      lake: "Waterfront properties get closed out properly — leaf load cleared from lawns and gutters, beds cut back, and everything stowed before ice season.",
      urban: "Village lots get full haul-away — no curbside piles waiting for a pickup that may not come, and driveway edges cleared so winter plowing starts clean.",
      historic: "Mature maples drop heavy here. We work carefully around established beds and specimen plantings — the cleanup respects what took decades to grow.",
      rural: "Acreage-scale cleanup scoped by actual leaf load and blowdown, not a flat package — field edges, long driveways, and wooded property lines included in the walkthrough.",
    },
  },
  "snow-ice-management": {
    priceAnchor: "Seasonal plow contracts priced after we walk the driveway and set trigger depths. Commercial by lot, residential by driveway.",
    townTypeSpins: {
      mountain: "Trigger depths set for the actual snow load — typically 200+ inches over the season. Equipment matches the terrain.",
      lake: "Driveway grading and shoreline access checked before winter — pre-season prep matters as much as storm response.",
      urban: "Commercial lots cleared before business open. Residential before the workday. Trigger-based dispatch, automatic.",
      historic: "Tight lots and shared driveways get scaled equipment — no oversized trucks taking out edges and stone walls.",
      rural: "Long driveways and turnaround complexity priced in — no surprises mid-season.",
    },
  },
  hardscaping: {
    priceAnchor: "Hardscape projects quoted after a site walk. Free walkthrough, fixed-quote build, materials and base prep transparent in writing.",
    townTypeSpins: {
      mountain: "Frost line is deep here — base prep and proper depth aren't optional, they're what makes the work last past two winters.",
      lake: "Shoreline hardscape and lakefront walkways planned around grade and drainage — water moves, and we plan for it.",
      urban: "Tight-access hardscape sometimes means hand-carrying material in. We scope that honestly up front.",
      historic: "Existing stonework gets matched, not replaced. We source local stone when the property calls for it.",
      rural: "Larger hardscape jobs sequence with equipment access — we don't tear up the lawn getting to the patio.",
    },
  },
  carpentry: {
    priceAnchor: "Exterior carpentry quoted per project — we look at the materials, the rot, and the scope, then give you a number that doesn't move.",
    townTypeSpins: {
      mountain: "Decks and structural work get inspected for winter movement before any repair starts.",
      lake: "Lakefront decks and waterside structures need extra moisture detail — we use rated materials and proper flashing.",
      urban: "Trim, siding, and historic-character carpentry in village homes — detail-matched rather than substituted.",
      historic: "Older home repairs match original profiles. We don't substitute trim that's available at the box store for what was originally there.",
      rural: "Outbuildings, ag-adjacent structures, and large decks priced by scope after we see the materials in person.",
    },
  },
  housekeeping: {
    priceAnchor: "Turnovers priced per property and per scope. Standard sizes have predictable rates; we'll confirm in writing before the first turn.",
    townTypeSpins: {
      mountain: "Sync to your booking calendar across platforms — back-to-back turnovers happen, and we plan for them.",
      lake: "Pre-season deep cleans and turnover service for seasonal rentals — we book the route, not one-off visits.",
      urban: "Smaller-footprint turnovers for in-town rentals — fast, complete, photo-confirmed.",
      historic: "Older surfaces and original materials cleaned with the right products — no shortcut chemicals that wreck finishes.",
      rural: "Remote-property cleans coordinated with your check-in window, with photo confirmation for owners not on-site.",
    },
  },
  "rental-support": {
    priceAnchor: "Rental support packaged by scope — turnover-only is one rate, full management another. We'll show both side-by-side.",
    townTypeSpins: {
      mountain: "Seasonal transitions are the work — opening, winterization, and the spring prep that gets the property back to guest-ready after ski season.",
      lake: "Lakefront seasonal patterns drive the calendar — dock check, shoreline cleanup, dock storage on the other end.",
      urban: "Year-round rental coordination — turnovers, maintenance triage, guest-issue response.",
      historic: "Care that respects the property's character — guest-ready without rough handling.",
      rural: "Local point-of-contact for remote owners. We're the eyes and hands on the ground.",
    },
  },
};

export function getServiceExtras(serviceSlug: string): ServiceExtras | undefined {
  return serviceExtras[serviceSlug];
}

// Resolve a town type from a city slug. Falls back to "rural" if unmatched.
export function getTownType(citySlug: string): TownType {
  const mountain = ["killington", "ludlow", "pittsfield", "mount-holly", "shrewsbury"];
  const lake = ["castleton", "chittenden"];
  const urban = ["rutland", "west-rutland"];
  const historic = ["woodstock", "brandon", "proctor"];
  if (mountain.includes(citySlug)) return "mountain";
  if (lake.includes(citySlug)) return "lake";
  if (urban.includes(citySlug)) return "urban";
  if (historic.includes(citySlug)) return "historic";
  return "rural";
}

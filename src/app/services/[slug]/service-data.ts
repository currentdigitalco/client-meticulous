export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FeatureDetail {
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  introParagraphs: string[];
  features: string[];
  featureDetails: FeatureDetail[];
  process: ProcessStep[];
  differentiators: string[];
  relatedServices: string[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "grounds-maintenance",
    title: "Grounds Maintenance",
    subtitle: "Professional Grounds Maintenance in Killington, Rutland & Surrounding Vermont Areas",
    seoTitle: "Grounds Maintenance Services | Killington & Rutland, VT | Meticulous LLC",
    seoDescription: "Professional grounds maintenance in Killington, Rutland & surrounding Vermont areas. Routine mowing, trimming, seasonal cleanups & full-season property care. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    introParagraphs: [
      "At Meticulous LLC, we provide dependable, professional grounds maintenance services designed to keep your property clean, healthy, and consistently well maintained throughout the season.",
      "From routine mowing and trimming to seasonal cleanups and ongoing exterior upkeep, our team helps homeowners, second-home owners, and property managers maintain properties that look sharp and stay under control.",
      "Whether you need weekly service or full-season care, we deliver reliable results backed by strong communication and attention to detail.",
    ],
    features: [
      "Routine mowing & trimming",
      "Edging & exterior upkeep",
      "Spring & fall cleanups",
      "Seasonal maintenance programs",
      "Mulch installation",
      "Shrub & hedge trimming",
    ],
    featureDetails: [
      {
        title: "Routine Mowing & Trimming",
        description: "Consistent, weekly or bi-weekly mowing with string trimming around obstacles, fences, and garden beds. We adjust cutting heights based on grass type and seasonal conditions to promote healthier growth.",
      },
      {
        title: "Edging & Exterior Upkeep",
        description: "Clean-cut edges along driveways, walkways, and garden borders that give your property a polished, well-maintained look. We also handle debris removal and general exterior tidying.",
      },
      {
        title: "Spring & Fall Cleanups",
        description: "Thorough seasonal transitions — spring cleanup includes leaf removal, bed prep, and debris clearing. Fall cleanup covers leaf removal, gutter clearing, and preparing your landscape for winter.",
      },
      {
        title: "Seasonal Maintenance Programs",
        description: "Full-season service plans that cover everything from first thaw to final leaf drop. One agreement, one team, consistent results all year without the hassle of scheduling individual visits.",
      },
      {
        title: "Mulch Installation",
        description: "Fresh mulch application to garden beds and tree rings to improve moisture retention, suppress weeds, and give your landscape a clean, finished appearance.",
      },
      {
        title: "Shrub & Hedge Trimming",
        description: "Seasonal pruning and shaping to keep hedges, shrubs, and ornamental plantings looking intentional and well cared for — not overgrown or neglected.",
      },
    ],
    process: [
      { step: "01", title: "Property Assessment", description: "We walk your property together, identify priorities, and understand exactly what level of care you're looking for." },
      { step: "02", title: "Custom Service Plan", description: "We build a maintenance schedule tailored to your property's size, terrain, and seasonal needs — no cookie-cutter packages." },
      { step: "03", title: "Consistent Execution", description: "Our crew shows up on schedule, every time. Same team, same standards, same attention to detail week after week." },
      { step: "04", title: "Ongoing Communication", description: "You'll hear from us proactively — whether it's a condition we noticed, a seasonal recommendation, or a schedule update." },
    ],
    differentiators: [
      "Serving Vermont properties since 2009 — we understand the terrain, the seasons, and the expectations",
      "Same crew on your property every visit for consistency and accountability",
      "Proactive communication — we flag issues before they become problems",
      "Full-season programs that eliminate the hassle of scheduling individual services",
    ],
    relatedServices: ["landscaping", "property-maintenance"],
  },
  {
    slug: "landscaping",
    title: "Landscaping & Exterior Enhancements",
    subtitle: "Landscaping Services & Exterior Property Enhancements in Vermont",
    seoTitle: "Landscaping & Exterior Enhancements | Vermont | Meticulous LLC",
    seoDescription: "Professional landscaping and exterior enhancement services in Vermont. Mulching, planting, seasonal cleanups & curb appeal upgrades. Call 802-342-8293.",
    heroImage: "/images/bg-landscaping.jpeg",
    introParagraphs: [
      "Meticulous LLC offers professional landscaping and exterior enhancement services designed to improve the appearance and overall presentation of your property.",
      "From mulching and planting to seasonal cleanups and curb appeal upgrades, we help create outdoor spaces that feel clean, intentional, and well maintained.",
      "Whether you\u2019re preparing for the season or improving long-term property value, we bring a detail-focused approach to every project.",
    ],
    features: [
      "Mulching & planting",
      "Seasonal cleanups",
      "Curb appeal improvements",
      "Exterior property upgrades",
      "Garden bed maintenance",
      "Property presentation",
    ],
    featureDetails: [
      {
        title: "Mulching & Planting",
        description: "Strategic mulch application and seasonal planting that enhances your property's appearance while supporting plant health. We select materials and plants suited to Vermont's climate.",
      },
      {
        title: "Seasonal Cleanups",
        description: "Complete spring and fall transitions — clearing debris, prepping beds, removing dead growth, and setting your landscape up for the next season.",
      },
      {
        title: "Curb Appeal Improvements",
        description: "Targeted upgrades that make the biggest visual impact — refreshed beds, defined borders, accent plantings, and exterior detailing that transforms how your property presents.",
      },
      {
        title: "Exterior Property Upgrades",
        description: "Beyond basic maintenance — we handle grading corrections, drainage improvements, and structural landscape changes that improve both function and appearance.",
      },
      {
        title: "Garden Bed Maintenance",
        description: "Ongoing care for existing beds including weeding, edging, soil amendment, and seasonal replanting to keep your gardens looking vibrant and intentional.",
      },
      {
        title: "Property Presentation",
        description: "Pre-sale, pre-rental, or seasonal presentation services that ensure your property looks its absolute best when it matters most.",
      },
    ],
    process: [
      { step: "01", title: "Vision & Goals", description: "We discuss what you want your property to look and feel like — whether that's low-maintenance, show-ready, or somewhere in between." },
      { step: "02", title: "Design & Planning", description: "We map out the work with material selections, layout considerations, and a clear scope so there are no surprises." },
      { step: "03", title: "Professional Installation", description: "Our team executes with care — proper soil prep, clean edges, and attention to the details that separate good work from great work." },
      { step: "04", title: "Follow-Up Care", description: "We check back after installation to ensure everything is establishing well and make adjustments if needed." },
    ],
    differentiators: [
      "Deep knowledge of Vermont-native plants and what thrives in our climate and soil conditions",
      "Design-minded approach — we think about how your landscape looks from every angle, not just the street",
      "We handle everything from concept to cleanup, so you're not coordinating multiple contractors",
      "Focused on lasting results, not just quick cosmetic fixes that fade by mid-summer",
    ],
    relatedServices: ["grounds-maintenance", "hardscaping"],
  },
  {
    slug: "property-maintenance",
    title: "Property Maintenance",
    subtitle: "Property Maintenance Services in Killington, Rutland & Surrounding Areas",
    seoTitle: "Property Maintenance Services | Killington & Rutland, VT | Meticulous LLC",
    seoDescription: "Reliable property maintenance services in Killington, Rutland & surrounding Vermont areas. Routine upkeep, seasonal maintenance & repair coordination. Call 802-342-8293.",
    heroImage: "/images/bg-property-maintenance.jpeg",
    introParagraphs: [
      "Keeping up with property maintenance can be time-consuming and overwhelming \u2014 especially for second-home owners and rental properties.",
      "At Meticulous LLC, we provide reliable property maintenance services designed to help keep your property functional, presentable, and well cared for year-round.",
      "From routine upkeep to seasonal maintenance and repair coordination, we help simplify ownership and keep your property in top condition.",
    ],
    features: [
      "General exterior maintenance",
      "Property support services",
      "Repair coordination",
      "Seasonal maintenance",
      "Second-home oversight",
      "Preventative upkeep",
    ],
    featureDetails: [
      {
        title: "General Exterior Maintenance",
        description: "Comprehensive exterior care including gutter cleaning, pressure washing, minor repairs, and general upkeep that prevents small issues from becoming expensive problems.",
      },
      {
        title: "Property Support Services",
        description: "Hands-on support for property owners who can't always be on-site — we act as your eyes, ears, and hands on the ground.",
      },
      {
        title: "Repair Coordination",
        description: "When something needs fixing beyond our scope, we coordinate with trusted local contractors, get quotes, and oversee the work so you don't have to manage it remotely.",
      },
      {
        title: "Seasonal Maintenance",
        description: "Winterization, spring opening, storm prep, and seasonal system checks — we handle the transitions so your property is ready for whatever Vermont throws at it.",
      },
      {
        title: "Second-Home Oversight",
        description: "Regular property checks, mail collection, security monitoring, and condition reports for owners who aren't on-site full-time. Peace of mind, delivered consistently.",
      },
      {
        title: "Preventative Upkeep",
        description: "Scheduled inspections and proactive maintenance that catches issues early — before a small leak becomes water damage or a loose board becomes a safety hazard.",
      },
    ],
    process: [
      { step: "01", title: "Property Walkthrough", description: "We assess your property's current condition, identify deferred maintenance, and understand your priorities and budget." },
      { step: "02", title: "Maintenance Plan", description: "We create a scheduled maintenance calendar covering seasonal tasks, recurring upkeep, and any immediate repairs needed." },
      { step: "03", title: "Reliable Execution", description: "Tasks get completed on schedule with photo documentation and status updates so you always know what's been done." },
      { step: "04", title: "Condition Reporting", description: "Regular reports on your property's condition, upcoming maintenance needs, and recommendations — especially valuable for remote owners." },
    ],
    differentiators: [
      "Ideal for second-home owners and out-of-state property owners who need a trusted local partner",
      "Photo documentation and condition reports keep you informed without needing to be on-site",
      "We coordinate with other contractors on your behalf, saving you time and phone calls",
      "Preventative approach that protects your investment and catches issues early",
    ],
    relatedServices: ["grounds-maintenance", "rental-support"],
  },
  {
    slug: "snow-ice-management",
    title: "Snow & Ice Management",
    subtitle: "Reliable Snow Plowing & Ice Management in Rutland County, Vermont",
    seoTitle: "Snow Plowing & Ice Management | Rutland County, VT | Meticulous LLC",
    seoDescription: "Professional snow plowing & ice management in Rutland County, Vermont. Plowing, shoveling, salting & 24/7 winter response for residential, rental & commercial properties. Call 802-342-8293.",
    heroImage: "/images/bg-snow.jpeg",
    introParagraphs: [
      "Winter in Vermont demands a company you can rely on.",
      "Meticulous LLC provides professional snow and ice management services, including plowing, shoveling, and salting, designed to keep your property accessible, safer, and operational during winter conditions.",
      "We serve residential, rental, and commercial properties throughout Killington, Rutland, and surrounding areas, with dependable response times and organized service systems you can count on when it matters most.",
    ],
    features: [
      "Commercial plowing",
      "Residential clearing",
      "Salt & sand application",
      "24/7 storm response",
      "Walkway & step clearing",
      "Seasonal contracts",
    ],
    featureDetails: [
      {
        title: "Commercial Plowing",
        description: "Parking lots, access roads, and commercial properties cleared efficiently with professional-grade equipment. We prioritize business-critical areas so your operations aren't interrupted.",
      },
      {
        title: "Residential Clearing",
        description: "Driveways, turnarounds, and access points cleared promptly so you can get in and out safely. We take care not to damage edges, landscaping, or mailboxes.",
      },
      {
        title: "Salt & Sand Application",
        description: "Strategic ice management using the right materials for the conditions — rock salt, treated salt, or sand — applied to walkways, steps, and driving surfaces to reduce slip hazards.",
      },
      {
        title: "24/7 Storm Response",
        description: "Vermont storms don't wait for business hours. Our team monitors conditions and responds around the clock during active weather events to keep your property safe and accessible.",
      },
      {
        title: "Walkway & Step Clearing",
        description: "Hand-shoveled walkways, steps, porches, and entryways — the areas plows can't reach but people use every day. Finished with salt or sand for traction.",
      },
      {
        title: "Seasonal Contracts",
        description: "Lock in reliable winter service before the first storm. Seasonal contracts guarantee priority response and consistent pricing throughout the winter season.",
      },
    ],
    process: [
      { step: "01", title: "Pre-Season Setup", description: "We assess your property before winter, mark obstacles, set trigger depths, and establish your service preferences so we're ready when the first storm hits." },
      { step: "02", title: "Storm Monitoring", description: "We actively track weather systems and pre-position equipment. When conditions meet your trigger threshold, we mobilize automatically — no phone call needed." },
      { step: "03", title: "Rapid Response", description: "Plowing, shoveling, and salting executed in priority order. Commercial and rental properties get early-morning priority to minimize business disruption." },
      { step: "04", title: "Post-Storm Cleanup", description: "After the storm passes, we return for cleanup passes, bank pushback, and re-salting as needed to keep everything clean and safe." },
    ],
    differentiators: [
      "16+ winters serving Vermont properties — we know how to handle what this climate delivers",
      "Automatic dispatch based on trigger depths — you don't need to call us, we're already on the way",
      "Priority response for seasonal contract holders — your property gets serviced first",
      "We carry proper insurance and use commercial-grade equipment built for Vermont conditions",
    ],
    relatedServices: ["property-maintenance", "grounds-maintenance"],
  },
  {
    slug: "hardscaping",
    title: "Hardscaping & Exterior Improvements",
    subtitle: "Custom Patios, Walkways & Hardscape Installation in Vermont",
    seoTitle: "Patios, Walkways & Hardscape Installation | Vermont | Meticulous LLC",
    seoDescription: "Custom patios, walkways, retaining walls & hardscape installation in Vermont. Built for durability through Vermont\u2019s seasonal conditions. Call 802-342-8293.",
    heroImage: "/images/bg-hardscape.jpeg",
    introParagraphs: [
      "Meticulous LLC designs and installs high-quality hardscaping features, including patios, walkways, retaining walls, and natural stone installations.",
      "Our work is built to improve both the appearance and functionality of your property while standing up to Vermont\u2019s seasonal conditions.",
      "From concept to completion, we focus on clean installation, proper base preparation, and long-term durability.",
    ],
    features: [
      "Patios & walkways",
      "Retaining walls",
      "Natural stone installations",
      "Outdoor living features",
      "Drainage solutions",
      "Foundation engineering",
    ],
    featureDetails: [
      {
        title: "Patios & Walkways",
        description: "Custom-designed patios and walkways using pavers, flagstone, or natural stone. Properly graded and set on compacted base material to prevent shifting, settling, and frost heave.",
      },
      {
        title: "Retaining Walls",
        description: "Structural and decorative retaining walls that manage grade changes, prevent erosion, and create usable space on sloped properties. Engineered for Vermont's freeze-thaw cycles.",
      },
      {
        title: "Natural Stone Installations",
        description: "Vermont fieldstone, bluestone, and granite features that blend with the natural landscape. We source locally when possible for authentic character and reduced cost.",
      },
      {
        title: "Outdoor Living Features",
        description: "Fire pits, sitting walls, outdoor kitchens, and gathering spaces designed to extend your living area outdoors and make your property more enjoyable year-round.",
      },
      {
        title: "Drainage Solutions",
        description: "French drains, dry wells, channel drains, and regrading to manage water flow and protect your property from erosion, pooling, and foundation damage.",
      },
      {
        title: "Foundation Engineering",
        description: "Proper base preparation is everything in Vermont. We excavate to the right depth, compact in lifts, and use the right materials so your hardscape lasts decades, not seasons.",
      },
    ],
    process: [
      { step: "01", title: "Site Consultation", description: "We visit your property to discuss your vision, assess the terrain, and identify any drainage, access, or grading considerations that will shape the design." },
      { step: "02", title: "Design & Estimate", description: "We present a clear plan with material options, layout, and a detailed estimate. No vague quotes — you'll know exactly what you're getting and what it costs." },
      { step: "03", title: "Professional Build", description: "Excavation, base prep, and installation done right. We don't cut corners on the parts you can't see — that's what makes hardscape last in Vermont." },
      { step: "04", title: "Final Walkthrough", description: "We walk the finished project together, make any adjustments, and provide care recommendations to keep everything looking great long-term." },
    ],
    differentiators: [
      "Registered residential contractor in Vermont — licensed, insured, and accountable",
      "We build for Vermont's freeze-thaw cycles, not just aesthetics — proper base depth and drainage are standard",
      "Transparent, itemized estimates with no hidden costs or surprise change orders",
      "We handle the full scope — from excavation to finish grading — so you're not coordinating multiple trades",
    ],
    relatedServices: ["carpentry", "landscaping"],
  },
  {
    slug: "carpentry",
    title: "Carpentry & Construction Services",
    subtitle: "Exterior Carpentry & Construction Services in Rutland County, Vermont",
    seoTitle: "Carpentry & Construction Services | Rutland County, VT | Meticulous LLC",
    seoDescription: "Professional exterior carpentry & construction services in Rutland County, Vermont. Repairs, structural improvements & custom builds by a registered residential contractor. Call 802-342-8293.",
    heroImage: "/images/hero-landing.jpeg",
    introParagraphs: [
      "At Meticulous LLC, we provide professional carpentry and construction services designed to support and improve your property.",
      "From exterior repairs and structural improvements to custom builds and project support, we bring a practical, detail-oriented approach to every job.",
      "As a registered residential contractor in Vermont, we operate with professionalism, accountability, and a focus on quality workmanship.",
    ],
    features: [
      "Exterior repairs",
      "Structural improvements",
      "Custom builds",
      "Deck construction",
      "Remodeling support",
      "Permit coordination",
    ],
    featureDetails: [
      {
        title: "Exterior Repairs",
        description: "Rot repair, siding replacement, trim work, fascia and soffit repairs — we fix exterior damage properly so it doesn't come back next season.",
      },
      {
        title: "Structural Improvements",
        description: "Reinforcing decks, shoring up foundations, replacing load-bearing components, and addressing structural concerns with code-compliant solutions.",
      },
      {
        title: "Custom Builds",
        description: "Pergolas, storage structures, property features, and custom woodwork designed and built to your specifications with quality materials and craftsmanship.",
      },
      {
        title: "Deck Construction",
        description: "New decks and deck rebuilds — from framing and decking to railings and stairs. Built to code with proper footings, flashing, and materials suited to Vermont weather.",
      },
      {
        title: "Remodeling Support",
        description: "Framing, finish carpentry, and construction support for renovation projects. We work alongside other trades or independently to keep your project moving.",
      },
      {
        title: "Permit Coordination",
        description: "We handle permit applications, inspections, and code compliance so your project is done right from a regulatory standpoint — no surprises after the fact.",
      },
    ],
    process: [
      { step: "01", title: "Scope Review", description: "We assess the work needed — whether it's a repair, improvement, or new build — and discuss your goals, timeline, and budget." },
      { step: "02", title: "Detailed Estimate", description: "You receive an itemized estimate with material specifications, labor breakdown, and timeline. We explain what's needed and why." },
      { step: "03", title: "Quality Construction", description: "Work proceeds with consistent communication, clean job sites, and attention to detail. We build to code and beyond minimum standards." },
      { step: "04", title: "Inspection & Handoff", description: "We walk the completed work with you, address any punch list items, and ensure everything meets your expectations and code requirements." },
    ],
    differentiators: [
      "Registered residential contractor in Vermont — your project is backed by proper licensing and insurance",
      "We build to code as a baseline and exceed it as a standard — especially on structural work",
      "Clear, itemized estimates with no ambiguity about what's included",
      "Clean job sites and professional conduct — we respect your property while we work on it",
    ],
    relatedServices: ["hardscaping", "property-maintenance"],
  },
  {
    slug: "housekeeping",
    title: "Housekeeping & Turnover Services",
    subtitle: "Vacation Rental Cleaning & Turnover Services in Killington & Surrounding Areas",
    seoTitle: "Vacation Rental Cleaning & Turnover | Killington, VT | Meticulous LLC",
    seoDescription: "Reliable housekeeping & turnover services for vacation rentals in Killington & surrounding Vermont areas. Consistent cleaning, detail-focused, guest-ready every time. Call 802-342-8293.",
    heroImage: "/images/bg-housekeeping.jpeg",
    introParagraphs: [
      "Meticulous LLC provides reliable housekeeping and turnover services for vacation rentals, second homes, and managed properties.",
      "We help ensure your property is clean, refreshed, and ready for guests with consistent service and attention to detail.",
      "Whether you manage bookings or need support keeping your property guest-ready, we provide dependable turnover solutions you can count on.",
    ],
    features: [
      "Vacation rental cleaning",
      "Turnover preparation",
      "Guest-ready inspections",
      "Consistent service standards",
      "Second-home refreshes",
      "Detail cleaning",
    ],
    featureDetails: [
      {
        title: "Vacation Rental Cleaning",
        description: "Thorough cleaning between guest stays — kitchens, bathrooms, living areas, bedrooms, and common spaces cleaned to a hospitality standard that protects your reviews and reputation.",
      },
      {
        title: "Turnover Preparation",
        description: "Full turnover service including cleaning, linen changes, restocking essentials, trash removal, and setting up the property exactly the way guests expect to find it.",
      },
      {
        title: "Guest-Ready Inspections",
        description: "Post-cleaning walkthroughs to verify everything meets the standard — functioning appliances, working lights, stocked supplies, and a welcoming presentation.",
      },
      {
        title: "Consistent Service Standards",
        description: "We follow detailed checklists for every turnover so quality doesn't vary between visits. Your guests get the same experience whether it's the first stay or the fiftieth.",
      },
      {
        title: "Second-Home Refreshes",
        description: "Preparing your home before your arrival — airing it out, cleaning, stocking basics, adjusting thermostats, and making sure everything is ready when you walk in the door.",
      },
      {
        title: "Detail Cleaning",
        description: "Deep cleaning services for seasonal transitions, post-construction cleanup, or when your property needs more than a standard turnover — baseboards, windows, appliances, and more.",
      },
    ],
    process: [
      { step: "01", title: "Property Setup", description: "We tour your property, establish cleaning standards, note any special requirements, and create a detailed checklist tailored to your space." },
      { step: "02", title: "Schedule Integration", description: "We sync with your booking calendar so turnovers are scheduled automatically. No manual coordination needed for each guest transition." },
      { step: "03", title: "Turnover Execution", description: "Our team arrives on schedule, follows your custom checklist, and prepares the property to guest-ready condition with photo confirmation." },
      { step: "04", title: "Quality Verification", description: "Post-cleaning inspection with photo documentation sent to you. If anything isn't right, we come back and fix it before the guest arrives." },
    ],
    differentiators: [
      "Hospitality-grade cleaning standards — we clean to protect your reviews, not just check a box",
      "Photo documentation after every turnover so you can verify quality remotely",
      "Calendar-synced scheduling that eliminates the back-and-forth of coordinating each stay",
      "Consistent team and checklists ensure the same quality every single time",
    ],
    relatedServices: ["rental-support", "property-maintenance"],
  },
  {
    slug: "rental-support",
    title: "Rental Property Support & Management",
    subtitle: "Rental Property Support Services in Rutland County, Vermont",
    seoTitle: "Rental Property Support & Management | Rutland County, VT | Meticulous LLC",
    seoDescription: "Hands-on rental property support in Rutland County, Vermont. Readiness checks, maintenance coordination & ongoing property care by a registered Property Management Firm. Call 802-342-8293.",
    heroImage: "/images/bg-rental.jpeg",
    introParagraphs: [
      "Managing a rental property takes time, coordination, and attention to detail.",
      "Meticulous LLC provides hands-on rental property support services, including readiness checks, maintenance coordination, and ongoing property care.",
      "As a registered Property Management Firm, we help owners keep their properties running smoothly, presentable, and ready for guests or tenants year-round.",
    ],
    features: [
      "Readiness checks",
      "Maintenance coordination",
      "Ongoing property care",
      "Tenant & guest preparation",
      "Property presentation",
      "Day-to-day operations",
    ],
    featureDetails: [
      {
        title: "Readiness Checks",
        description: "Pre-arrival inspections to verify everything is functioning, clean, and guest-ready — HVAC, plumbing, appliances, safety equipment, and overall presentation.",
      },
      {
        title: "Maintenance Coordination",
        description: "We manage repair requests, coordinate with contractors, oversee work quality, and handle emergency maintenance so you don't have to field calls at all hours.",
      },
      {
        title: "Ongoing Property Care",
        description: "Regular property visits to monitor condition, address minor issues before they escalate, and ensure your investment stays protected between guest stays or tenant transitions.",
      },
      {
        title: "Tenant & Guest Preparation",
        description: "Full property preparation for incoming guests or tenants — cleaning coordination, supply restocking, key management, and welcome setup.",
      },
      {
        title: "Property Presentation",
        description: "Keeping your rental looking its best — exterior maintenance, interior touch-ups, and seasonal adjustments that maintain the property's appeal and justify premium rates.",
      },
      {
        title: "Day-to-Day Operations",
        description: "The everyday details that keep a rental running — trash coordination, snow response, landscaping, and being the local point of contact when something comes up.",
      },
    ],
    process: [
      { step: "01", title: "Owner Consultation", description: "We learn about your property, your goals, and your level of involvement. Some owners want full hands-off management, others want us to fill specific gaps." },
      { step: "02", title: "Service Agreement", description: "We define exactly what we're handling — maintenance, turnovers, inspections, emergency response — with clear responsibilities and transparent pricing." },
      { step: "03", title: "Operational Setup", description: "We establish vendor relationships, access protocols, communication channels, and systems so your property runs smoothly from day one." },
      { step: "04", title: "Ongoing Management", description: "Regular reporting, proactive maintenance, and responsive support. You stay informed without having to manage the details yourself." },
    ],
    differentiators: [
      "Registered Property Management Firm in Vermont — proper licensing for the services we provide",
      "We serve as your single point of contact, coordinating all vendors and services under one relationship",
      "Built for remote owners — detailed reporting and photo documentation keep you informed from anywhere",
      "Full-spectrum support from grounds to guest prep means fewer vendors and simpler management",
    ],
    relatedServices: ["housekeeping", "property-maintenance"],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((s) => s.slug === slug);
}

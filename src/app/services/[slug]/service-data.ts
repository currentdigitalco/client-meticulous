export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  introParagraphs: string[];
  features: string[];
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
    relatedServices: ["housekeeping", "property-maintenance"],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((s) => s.slug === slug);
}

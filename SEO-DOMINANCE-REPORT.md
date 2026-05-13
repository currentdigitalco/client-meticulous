# SEO/AEO/GEO/pSEO Dominance Report — client-meticulous

**Score:** 100 / 120 (83%) — B — strong, minor gaps
**Site path:** `sites\client-meticulous`
**Pages (estimate):** 19
**Schema types detected:** AdministrativeArea, Answer, BreadcrumbList, City, ContactPoint, FAQPage, GeoCoordinates, HomeAndConstructionBusiness, ListItem, LocalBusiness, Offer, OfferCatalog, OpeningHoursSpecification, Organization, Person, PostalAddress, Question, Rating, Review, Service, SpeakableSpecification, State, WebPage, WebSite
**LocalBusiness fields detected:** address, areaServed, founder, geo, hasOfferCatalog, knowsAbout, openingHoursSpecification, paymentAccepted, review, sameAs
**llms.txt:** present (141 lines)
**llms-full.txt:** present
**robots:** present
**sitemap:** present

## Findings

### Schema

- **✓ [PASS] schema-localbusiness** — LocalBusiness (or subtype) detected.
- **✓ [PASS] schema-organization** — Organization present.
- **✓ [PASS] schema-website** — WebSite present.
- **✓ [PASS] schema-faqpage** — FAQPage present.
- **▲ [FLAG] schema-howto** — Missing HowTo — Process schema for ranking on procedural queries.
  - **Fix:** Add a HowTo JSON-LD block.
- **✓ [PASS] schema-speakablespecification** — SpeakableSpecification present.
- **✓ [PASS] schema-review** — Review present.
- **✓ [PASS] field-areaServed** — areaServed present in business schema.
- **✓ [PASS] field-hasOfferCatalog** — hasOfferCatalog present in business schema.
- **✓ [PASS] field-review** — review present in business schema.
- **✓ [PASS] field-knowsAbout** — knowsAbout present in business schema.
- **✓ [PASS] field-founder** — founder present in business schema.
- **✓ [PASS] field-geo** — geo present in business schema.
- **✓ [PASS] field-openingHoursSpecification** — openingHoursSpecification present in business schema.
- **✓ [PASS] field-paymentAccepted** — paymentAccepted present in business schema.
- **✓ [PASS] field-address** — address present in business schema.
- **✓ [PASS] field-sameAs** — sameAs present in business schema.

### AEO

- **✓ [PASS] llms-txt-depth** — llms.txt is 141 lines (≥100).
- **✓ [PASS] llms-full-txt** — llms-full.txt present (deeper AI crawler doc).
- **✓ [PASS] speakable** — Speakable schema present — voice-search ready.

### Technical SEO

- **✓ [PASS] robots** — robots.txt or robots.ts present.
- **✓ [PASS] sitemap** — sitemap.xml or sitemap.ts present.

### pSEO

- **▲ [FLAG] pseo-depth** — Estimated 19 pages — thin pSEO.
  - **Fix:** Add programmatic service-areas/[city]/[service] route + city config.

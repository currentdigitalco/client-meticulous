# SEO/AEO/GEO/pSEO Dominance Report — meticulous

**Score:** 90 / 105 (86%) — B — strong, minor gaps
**Site path:** `../client-meticulous`
**Pages (estimate):** 20
**Schema types detected:** AdministrativeArea, AggregateRating, Answer, BlogPosting, BreadcrumbList, City, CollectionPage, ContactPoint, FAQPage, GeoCoordinates, HomeAndConstructionBusiness, ItemList, ListItem, LocalBusiness, Offer, OfferCatalog, OpeningHoursSpecification, Organization, Person, PostalAddress, Question, Rating, Review, Service, State, WebPage, WebSite
**LocalBusiness fields in the source:** address, areaServed, founder, geo, hasOfferCatalog, knowsAbout, openingHoursSpecification, paymentAccepted, review, sameAs (credited only where a built page serves them — see the field-* findings)
**Built pages checked (FAQPage visibility, HowTo steps, Speakable selectors, Organization/WebSite tags, business fields):** 252 in .next/server/app + .next/server/pages
**llms.txt:** present (387 lines)
**llms-full.txt:** present
**robots:** present
**sitemap:** present

## Findings

### Schema

- **✓ [PASS] schema-localbusiness** — LocalBusiness (or subtype) detected.
- **✓ [PASS] schema-organization** — Organization declared in a real JSON-LD tag on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] schema-website** — WebSite declared in a real JSON-LD tag on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] schema-faqpage** — FAQPage on 221 of 252 built page(s) in .next/server/app + .next/server/pages, one per page, all 895 question(s) visible in the page text.
- **✓ [PASS] schema-review** — Review present.
- **— [N/A] schema-howto** — No HowTo on any of the 252 built page(s) in .next/server/app + .next/server/pages — nothing to verify, and nothing to add. Informational, no score weight: Google retired HowTo rich results on 2023-09-13 (desktop and mobile), so HowTo markup earns a site no search feature.
- **✓ [PASS] field-areaServed** — areaServed served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-hasOfferCatalog** — hasOfferCatalog served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-review** — review served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-knowsAbout** — knowsAbout served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-founder** — founder served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-geo** — geo served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-openingHoursSpecification** — openingHoursSpecification served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-paymentAccepted** — paymentAccepted served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-address** — address served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages.
- **✓ [PASS] field-sameAs** — sameAs served on the business node on 250 of 252 built page(s) in .next/server/app + .next/server/pages: https://www.google.com/maps?q=meticulous+llc+rutland+vt.

### AEO

- **✓ [PASS] llms-txt** — llms.txt present (387 lines).
- **✓ [PASS] llms-full-txt** — llms-full.txt present (deeper AI crawler doc).
- **— [N/A] speakable** — No Speakable on any of the 252 built page(s) in .next/server/app + .next/server/pages — nothing to verify, and nothing to add. Informational, no score weight: Google uses Speakable only for topical news in the Google Assistant (US English, beta), so a non-news site gains nothing from it.
- **✓ [PASS] ai-crawlers** — No key AI crawler blocked in robots (GPTBot / OAI-SearchBot / PerplexityBot / ClaudeBot / Google-Extended / Bingbot permitted).

### Technical SEO

- **✓ [PASS] robots** — robots.txt or robots.ts present.
- **✓ [PASS] sitemap** — sitemap.xml or sitemap.ts present.

### pSEO

- **▲ [FLAG] pseo-depth** — Estimated 20 pages — thin pSEO.
  - **Fix:** Add programmatic service-areas/[city]/[service] route + city config.

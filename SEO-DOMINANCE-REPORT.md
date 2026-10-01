# SEO/AEO/GEO/pSEO Dominance Report — meticulous

**Score:** 45 / 60 (75%) — B — strong, minor gaps
**Site path:** `../client-meticulous`
**Pages (estimate):** 20
**Schema types detected:** AdministrativeArea, AggregateRating, Answer, BlogPosting, BreadcrumbList, City, CollectionPage, ContactPoint, FAQPage, GeoCoordinates, HomeAndConstructionBusiness, ItemList, ListItem, LocalBusiness, Offer, OfferCatalog, OpeningHoursSpecification, Organization, Person, PostalAddress, Question, Rating, Review, Service, State, WebPage, WebSite
**LocalBusiness fields in the source:** address, areaServed, founder, geo, hasOfferCatalog, knowsAbout, openingHoursSpecification, paymentAccepted, review, sameAs (credited only where a built page serves them — see the field-* findings)
**Built pages checked (FAQPage visibility, HowTo steps, Speakable selectors, Organization/WebSite tags, business fields):** NONE — no build on this machine
**llms.txt:** present (397 lines)
**llms-full.txt:** present
**robots:** present
**sitemap:** present

## Findings

### Schema

- **✓ [PASS] schema-localbusiness** — LocalBusiness (or subtype) detected.
- **— [N/A] schema-organization** — UNVERIFIED — Organization is in the source, but there is no built HTML on this machine to check it against (looked in dist/public, .next/server/app, .next/server/pages, out). Whether a crawler is served it was not measured: the 5 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] schema-website** — UNVERIFIED — WebSite is in the source, but there is no built HTML on this machine to check it against (looked in dist/public, .next/server/app, .next/server/pages, out). Whether a crawler is served it was not measured: the 5 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] schema-faqpage** — UNVERIFIED — FAQPage is in the source, but there is no built HTML on this machine to check it against (looked in dist/public, .next/server/app, .next/server/pages, out). Visibility not measured: the 5 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **✓ [PASS] schema-review** — Review present.
- **— [N/A] schema-howto** — UNVERIFIED — no built HTML on this machine to check HowTo steps against (looked in dist/public, .next/server/app, .next/server/pages, out). Informational, no score weight: Google retired HowTo rich results on 2023-09-13 (desktop and mobile), so HowTo markup earns a site no search feature.
- **— [N/A] field-areaServed** — UNVERIFIED — areaServed is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-hasOfferCatalog** — UNVERIFIED — hasOfferCatalog is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-review** — UNVERIFIED — review is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-knowsAbout** — UNVERIFIED — knowsAbout is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-founder** — UNVERIFIED — founder is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-geo** — UNVERIFIED — geo is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-openingHoursSpecification** — UNVERIFIED — openingHoursSpecification is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-paymentAccepted** — UNVERIFIED — paymentAccepted is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-address** — UNVERIFIED — address is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.
- **— [N/A] field-sameAs** — UNVERIFIED — sameAs is in the source, but there is no built HTML on this machine to check what is served (looked in dist/public, .next/server/app, .next/server/pages, out). The 3 points are withheld from the denominator, not credited. Run the site's build, then re-audit.

### AEO

- **✓ [PASS] llms-txt** — llms.txt present (397 lines).
- **✓ [PASS] llms-full-txt** — llms-full.txt present (deeper AI crawler doc).
- **— [N/A] speakable** — UNVERIFIED — no built HTML on this machine to resolve Speakable selectors against (looked in dist/public, .next/server/app, .next/server/pages, out). Informational, no score weight: Google uses Speakable only for topical news in the Google Assistant (US English, beta), so a non-news site gains nothing from it.
- **✓ [PASS] ai-crawlers** — No key AI crawler blocked in robots (GPTBot / OAI-SearchBot / PerplexityBot / ClaudeBot / Google-Extended / Bingbot permitted).

### Technical SEO

- **✓ [PASS] robots** — robots.txt or robots.ts present.
- **✓ [PASS] sitemap** — sitemap.xml or sitemap.ts present.

### pSEO

- **▲ [FLAG] pseo-depth** — Estimated 20 pages — thin pSEO.
  - **Fix:** Add programmatic service-areas/[city]/[service] route + city config.

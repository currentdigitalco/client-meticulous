export interface ServiceAreaFAQ {
  question: string;
  answer: string;
}

export interface ServiceArea {
  slug: string;
  name: string;
  region: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  intro: string[];
  localContext: string;
  priorityServices: string[];
  landmarks: string[];
  faqs: ServiceAreaFAQ[];
  lastUpdated: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "killington",
    name: "Killington",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Killington, VT | Meticulous LLC",
    seoDescription: "Full-service property care in Killington, VT. Snow plowing, grounds maintenance, housekeeping, and rental turnovers for mountain homes and ski-season rentals. Call 802-342-8293.",
    heroImage: "/images/bg-snow.jpeg",
    intro: [
      "Killington is a mountain town built around ski season, short-term rentals, and second-home ownership — which means property care here runs on a different calendar than the rest of Vermont.",
      "Meticulous LLC handles the full stack for Killington owners: plow contracts that actually show up at 4 AM before a powder day, hospitality-grade turnovers between bookings, and year-round grounds work for the off-season.",
      "Most of our Killington clients are remote owners. We operate as their eyes and hands on the ground, so the property is always guest-ready and the driveway is always cleared.",
    ],
    localContext: "Killington has Vermont's largest ski resort, which drives the local rental market. Properties here see heavy winter traffic, extreme snow loads (routinely 200+ inches per season), and short turnover windows between guests. Off-season maintenance happens fast — mud season is short, and summer brings weddings, mountain biking, and a full calendar of events.",
    priorityServices: ["snow-ice-management", "housekeeping", "rental-support", "grounds-maintenance"],
    landmarks: ["Killington Resort", "Pico Mountain", "Killington Peak Lodge", "Route 4 corridor", "Killington Road"],
    faqs: [
      {
        question: "Do you handle short-notice plow calls during ski season?",
        answer: "Seasonal contract holders in Killington get automatic dispatch based on pre-agreed snow triggers. No phone call needed — we're monitoring conditions and already on the way when accumulation hits your threshold.",
      },
      {
        question: "Can you coordinate turnovers between Airbnb and VRBO bookings?",
        answer: "Yes. We sync directly with your booking calendar across platforms, execute cleaning and linen changes within the turnover window, and send photo confirmation before the next guest arrives.",
      },
      {
        question: "Do you service properties off Killington Road and in the access road neighborhoods?",
        answer: "Yes. We service the full Killington Road corridor, the access roads leading to the mountain, and outlying neighborhoods toward Pico, Mendon, and the Route 4 corridor.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "rutland",
    name: "Rutland",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care & Snow Plowing in Rutland, VT | Meticulous LLC",
    seoDescription: "Commercial and residential property care in Rutland, VT. Snow plowing, grounds maintenance, hardscaping, and carpentry from a Vermont-registered contractor. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "Rutland is the largest city in our service area and home base for Meticulous LLC. It's where we run our equipment yard, schedule our crews, and service the widest mix of commercial and residential properties.",
      "City properties here need different care than the ski-town rentals up the mountain. We handle commercial plowing for storefronts and office parks, grounds maintenance for multi-family properties, and full-scope carpentry and hardscaping for single-family homeowners.",
      "Because we're local, we're not a sub-contractor bouncing between regions. Our crews know Rutland block by block and respond faster than the out-of-county companies trying to service from afar.",
    ],
    localContext: "Rutland is Vermont's third-largest city with a dense mix of commercial properties, multi-family housing, and residential neighborhoods. Winter brings lake-effect snow off the Green Mountains, and summer maintenance has to work around Route 7 traffic and narrow urban lots. The city's historic downtown has specific landscaping and sidewalk maintenance requirements that commercial property owners have to meet.",
    priorityServices: ["snow-ice-management", "grounds-maintenance", "property-maintenance", "hardscaping", "carpentry"],
    landmarks: ["Downtown Rutland", "Main Street", "Rutland Regional Medical Center", "Route 7 corridor", "Giorgetti Park"],
    faqs: [
      {
        question: "Do you handle commercial plowing contracts for Rutland businesses?",
        answer: "Yes. We plow parking lots, access roads, and entryways for commercial properties throughout Rutland, with 24/7 storm response and priority service before business hours.",
      },
      {
        question: "Can you maintain multi-family or rental properties in Rutland?",
        answer: "Yes. We handle grounds maintenance, common-area care, seasonal cleanups, and coordinated repairs for apartment buildings, duplexes, and multi-tenant properties across Rutland.",
      },
      {
        question: "Are you a registered residential contractor in Vermont?",
        answer: "Yes. Meticulous LLC is a registered residential contractor and registered Property Management Firm in Vermont, properly licensed and insured for the full scope of services we offer.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "woodstock",
    name: "Woodstock",
    region: "Windsor County, Vermont",
    seoTitle: "Property Care & Landscaping in Woodstock, VT | Meticulous LLC",
    seoDescription: "Hands-on property care for Woodstock, VT estates, second homes, and inns. Landscaping, grounds maintenance, hardscaping, and year-round property support. Call 802-342-8293.",
    heroImage: "/images/bg-landscaping.jpeg",
    intro: [
      "Woodstock properties tend to sit on larger parcels with mature landscaping, stone walls, and historic homes that need a more careful touch than a standard mow-and-go service can deliver.",
      "We work with Woodstock homeowners, estate managers, and innkeepers who want their property presented at a level that matches the village itself — manicured beds, clean hardscape, and grounds that look intentional from the road.",
      "Most of our Woodstock clients are either year-round residents with high expectations or second-home owners who need a trusted local to keep things looking right while they're away.",
    ],
    localContext: "Woodstock is one of the most visited towns in Vermont, with a protected historic character that extends to how properties are maintained. Stone walls, specimen trees, and curated gardens are common features that need specific expertise. The town draws a high volume of weddings, second-home buyers, and leaf-peeping tourists, all of which raise the bar for how properties need to present year-round.",
    priorityServices: ["landscaping", "grounds-maintenance", "hardscaping", "property-maintenance"],
    landmarks: ["Woodstock Village Green", "Billings Farm", "Marsh-Billings-Rockefeller National Historical Park", "Route 4", "Ottauquechee River"],
    faqs: [
      {
        question: "Do you work on estate-level properties in Woodstock?",
        answer: "Yes. We handle properties ranging from village lots to multi-acre estates, with crews sized and scheduled for the scope of the work rather than one-size-fits-all packages.",
      },
      {
        question: "Can you maintain historic stone walls and hardscape features?",
        answer: "Yes. We do repair and restoration of existing stone walls, walkways, and hardscape, sourcing Vermont stone when possible to match the original character of the property.",
      },
      {
        question: "Do you travel to Woodstock from Rutland?",
        answer: "Yes. Woodstock is within our regular service radius. We schedule routes efficiently so clients aren't paying a premium for distance.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "ludlow",
    name: "Ludlow",
    region: "Windsor County, Vermont",
    seoTitle: "Property Care & Rental Support in Ludlow, VT | Meticulous LLC",
    seoDescription: "Property care for Ludlow, VT and the Okemo Mountain corridor. Snow plowing, housekeeping, rental turnovers, and year-round grounds maintenance. Call 802-342-8293.",
    heroImage: "/images/bg-snow.jpeg",
    intro: [
      "Ludlow runs on the same rhythm as Killington — ski-season rentals, second-home ownership, and a condensed summer season — but it has its own character as the town at the base of Okemo Mountain.",
      "We serve Ludlow homeowners and rental operators with the full stack: plow contracts, hospitality-grade turnovers, and grounds care that keeps the property presentable for the next booking.",
      "Because we already run routes through Killington and the Route 4 corridor, adding Ludlow properties to the schedule doesn't stretch us thin or hurt our response times.",
    ],
    localContext: "Ludlow is built around Okemo Mountain Resort and the year-round Jackson Gore base area. Properties here range from village condos to slope-side second homes, and the rental market is active through both winter and shoulder seasons. Snow loads are heavy, short-term rental turnovers are frequent, and the summer months see a burst of landscaping and maintenance projects squeezed into a short window.",
    priorityServices: ["snow-ice-management", "housekeeping", "rental-support", "grounds-maintenance"],
    landmarks: ["Okemo Mountain Resort", "Jackson Gore", "Route 100", "Main Street Ludlow", "Echo Lake"],
    faqs: [
      {
        question: "Do you handle Okemo-area rental turnovers?",
        answer: "Yes. We service rental properties throughout the Okemo Mountain area and Ludlow village, with turnovers timed to your booking calendar and photo confirmation for remote owners.",
      },
      {
        question: "How do you handle peak ski-season plow demand in Ludlow?",
        answer: "Seasonal contract holders get priority dispatch based on pre-agreed triggers. We size our route capacity to our client roster, so contract holders aren't competing for attention during storms.",
      },
      {
        question: "Can you do summer-season hardscape work in Ludlow?",
        answer: "Yes. Summer is our prime hardscape season. We install patios, retaining walls, and walkways throughout the Ludlow area, engineered for Vermont's freeze-thaw cycles.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "pittsfield",
    name: "Pittsfield",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care & Snow Management in Pittsfield, VT | Meticulous LLC",
    seoDescription: "Reliable property care in Pittsfield, VT. Snow plowing, grounds maintenance, and property support for rural homes and second homes along Route 100. Call 802-342-8293.",
    heroImage: "/images/bg-property-maintenance.jpeg",
    intro: [
      "Pittsfield is a small rural community north of Killington along Route 100. Properties here are spread out, driveways are long, and reliable winter service is a safety issue, not a convenience.",
      "We service Pittsfield homeowners, second-home owners, and rental operators with plow contracts, grounds care, and property oversight — especially important for the remote owners who can't easily check on their place in person.",
      "Our coverage of the Route 100 corridor from Killington north means Pittsfield properties aren't an afterthought — we're already running routes through the area.",
    ],
    localContext: "Pittsfield sits in a narrow valley along the Tweed River with a small village center and homes spread along Route 100 and the surrounding back roads. The town is known for long driveways, high snow accumulation, and a mix of year-round residents, second-home owners, and rental properties catering to the Killington market.",
    priorityServices: ["snow-ice-management", "grounds-maintenance", "property-maintenance", "rental-support"],
    landmarks: ["Route 100", "Tweed River", "Pittsfield Village", "Amee Farm"],
    faqs: [
      {
        question: "Can you plow long rural driveways in Pittsfield?",
        answer: "Yes. Long driveways are standard in Pittsfield and we size our equipment and pricing accordingly. We also handle turnarounds, outbuildings, and access paths that smaller services skip.",
      },
      {
        question: "Do you do property check-ins for out-of-state owners in Pittsfield?",
        answer: "Yes. We offer scheduled property checks with photo documentation, condition reports, and flag any issues that need attention — especially valuable after storms or during extended absences.",
      },
      {
        question: "How far north on Route 100 do you service?",
        answer: "Our regular service area covers the Route 100 corridor from Killington through Pittsfield and up to Stockbridge. Properties beyond that we handle case by case.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "chittenden",
    name: "Chittenden",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Chittenden, VT | Meticulous LLC",
    seoDescription: "Property care and grounds maintenance in Chittenden, VT. Reliable service for rural homes, reservoir-front properties, and second homes. Call 802-342-8293.",
    heroImage: "/images/bg-landscaping.jpeg",
    intro: [
      "Chittenden is a rural town northeast of Rutland with a mix of year-round homes, working farms, and second homes around the reservoir and along the town roads.",
      "We handle the full range of property care services in Chittenden — grounds maintenance, snow management, landscaping, and hardscape work — with crews that know how to operate on the narrower rural roads and longer site drives.",
      "Most Chittenden properties need a partner who understands the rhythm of the town: spread-out properties, long winters, and owners who value reliability over flash.",
    ],
    localContext: "Chittenden is home to the Chittenden Reservoir and Lefferts Pond, plus a mix of small working farms, rural homesites, and second-home properties tucked into the Green Mountain foothills. The town is largely forested with winding back roads and a small village center. Properties tend to be large, with mature landscaping and significant snow exposure.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "landscaping", "property-maintenance"],
    landmarks: ["Chittenden Reservoir", "Lefferts Pond", "Green Mountain National Forest", "Chittenden Dam"],
    faqs: [
      {
        question: "Do you work on properties near Chittenden Reservoir?",
        answer: "Yes. We service properties throughout Chittenden including around the reservoir and Lefferts Pond. We're careful with shoreline and waterside work given the environmental sensitivity.",
      },
      {
        question: "Can you handle larger rural properties in Chittenden?",
        answer: "Yes. Larger properties are standard in Chittenden. We scope and price based on the actual site, not a fixed package, so you're paying for what's there.",
      },
      {
        question: "Do you do seasonal cleanups for Chittenden summer homes?",
        answer: "Yes. Spring opening and fall closing are common services for our Chittenden clients. We can also handle winterization, frost-prep, and pre-arrival readiness checks.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "mendon",
    name: "Mendon",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Mendon, VT | Meticulous LLC",
    seoDescription: "Property care for Mendon, VT homes and short-term rentals along the Route 4 and Killington corridor. Snow, grounds, and full-service property support. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "Mendon sits between Rutland and Killington along Route 4, with a mix of year-round homes, second homes, and rental properties serving the Killington market.",
      "Because we route through Mendon constantly on our way between Rutland and the mountain, our Mendon clients get consistent service without the travel-time premium that distant services charge.",
      "We handle grounds maintenance, snow contracts, carpentry, and property support for Mendon homeowners — whether you live here year-round or use the place as a ski retreat.",
    ],
    localContext: "Mendon straddles Route 4 between Rutland and Killington, with properties along the corridor, up toward Mendon Mountain, and in the rural outlying areas. The town has a mix of working families, retirees, and second-home owners. Winter snow loads are substantial — Mendon sits at elevation and catches storms that roll east from Killington Peak.",
    priorityServices: ["snow-ice-management", "grounds-maintenance", "property-maintenance", "carpentry"],
    landmarks: ["Route 4", "Mendon Mountain", "Turn of River Lodge", "Long Trail access"],
    faqs: [
      {
        question: "Do you service properties along Route 4 in Mendon?",
        answer: "Yes. Route 4 is our main corridor between Rutland and Killington, so we service properties all along it in Mendon — residential, commercial, and rental alike.",
      },
      {
        question: "Can you handle snow plowing for Mendon properties at elevation?",
        answer: "Yes. Elevation in Mendon means heavier snowfall and longer winter seasons. We scope plow contracts accordingly, with appropriate trigger depths and response priority.",
      },
      {
        question: "Do you do exterior carpentry repairs in Mendon?",
        answer: "Yes. As a registered Vermont residential contractor, we handle deck rebuilds, rot repair, siding, trim, and structural work throughout Mendon.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "proctor",
    name: "Proctor",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Proctor, VT | Meticulous LLC",
    seoDescription: "Grounds maintenance, snow plowing, and property care in Proctor, VT. Full-service support for homes, rentals, and commercial properties. Call 802-342-8293.",
    heroImage: "/images/bg-property-maintenance.jpeg",
    intro: [
      "Proctor is a small historic town just north of Rutland, known for its marble industry history and dense village-style neighborhoods.",
      "Properties in Proctor tend to be closer-knit than the rural towns further east, which changes what property care looks like — tighter lots, shared boundaries, and historic homes that benefit from careful craftsmanship rather than heavy-equipment solutions.",
      "We handle the full scope for Proctor homeowners and property managers, from grounds maintenance and snow plowing to hardscape repairs and carpentry on older homes.",
    ],
    localContext: "Proctor was built around the Vermont marble industry and still shows that character in its stone buildings and compact village layout. The town has a dense residential core, the Otter Creek running through the center, and Proctor Falls as a local landmark. Properties here are often older with original stonework and architectural details that need a specific kind of care.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "carpentry", "property-maintenance", "hardscaping"],
    landmarks: ["Proctor Falls", "Otter Creek", "Vermont Marble Museum", "Main Street Proctor"],
    faqs: [
      {
        question: "Do you work on older historic homes in Proctor?",
        answer: "Yes. Older homes are common in Proctor and we handle exterior carpentry, trim repairs, and hardscape restoration with an eye for matching original materials and character.",
      },
      {
        question: "Can you plow tight village lots and shared driveways?",
        answer: "Yes. We scale our equipment to the property. Tight lots get smaller machines and hand shoveling where needed, rather than oversized trucks that damage edges.",
      },
      {
        question: "Do you do marble or stone repair in Proctor?",
        answer: "We handle stonework as part of hardscape installation and repair. For specialty historic preservation work, we collaborate with local stone masons when the job calls for it.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "west-rutland",
    name: "West Rutland",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in West Rutland, VT | Meticulous LLC",
    seoDescription: "Reliable property care and snow plowing in West Rutland, VT. Grounds maintenance, property support, and full-scope services for homes and commercial properties. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "West Rutland is a working-class town just west of Rutland city, with a mix of residential neighborhoods, farms, and commercial properties along Route 4A.",
      "Property care here tends to be practical and no-nonsense — owners want reliable service, fair pricing, and crews that show up when they're supposed to.",
      "That's how we run. West Rutland is a core part of our service area and we handle the full scope: grounds, plowing, repairs, and property support for homes and businesses throughout town.",
    ],
    localContext: "West Rutland has a strong working identity, with agricultural land, small industrial areas, and historic residential neighborhoods. Route 4A runs through the town connecting it to the main Rutland area. The town's Grange Hall, marble quarries, and Clarendon Gorge make it a distinct community from Rutland proper despite the proximity.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "property-maintenance", "carpentry"],
    landmarks: ["Route 4A", "Clarendon Gorge", "West Rutland Town Hall", "West Rutland Marble Quarry"],
    faqs: [
      {
        question: "Do you service commercial properties in West Rutland?",
        answer: "Yes. We handle commercial plowing, grounds maintenance, and exterior care for businesses along Route 4A and throughout West Rutland.",
      },
      {
        question: "Can you handle both residential and agricultural property care in West Rutland?",
        answer: "Yes. We work with homeowners, farm operators, and rural property owners. Scope varies based on the site — we don't force a one-size-fits-all package.",
      },
      {
        question: "Are your West Rutland rates competitive with larger regional services?",
        answer: "Yes. Because we're local and route efficiently, we're usually at or below the rates of out-of-county services while delivering faster response and better accountability.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "brandon",
    name: "Brandon",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Brandon, VT | Meticulous LLC",
    seoDescription: "Property care and landscaping in Brandon, VT. Grounds maintenance, hardscaping, carpentry, and full-service property support from a registered Vermont contractor. Call 802-342-8293.",
    heroImage: "/images/bg-landscaping.jpeg",
    intro: [
      "Brandon is a picturesque town north of Rutland with a walkable downtown, historic homes, and a strong arts community that shows up in how residents present their properties.",
      "We work with Brandon homeowners, business owners, and second-home owners on everything from seasonal grounds maintenance to full hardscape builds and carpentry projects.",
      "Brandon is close enough to Rutland that we service it regularly, and distinctive enough that we approach each property based on its character rather than running a template.",
    ],
    localContext: "Brandon sits along Route 7 with a historic downtown, the Neshobe River running through it, and residential neighborhoods that span from the village center out to rural properties on the surrounding roads. The town has a thriving arts scene, with Brandon Artists Guild and the annual Brandon Arts Festival drawing regional attention to the community.",
    priorityServices: ["landscaping", "grounds-maintenance", "hardscaping", "carpentry", "property-maintenance"],
    landmarks: ["Downtown Brandon", "Neshobe River", "Brandon Artists Guild", "Route 7", "Brandon Falls"],
    faqs: [
      {
        question: "Do you do landscape design work in Brandon?",
        answer: "Yes. We handle design and installation of garden beds, hardscape features, and exterior improvements for Brandon properties — with a focus on plantings that thrive in Vermont and look intentional year-round.",
      },
      {
        question: "Can you work on historic homes in downtown Brandon?",
        answer: "Yes. Historic homes are common in Brandon and we approach them with the care they deserve — proper materials, detail-matching, and respect for the original craftsmanship.",
      },
      {
        question: "Do you serve areas north of Brandon?",
        answer: "Our core service area is Rutland County plus Woodstock and Ludlow. Properties north of Brandon toward Middlebury we handle case-by-case based on scope and schedule.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "castleton",
    name: "Castleton",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care & Lake Property Services in Castleton, VT | Meticulous LLC",
    seoDescription: "Property care in Castleton, VT including lake Bomoseen homes. Grounds maintenance, snow plowing, seasonal openings, and rental support. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "Castleton combines college-town energy with lakefront property culture — Castleton University sits in the middle of town, and Lake Bomoseen brings a steady flow of second-home owners and seasonal residents.",
      "We service both sides of that equation. Residential and commercial property care in the village, plus seasonal opening and closing, grounds maintenance, and property oversight for lakefront homes that sit empty during the off-season.",
      "Lakefront properties have their own rhythm — spring opening, dock management, seasonal cleanups, and fall winterization. We handle the transitions so owners aren't scrambling the first warm weekend.",
    ],
    localContext: "Castleton is home to Castleton University, Lake Bomoseen (Vermont's largest lake entirely within the state), and a mix of village residential, rural properties, and lakefront homes. The town has a strong seasonal pattern driven by the university calendar and lake season. Many properties are second homes or short-term rentals, especially around Bomoseen.",
    priorityServices: ["grounds-maintenance", "property-maintenance", "snow-ice-management", "housekeeping", "rental-support"],
    landmarks: ["Lake Bomoseen", "Castleton University", "Bomoseen State Park", "Hubbardton Battlefield", "Route 4A"],
    faqs: [
      {
        question: "Do you handle seasonal opening and closing for Lake Bomoseen properties?",
        answer: "Yes. Spring opening (dock check, grounds cleanup, interior readiness) and fall closing (winterization, grounds prep, shut-down) are core services for our Castleton lake clients.",
      },
      {
        question: "Can you check on Lake Bomoseen homes during the off-season?",
        answer: "Yes. We do scheduled property check-ins with photo documentation, condition reports, and immediate follow-up on anything that needs attention — ideal for out-of-state owners.",
      },
      {
        question: "Do you do rental turnovers for Castleton short-term rentals?",
        answer: "Yes. We handle cleaning, linen changes, and readiness checks between bookings, synced to your rental calendar with photo confirmation.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "wallingford",
    name: "Wallingford",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Wallingford, VT | Meticulous LLC",
    seoDescription: "Reliable property care in Wallingford, VT. Grounds maintenance, snow plowing, carpentry, and full-scope property support along the Route 7 corridor. Call 802-342-8293.",
    heroImage: "/images/bg-property-maintenance.jpeg",
    intro: [
      "Wallingford sits along Route 7 south of Rutland, with a small village core, rural properties on the surrounding roads, and access to the Green Mountain National Forest.",
      "We service Wallingford homeowners and rural property owners with grounds care, winter service, and carpentry projects. The town's spread-out geography means routing matters — we build efficient schedules so clients aren't paying for dead travel time.",
      "Most of our Wallingford clients are year-round residents who want a local company that shows up reliably, rather than a regional service bouncing between jobs.",
    ],
    localContext: "Wallingford has a compact village center along Route 7 and rural properties stretching into the hills to the east and west. The town is known for its connection to Elfin Lake and the Green Mountain National Forest. Properties range from village lots to large rural parcels, with the mix of year-round residents, retirees, and second-home owners typical of southern Rutland County.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "carpentry", "property-maintenance"],
    landmarks: ["Route 7", "Elfin Lake", "Green Mountain National Forest", "Wallingford Village"],
    faqs: [
      {
        question: "Do you service rural properties on Wallingford back roads?",
        answer: "Yes. We regularly service properties off the main roads and at higher elevations. Long driveways and rural access aren't an issue — we route accordingly.",
      },
      {
        question: "Can you handle larger grounds work in Wallingford?",
        answer: "Yes. Larger parcels are common in Wallingford. We scope each property individually and crew the work appropriately.",
      },
      {
        question: "Do you offer full-season contracts in Wallingford?",
        answer: "Yes. Full-season contracts covering grounds maintenance and snow service are our most common arrangement — predictable cost, predictable service, no scheduling headaches.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "pittsford",
    name: "Pittsford",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Pittsford, VT | Meticulous LLC",
    seoDescription: "Property care and grounds maintenance in Pittsford, VT. Year-round service for homes, farms, and rural properties along the Route 7 corridor. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "Pittsford is a rural town between Rutland and Brandon with agricultural roots, a small village core, and a reputation as the home of the Vermont Police Academy.",
      "Property care here tends to emphasize practical over flashy — owners want reliable service, durable work, and fair pricing.",
      "We handle the full scope for Pittsford homeowners, farm operators, and rural property owners — grounds, winter service, property oversight, and carpentry projects as they come up.",
    ],
    localContext: "Pittsford has a small village center along Route 7 with rural land stretching to both sides of the corridor. The town is agricultural with working farms, historic homes, and the Vermont Police Academy as a major local institution. Properties range from small village lots to multi-acre rural parcels, and snow loads are typical of central Rutland County.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "property-maintenance", "carpentry"],
    landmarks: ["Route 7", "Vermont Police Academy", "Pittsford Village", "Hubbardton River"],
    faqs: [
      {
        question: "Do you service agricultural properties in Pittsford?",
        answer: "Yes. We handle grounds maintenance, outbuilding care, and equipment-accessible winter service for agricultural and rural properties throughout Pittsford.",
      },
      {
        question: "Can you handle carpentry repairs on older Pittsford homes?",
        answer: "Yes. As a registered Vermont residential contractor, we handle exterior repairs, deck rebuilds, trim work, and structural carpentry on older Pittsford homes.",
      },
      {
        question: "Do you run fixed-price winter contracts in Pittsford?",
        answer: "Yes. Seasonal plow contracts with fixed pricing are standard for our Pittsford clients. You lock in the rate and priority, and we handle the dispatch automatically when conditions trigger.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "clarendon",
    name: "Clarendon",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Clarendon, VT | Meticulous LLC",
    seoDescription: "Property care and winter service in Clarendon, VT. Grounds maintenance, snow plowing, and hands-on property support for rural and residential properties. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "Clarendon sits just south of Rutland with a mix of residential neighborhoods, rural properties, and access to the Clarendon Gorge and Long Trail crossings.",
      "The town has a strong year-round residential base and is a natural service area for us — close to our equipment yard and easy to route.",
      "We handle the full scope: grounds, plowing, carpentry, property support, and hardscape work for Clarendon homeowners and rural property owners.",
    ],
    localContext: "Clarendon has a mix of village-style neighborhoods in the south, rural properties stretching toward the Green Mountains, and the Clarendon Gorge as a notable natural feature. The Appalachian Trail crosses the town, and the proximity to Rutland makes it a common commuter community. Properties range from village lots to rural parcels with significant acreage.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "property-maintenance", "hardscaping", "carpentry"],
    landmarks: ["Clarendon Gorge", "Appalachian Trail", "Route 7B", "Clarendon River"],
    faqs: [
      {
        question: "Do you service rural properties in the Clarendon hills?",
        answer: "Yes. Rural and higher-elevation properties in Clarendon are within our regular service area. We size equipment and schedule routes to handle the terrain.",
      },
      {
        question: "Can you plow before morning commute hours in Clarendon?",
        answer: "Yes. Seasonal contract holders in Clarendon get early-morning priority so driveways are cleared before the workday. Automatic dispatch based on storm triggers.",
      },
      {
        question: "Do you do hardscape installations in Clarendon?",
        answer: "Yes. Patios, walkways, and retaining walls in Clarendon are common projects. We build with proper base prep and materials suited to Vermont's freeze-thaw cycles.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "shrewsbury",
    name: "Shrewsbury",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Shrewsbury, VT | Meticulous LLC",
    seoDescription: "Property care for Shrewsbury, VT mountain homes and rural properties. Snow plowing, grounds care, and full-service property support in the Green Mountains. Call 802-342-8293.",
    heroImage: "/images/bg-snow.jpeg",
    intro: [
      "Shrewsbury is a small mountain town east of Rutland, with properties spread across rural hillsides and the western edge of the Green Mountains.",
      "Properties here sit at elevation, which means bigger snow loads, longer winters, and road access that can get tricky in bad weather — exactly the conditions that separate serious property care companies from the ones that cut corners.",
      "We handle Shrewsbury properties with equipment and crews sized for the terrain, full-season contracts, and the kind of local knowledge you need when your driveway is half a mile long and snows 150 inches a year.",
    ],
    localContext: "Shrewsbury is a rural town with properties on hillsides, along the edges of Green Mountain National Forest, and across a wide geography with multiple village settlements (Shrewsbury Center, Cuttingsville, Northam). Snow accumulation is among the heaviest in Rutland County, and elevation changes significantly across the town. Many properties are second homes or long-driveway rural homesites.",
    priorityServices: ["snow-ice-management", "grounds-maintenance", "property-maintenance", "rental-support"],
    landmarks: ["Cuttingsville", "Shrewsbury Center", "Green Mountain National Forest", "Shrewsbury Peak"],
    faqs: [
      {
        question: "Can you handle deep-snow plow contracts in Shrewsbury?",
        answer: "Yes. Shrewsbury gets some of the heaviest snow loads in the county. Our seasonal contracts are priced and scoped for that reality, with proper equipment and priority dispatch.",
      },
      {
        question: "Do you service properties at higher elevations in Shrewsbury?",
        answer: "Yes. Higher-elevation Shrewsbury properties are a core part of our service area. We route accordingly and plan for the access challenges that come with the terrain.",
      },
      {
        question: "Can you check on Shrewsbury second homes during extended absences?",
        answer: "Yes. Property check-ins with photo documentation are a common service for our Shrewsbury clients, especially during winter when weather events can create issues that need quick response.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "tinmouth",
    name: "Tinmouth",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Tinmouth, VT | Meticulous LLC",
    seoDescription: "Rural property care in Tinmouth, VT. Grounds maintenance, winter service, and property support for homes and second homes in southern Rutland County. Call 802-342-8293.",
    heroImage: "/images/bg-property-maintenance.jpeg",
    intro: [
      "Tinmouth is a small rural town in southern Rutland County with a strong historic character, spread-out properties, and a community known for conservation and quiet country living.",
      "Property care in Tinmouth tends to be relationship-driven — neighbors know each other, and owners want service providers who'll treat the property and the community with the same respect.",
      "We work with Tinmouth homeowners and rural property owners on grounds care, snow contracts, carpentry, and property support. We route through the town on a regular schedule so clients get consistent service despite the rural geography.",
    ],
    localContext: "Tinmouth is a rural town with working farms, historic homes, and a strong community identity. The town has protected significant acreage through conservation efforts, and many properties sit on larger parcels with mature landscaping and woodland borders. Tinmouth Pond and the Tinmouth Contra Dance Hall are notable features.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "property-maintenance", "carpentry"],
    landmarks: ["Tinmouth Pond", "Tinmouth Contra Dance Hall", "Tinmouth Channel Wildlife Management Area"],
    faqs: [
      {
        question: "Do you service larger rural parcels in Tinmouth?",
        answer: "Yes. Larger properties are the norm in Tinmouth. We scope grounds care and snow contracts to the actual site rather than a fixed package.",
      },
      {
        question: "Can you coordinate with Tinmouth conservation-focused property owners?",
        answer: "Yes. We work with owners who prioritize low-impact maintenance, native plantings, and careful stewardship — and adjust our approach to fit the goals.",
      },
      {
        question: "Do you do exterior carpentry on historic Tinmouth homes?",
        answer: "Yes. Historic and older homes are common in Tinmouth. We handle exterior repairs, trim work, and structural carpentry with the care those properties deserve.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
  {
    slug: "florence",
    name: "Florence",
    region: "Rutland County, Vermont",
    seoTitle: "Property Care in Florence, VT | Meticulous LLC",
    seoDescription: "Property care in Florence, VT. Grounds maintenance, snow plowing, and reliable property support for homes and rural properties. Call 802-342-8293.",
    heroImage: "/images/bg-lawn.jpeg",
    intro: [
      "Florence is a small community in the town of Pittsford along Route 7, with residential properties, rural homes, and access to outdoor recreation along Otter Creek.",
      "We service Florence as part of our Route 7 corridor coverage, with grounds care, winter contracts, and property support that gets scheduled efficiently alongside our Pittsford and Brandon routes.",
      "Florence properties benefit from our routing — we're already in the area, which keeps pricing fair and response times tight.",
    ],
    localContext: "Florence is a village within the town of Pittsford, situated along Route 7 near Otter Creek. Properties here are a mix of residential homes, small farms, and rural parcels. The community's proximity to larger towns (Pittsford center, Brandon, Rutland) makes it a common commuter area, with many year-round residents.",
    priorityServices: ["grounds-maintenance", "snow-ice-management", "property-maintenance", "carpentry"],
    landmarks: ["Otter Creek", "Route 7", "Florence Station Road"],
    faqs: [
      {
        question: "Do you service Florence as part of your Route 7 coverage?",
        answer: "Yes. Florence is within our regular Route 7 corridor routing, so we service it efficiently without the travel premium out-of-county services charge.",
      },
      {
        question: "Can you handle winter service for commuter homes in Florence?",
        answer: "Yes. Early-morning priority plowing for commuter homes in Florence is a standard seasonal contract offering. Clear driveway before the workday, every time.",
      },
      {
        question: "Do you do grounds care for rural Florence properties?",
        answer: "Yes. Grounds care on rural parcels — including mowing, seasonal cleanups, and woodland-edge maintenance — is a core service for our Florence clients.",
      },
    ],
    lastUpdated: "2026-04-21",
  },
];

export function getServiceAreaBySlug(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}

export function getCityNames() {
  return serviceAreas.map((a) => a.name);
}

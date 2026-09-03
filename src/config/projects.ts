import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "saffron-and-co",
    title: "Saffron & Co.",
    category: "Restaurant Website",
    industry: "restaurants",
    year: "2025",
    client: "Saffron & Co. Fine Dining",
    tagline: "A digital experience as crafted as the cuisine",
    summary:
      "Complete digital presence for an award-winning fine-dining restaurant — immersive storytelling, real-time reservations, and a menu that sells before guests arrive.",
    services: ["Design", "Development", "SEO"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Vercel"],
    highlights: [
      "Immersive full-screen menu with seasonal photography",
      "Real-time table reservation with smart availability",
      "Private dining enquiry flow with event planner",
    ],
    metrics: [
      { label: "Online reservations", value: "+212%" },
      { label: "Page load time", value: "0.8s" },
      { label: "Bounce rate", value: "-38%" },
      { label: "Organic traffic", value: "+164%" },
    ],
    overview:
      "Saffron & Co. is a 40-seat fine-dining restaurant known for its modern Indian tasting menus. Despite a Michelin-guide reputation, their digital presence was a dated template site that failed to capture the restaurant's atmosphere — costing them reservations to lesser kitchens with better websites.",
    challenge:
      "The restaurant needed a website that conveyed the sensory richness of the dining experience while solving a real operational problem: reservation requests arrived through Instagram DMs, phone calls, and walk-ins with no unified system, leading to double-bookings and lost covers during peak service.",
    solution:
      "We designed an immersive, editorial-style website anchored by cinematic food photography and restrained motion. A custom reservation engine synchronises table inventory in real time, while a CMS-driven menu system lets the chef update seasonal menus in minutes. Local SEO architecture now captures high-intent 'fine dining near me' searches.",
    features: [
      {
        title: "Real-time reservations",
        description: "Table inventory synced across web and phone bookings with automatic confirmation flows.",
        icon: "CalendarCheck",
      },
      {
        title: "Seasonal menu CMS",
        description: "Chef-friendly editor for tasting menus, wine pairings, and dietary notes.",
        icon: "BookOpen",
      },
      {
        title: "Cinematic storytelling",
        description: "Editorial layouts with parallax photography that convey the dining room's atmosphere.",
        icon: "Sparkles",
      },
      {
        title: "Private events flow",
        description: "Structured enquiry pipeline for buyouts and celebrations with instant estimates.",
        icon: "PartyPopper",
      },
      {
        title: "Local SEO architecture",
        description: "Structured data and location pages that dominate high-intent local searches.",
        icon: "MapPin",
      },
      {
        title: "Gift card sales",
        description: "Digital gift cards with branded delivery — a new revenue stream launched in week one.",
        icon: "Gift",
      },
    ],
    process: [
      {
        heading: "Immersive discovery",
        body: "We spent a full service in the dining room — observing how guests discovered the restaurant, what made them book, and what the front-of-house wished guests already knew. The insight: the tasting menu was the product, and the website needed to sell it like a story, not a PDF.",
      },
      {
        heading: "Design as appetite appeal",
        body: "We built the design language around three principles: editorial typography that mirrors the printed menu, photography with the warmth of candlelight, and motion that feels like service — present but never intrusive. Prototypes were tested with regular diners before a line of code was written.",
      },
      {
        heading: "Engineering the reservation flow",
        body: "The booking engine handles party sizes, seating zones, and pacing rules that previously lived in the maître d's notebook. Confirmation, reminder, and cancellation flows are fully automated, cutting phone interruptions during service by 70%.",
      },
      {
        heading: "Launch and compounding growth",
        body: "Post-launch, we ran a 90-day local SEO sprint — schema markup, Google Business optimisation, and editorial content around seasonal menus. Organic reservation volume now exceeds phone bookings, and the site converts 3× better than its predecessor.",
      },
    ],
    palette: ["#1C1210", "#C8956C"],
    icon: "UtensilsCrossed",
    featured: true,
  },
  {
    slug: "aurelia-hotels",
    title: "Aurelia Hotels",
    category: "Hotel Booking Platform",
    industry: "hotels",
    year: "2025",
    client: "Aurelia Boutique Hotels Group",
    tagline: "Direct bookings, beautiful escapes",
    summary:
      "A booking-first digital platform for a boutique hotel group — cinematic property storytelling, a unified booking engine, and an experience that finally rivals the OTAs.",
    services: ["UX Design", "Web Application", "Booking Engine"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Tailwind CSS"],
    highlights: [
      "Unified booking engine across 5 boutique properties",
      "Cinematic property pages with room-level storytelling",
      "Rate calendar with dynamic availability and offers",
    ],
    metrics: [
      { label: "Direct bookings", value: "+186%" },
      { label: "OTA commission saved", value: "₹48L/yr" },
      { label: "Booking completion", value: "+67%" },
      { label: "Mobile conversion", value: "+91%" },
    ],
    overview:
      "Aurelia operates five boutique properties across coastal and hill destinations. Their previous setup — five disconnected template sites and an OTA-dependent booking mix — meant paying up to 22% commission on most reservations while owning none of the guest relationship.",
    challenge:
      "The group needed to shift bookings from OTAs to their own channel without sacrificing occupancy. That meant building a booking experience faster and more trustworthy than the OTAs themselves — plus unifying five properties under one brand story without flattening each property's distinct character.",
    solution:
      "We built a single platform with a unified booking engine, real-time rate calendar, and property pages designed like editorial travel features. Sub-second performance, transparent pricing with no surprise fees, and a best-rate guarantee give guests every reason to book direct. Post-stay email flows now grow a first-party guest database the OTAs never see.",
    features: [
      {
        title: "Unified booking engine",
        description: "One search across all five properties with live rates, availability, and instant confirmation.",
        icon: "BedDouble",
      },
      {
        title: "Room-level storytelling",
        description: "Every room category gets its own editorial page with photography, amenities, and views.",
        icon: "Hotel",
      },
      {
        title: "Smart rate calendar",
        description: "Visual availability calendar with seasonal pricing, packages, and length-of-stay offers.",
        icon: "CalendarDays",
      },
      {
        title: "Best-rate guarantee",
        description: "Price-match messaging and transparent fees build the trust needed to book direct.",
        icon: "BadgeCheck",
      },
      {
        title: "Guest CRM flows",
        description: "Pre-arrival, in-stay, and post-stay emails that turn one booking into a returning guest.",
        icon: "MailCheck",
      },
      {
        title: "Experiences marketplace",
        description: "Add-on dining, spa, and local experiences bookable during checkout — growing RevPAR.",
        icon: "Compass",
      },
    ],
    process: [
      {
        heading: "Mapping the booking journey",
        body: "We analysed 18 months of OTA data and guest interviews to understand how travellers chose Aurelia. The decisive factors: photography, transparent total pricing, and cancellation flexibility — all areas where the old site was weakest.",
      },
      {
        heading: "Designing desire",
        body: "Property pages were art-directed like travel editorials — full-bleed golden-hour photography, room-by-room narratives, and micro-moments of delight. Every design decision was tested against one question: does this make someone want to be here?",
      },
      {
        heading: "Engineering trust at checkout",
        body: "The booking flow was rebuilt around clarity: total price upfront, one-page checkout, Apple Pay and UPI support, and instant confirmation. Abandonment tracking showed exactly where guests hesitated, and we iterated until completion beat the industry benchmark by 67%.",
      },
      {
        heading: "Shifting the channel mix",
        body: "With metasearch integrations, loyalty pricing, and a 'book direct' value proposition, direct bookings grew from 19% to 54% of reservations within two quarters — commission savings that paid for the entire project in eight months.",
      },
    ],
    palette: ["#14201C", "#C9A96B"],
    icon: "Hotel",
    featured: true,
  },
  {
    slug: "dentcare-studio",
    title: "DentCare Studio",
    category: "Clinic Website & Booking",
    industry: "healthcare",
    year: "2024",
    client: "DentCare Studio Dental Clinic",
    tagline: "Turning dental anxiety into booked appointments",
    summary:
      "A calming, trust-first website and appointment system for a modern dental studio — designed to convert nervous researchers into confident patients.",
    services: ["Design", "Development", "Local SEO"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Twilio"],
    highlights: [
      "Anxiety-aware UX with treatment explainers and transparent pricing",
      "Online appointment booking with automated reminders",
      "Doctor profiles that build trust before the first visit",
    ],
    metrics: [
      { label: "New patient bookings", value: "+158%" },
      { label: "No-show rate", value: "-52%" },
      { label: "Phone interruptions", value: "-45%" },
      { label: "Google rating", value: "4.9★" },
    ],
    overview:
      "DentCare Studio is a cosmetic and family dental practice competing in a dense urban market. Their old website read like a medical pamphlet — clinical, intimidating, and silent on the two things patients care about most: does it hurt, and what does it cost.",
    challenge:
      "Dental patients research anxiously, compare nervously, and book reluctantly. The clinic needed a digital presence that reduced fear rather than amplified it — while automating an appointment workflow that was consuming the front desk's entire day in phone tag.",
    solution:
      "We designed a calm, human experience: treatment pages that explain procedures in plain language with honest pricing ranges, doctor profiles that build personal trust, and a booking flow with automated SMS/WhatsApp reminders. Local SEO now puts DentCare at the top of every 'dentist near me' search in their catchment.",
    features: [
      {
        title: "Appointment booking",
        description: "Real-time slot selection by treatment type with automated confirmation and reminders.",
        icon: "CalendarCheck",
      },
      {
        title: "Treatment explainers",
        description: "Plain-language procedure guides with honest pricing ranges and recovery timelines.",
        icon: "Stethoscope",
      },
      {
        title: "Smile gallery",
        description: "Consent-based before/after cases that demonstrate outcomes better than any copy.",
        icon: "Smile",
      },
      {
        title: "Doctor profiles",
        description: "Humanising profiles with credentials, philosophy, and personal introductions.",
        icon: "UserRound",
      },
      {
        title: "Insurance guide",
        description: "Interactive coverage checker that removes the most common booking objection.",
        icon: "FileCheck",
      },
      {
        title: "Review engine",
        description: "Automated post-visit review requests feeding a 4.9★ public rating.",
        icon: "Star",
      },
    ],
    process: [
      {
        heading: "Research with real patients",
        body: "We interviewed 14 patients about how they chose a dentist. Three anxieties dominated: fear of pain, fear of surprise bills, and fear of judgment. Every page of the new site was designed to defuse exactly one of these fears.",
      },
      {
        heading: "Designing calm",
        body: "The visual language borrows from wellness, not medicine — warm neutrals, generous whitespace, genuine photography of smiling staff, and a reading experience that feels like reassurance rather than a medical chart.",
      },
      {
        heading: "Automating the front desk",
        body: "The booking system integrates with the clinic's practice management software, sends reminders via SMS and WhatsApp, and allows rescheduling without a phone call. No-shows dropped by half within two months.",
      },
      {
        heading: "Owning the local map pack",
        body: "A structured local SEO programme — service pages per treatment, review generation, and location schema — moved DentCare to the top three map results for 11 high-intent queries, driving a compounding stream of new patients.",
      },
    ],
    palette: ["#0F1B22", "#7CC4B2"],
    icon: "Stethoscope",
    featured: true,
  },
  {
    slug: "northbeam-realty",
    title: "Northbeam Realty",
    category: "Real Estate Platform",
    industry: "real-estate",
    year: "2025",
    client: "Northbeam Realty Group",
    tagline: "Property search people actually enjoy",
    summary:
      "A modern property platform with intelligent search, immersive listings, and lead workflows that turned a brokerage's website into its top-performing agent.",
    services: ["Web Application", "UX Design", "CRM Integration"],
    stack: ["Next.js", "TypeScript", "Algolia", "PostgreSQL", "Mapbox", "Tailwind CSS"],
    highlights: [
      "Instant property search with map-based discovery",
      "Immersive listing pages with virtual tour integration",
      "Automated lead routing and agent CRM sync",
    ],
    metrics: [
      { label: "Qualified leads", value: "+240%" },
      { label: "Search engagement", value: "4.2×" },
      { label: "Time on listing", value: "+96%" },
      { label: "Lead response time", value: "< 5 min" },
    ],
    overview:
      "Northbeam is a mid-size brokerage competing against national portals with hundred-million-dollar budgets. Their previous site was essentially a brochure — listings lived on the portals, and the website contributed almost nothing to the pipeline.",
    challenge:
      "The brokerage needed its website to become a genuine lead engine. That meant matching the search experience buyers expect from major portals while capturing and routing leads to agents faster than the competition — in a market where the first agent to respond usually wins.",
    solution:
      "We built a portal-grade search experience — instant filters, map discovery, saved searches with alerts — wrapped around listing pages designed to make every property feel premium. A custom lead layer scores, routes, and syncs enquiries to the right agent's CRM within seconds, with automated follow-up when agents are in the field.",
    features: [
      {
        title: "Instant search",
        description: "Sub-100ms filtered search across budget, beds, locality, and lifestyle criteria.",
        icon: "Search",
      },
      {
        title: "Map discovery",
        description: "Interactive map exploration with neighbourhood insights and commute overlays.",
        icon: "Map",
      },
      {
        title: "Immersive listings",
        description: "Gallery-first listing pages with floor plans, virtual tours, and cost calculators.",
        icon: "Building",
      },
      {
        title: "Saved searches & alerts",
        description: "Buyers save criteria and get instant alerts when matching properties list.",
        icon: "BellRing",
      },
      {
        title: "Smart lead routing",
        description: "Enquiries scored and routed to the right agent with SLA-tracked response.",
        icon: "GitBranch",
      },
      {
        title: "Agent microsites",
        description: "Every agent gets a personal page with their listings, reviews, and booking calendar.",
        icon: "IdCard",
      },
    ],
    process: [
      {
        heading: "Studying the search",
        body: "Session recordings from the old site revealed buyers bouncing within seconds — filters were buried, listings were thin, and the map was an afterthought. We benchmarked the top five portals and committed to matching them feature-for-feature, then beating them on speed.",
      },
      {
        heading: "Designing for desire and trust",
        body: "Listings are an emotional purchase wrapped in due diligence. We designed listing pages that lead with cinematic imagery but surface floor plans, pricing history, and neighbourhood data with one tap — romance first, rigour always available.",
      },
      {
        heading: "The five-minute advantage",
        body: "Research showed that leads contacted within five minutes convert 8× more often. We built the routing engine around this stat: instant scoring, smart agent assignment by locality and availability, and automated first-response when agents can't reply.",
      },
      {
        heading: "Compounding pipeline",
        body: "Saved-search alerts and monthly market reports turned one-time visitors into a nurture audience. Twelve months in, the website is the brokerage's single largest source of qualified buyer leads — ahead of every portal it used to depend on.",
      },
    ],
    palette: ["#101820", "#8FAADC"],
    icon: "Building2",
    featured: true,
  },
  {
    slug: "atlas-retail",
    title: "Atlas Retail",
    category: "E-Commerce Storefront",
    industry: "retail",
    year: "2024",
    client: "Atlas Home & Living",
    tagline: "Headless commerce that converts like a flagship store",
    summary:
      "A headless commerce rebuild for a premium home-goods brand — sub-second storefront, editorial merchandising, and a checkout that stopped leaking revenue.",
    services: ["E-Commerce", "Performance", "CRO"],
    stack: ["Next.js", "Shopify Hydrogen", "Sanity CMS", "Stripe", "Klaviyo", "Vercel"],
    highlights: [
      "Sub-second storefront across 2,400+ SKUs",
      "Editorial collection pages blending content and commerce",
      "One-page checkout with wallet payments and UPI",
    ],
    metrics: [
      { label: "Conversion rate", value: "+64%" },
      { label: "Page speed", value: "0.9s LCP" },
      { label: "Cart abandonment", value: "-31%" },
      { label: "Average order value", value: "+22%" },
    ],
    overview:
      "Atlas Home & Living sells premium furniture and decor to design-conscious buyers. Their legacy platform buckled under its own catalogue — five-second page loads, a mobile experience that punished the 74% of traffic browsing on phones, and a checkout with a 71% abandonment rate.",
    challenge:
      "The brand had outgrown its template store. Merchandising required developer help, campaign landing pages took weeks, and every performance fix broke something else. They needed enterprise-grade speed and flexibility without enterprise-grade operational overhead.",
    solution:
      "We rebuilt the storefront headless — Shopify's commerce engine behind a bespoke Next.js experience. Editorial collection pages let the team merchandise like a magazine, the checkout was ruthlessly simplified, and abandoned-cart flows now recover revenue automatically. The marketing team ships campaigns in hours, not sprints.",
    features: [
      {
        title: "Headless storefront",
        description: "Bespoke Next.js frontend on Shopify — total design freedom with sub-second loads.",
        icon: "Store",
      },
      {
        title: "Editorial merchandising",
        description: "Collection pages mixing shoppable product with lookbook storytelling.",
        icon: "LayoutTemplate",
      },
      {
        title: "Optimized checkout",
        description: "One-page checkout with UPI, wallets, and express pay — abandonment down 31%.",
        icon: "CreditCard",
      },
      {
        title: "Smart search & filters",
        description: "Instant search with typo tolerance and merchandised results across 2,400 SKUs.",
        icon: "ListFilter",
      },
      {
        title: "Recovery flows",
        description: "Abandoned cart, browse abandonment, and post-purchase flows on autopilot.",
        icon: "MailCheck",
      },
      {
        title: "Reviews & UGC",
        description: "Photo reviews and room-inspiration galleries that sell the lifestyle, not just the product.",
        icon: "MessageSquareHeart",
      },
    ],
    process: [
      {
        heading: "Auditing the funnel",
        body: "Analytics told a brutal story: 58% of mobile users abandoned before the first product image loaded. We profiled every millisecond of the journey and identified the exact moments revenue was leaking — then sized each fix by its rupee impact.",
      },
      {
        heading: "Designing the flagship",
        body: "The design goal was a digital flagship: the polish of a premium retail store with the convenience of e-commerce. Large imagery, restrained typography, and product pages that answer every question a buyer asks in-store — dimensions, materials, delivery, returns.",
      },
      {
        heading: "Performance as a feature",
        body: "Every architectural decision served speed: static-first rendering, edge caching, image pipelines, and a strict performance budget enforced in CI. The result: a 0.9s LCP that put Atlas in the top 1% of e-commerce storefronts.",
      },
      {
        heading: "Compounding conversion",
        body: "Post-launch we ran a structured CRO programme — checkout experiments, merchandising tests, and personalised recommendations. Conversion rose a further 18% in the two quarters after launch, on top of the rebuild's initial 64% lift.",
      },
    ],
    palette: ["#181410", "#D9A05B"],
    icon: "ShoppingBag",
    featured: true,
  },
  {
    slug: "lumina-health",
    title: "Lumina Health",
    category: "Patient Portal",
    industry: "medical",
    year: "2025",
    client: "Lumina Multi-Specialty Clinic",
    tagline: "Healthcare software with a heartbeat",
    summary:
      "A secure patient portal for a multi-specialty clinic — appointments, records, teleconsultation, and billing unified in one humane experience.",
    services: ["Web Application", "UX Design", "Security"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebRTC", "Docker"],
    highlights: [
      "Unified patient records across 6 specialties",
      "Video consultations built into the appointment flow",
      "Role-based access with full audit trails",
    ],
    metrics: [
      { label: "Portal adoption", value: "78%" },
      { label: "Front-desk calls", value: "-58%" },
      { label: "Report access time", value: "Instant" },
      { label: "Patient satisfaction", value: "4.8/5" },
    ],
    overview:
      "Lumina runs a six-specialty clinic where every department operated its own register, its own appointment book, and its own billing spreadsheet. Patients repeated their history at every desk, reports travelled by WhatsApp photo, and the front desk drowned in calls.",
    challenge:
      "The clinic needed one system of record — without compromising patient privacy or overwhelming a non-technical staff. Security requirements were non-negotiable, and adoption across patients aged 18 to 80 demanded an interface of unusual clarity.",
    solution:
      "We built a secure patient portal unifying appointments, medical records, prescriptions, teleconsultation, and billing. Role-based access keeps sensitive data compartmentalised, every action is audit-logged, and the interface was usability-tested with patients across every age group until task success exceeded 95%.",
    features: [
      {
        title: "Unified health records",
        description: "Consultations, prescriptions, and reports across all specialties in one timeline.",
        icon: "FolderHeart",
      },
      {
        title: "Smart appointments",
        description: "Specialty-aware booking with doctor schedules, waitlists, and reminders.",
        icon: "CalendarClock",
      },
      {
        title: "Teleconsultation",
        description: "Encrypted video visits with e-prescriptions delivered at the end of the call.",
        icon: "Video",
      },
      {
        title: "Digital billing",
        description: "Itemised invoices, insurance-ready documents, and online payment.",
        icon: "ReceiptText",
      },
      {
        title: "Role-based security",
        description: "Granular permissions, audit trails, and encrypted data at rest and in transit.",
        icon: "ShieldCheck",
      },
      {
        title: "Family profiles",
        description: "Parents manage children's care and elders' appointments from one account.",
        icon: "Users",
      },
    ],
    process: [
      {
        heading: "Shadowing the clinic",
        body: "We embedded with front-desk staff, nurses, and doctors for two weeks, mapping every paper trail and repeated question. The dominant insight: 60% of front-desk calls were patients asking for things a portal could show them instantly.",
      },
      {
        heading: "Designing for every generation",
        body: "Usability sessions with patients from 18 to 80 shaped every interface decision — larger touch targets, plain-language labels, and flows that never strand a user. If a 70-year-old couldn't book an appointment unaided, the design went back to the board.",
      },
      {
        heading: "Engineering trust",
        body: "Healthcare data demands paranoid engineering: encrypted storage, signed URLs for reports, session hardening, and complete audit trails. We documented the security model in language the clinic's compliance consultant could verify.",
      },
      {
        heading: "Adoption as the metric",
        body: "A portal nobody uses is a failure regardless of code quality. We launched with front-desk scripts that onboarded patients during visits, and adoption climbed to 78% in six months — with front-desk call volume falling by more than half.",
      },
    ],
    palette: ["#0D1A1E", "#6FC3C9"],
    icon: "HeartPulse",
  },
  {
    slug: "vertex-builds",
    title: "Vertex Builds",
    category: "Construction Corporate Site",
    industry: "construction",
    year: "2024",
    client: "Vertex Builds & Infrastructure",
    tagline: "Building digital credibility for a builder of skylines",
    summary:
      "A corporate presence for a construction major — project portfolios with live progress, investor-grade storytelling, and a recruitment engine for top engineering talent.",
    services: ["Corporate Website", "Design System", "CMS"],
    stack: ["Next.js", "TypeScript", "Sanity CMS", "Mapbox", "Tailwind CSS"],
    highlights: [
      "Interactive project portfolio with live construction progress",
      "Investor relations section with compliance documents",
      "Careers portal that tripled engineering applications",
    ],
    metrics: [
      { label: "Tender enquiries", value: "+94%" },
      { label: "Talent applications", value: "3.1×" },
      { label: "Investor page visits", value: "+170%" },
      { label: "Sales cycle", value: "-23%" },
    ],
    overview:
      "Vertex Builds delivers commercial and residential projects worth hundreds of crores, but its digital presence was a five-page brochure last updated in 2019. For institutional clients evaluating contractors, the website undermined the very credibility the company's portfolio should have guaranteed.",
    challenge:
      "Construction is a credibility business. Vertex needed to win tenders against larger competitors, attract engineers who had their pick of employers, and give investors confidence — all through a website that had to speak to three very different audiences without fragmenting.",
    solution:
      "We built a corporate platform structured around proof: an interactive project portfolio with timelines, imagery, and live progress data; a credentials library institutional evaluators actually use; and a careers experience that sells the mission of building. A design system keeps every future page equally credible.",
    features: [
      {
        title: "Project portfolio",
        description: "Filterable case studies with galleries, specs, timelines, and outcome data.",
        icon: "HardHat",
      },
      {
        title: "Live project progress",
        description: "Ongoing projects display construction milestones updated from the field.",
        icon: "Activity",
      },
      {
        title: "Credentials library",
        description: "Certifications, safety records, and compliance documents in one trusted hub.",
        icon: "Award",
      },
      {
        title: "Investor section",
        description: "Financial highlights, governance, and reports presented with institutional polish.",
        icon: "LineChart",
      },
      {
        title: "Careers portal",
        description: "Role listings, team stories, and a culture page that sells the mission.",
        icon: "Briefcase",
      },
      {
        title: "Tender enquiry flow",
        description: "Structured RFQ intake that qualifies opportunities before the first call.",
        icon: "FileText",
      },
    ],
    process: [
      {
        heading: "Three audiences, one story",
        body: "Stakeholder interviews with leadership, HR, and the bids team revealed three distinct audiences with one shared need: proof. Every section of the site was architected around verifiable evidence — projects delivered, safety records, people retained.",
      },
      {
        heading: "An industrial design language",
        body: "The visual system draws from engineering — precise grids, blueprint-inspired linework, and photography that treats structures with the reverence of architecture magazines. Confident, not decorative.",
      },
      {
        heading: "Content that closes deals",
        body: "We worked with the bids team to understand exactly what evaluators check during pre-qualification, then made every one of those documents findable in two clicks. The sales team now uses the website itself as their pitch deck.",
      },
      {
        heading: "Recruitment as a channel",
        body: "Careers content was rebuilt around engineer motivations: the scale of projects, the technology used, and growth stories from within. Applications tripled in six months, with a measurable lift in candidate quality.",
      },
    ],
    palette: ["#171310", "#E08A3C"],
    icon: "HardHat",
  },
  {
    slug: "cobalt-legal",
    title: "Cobalt Legal",
    category: "Law Firm Website",
    industry: "professional-services",
    year: "2024",
    client: "Cobalt Legal LLP",
    tagline: "Authority, precision, and trust — rendered in pixels",
    summary:
      "A thought-leadership platform for a boutique law firm — practice-area pages that rank, insights that demonstrate expertise, and intake flows that qualify clients.",
    services: ["Website", "Content Strategy", "SEO"],
    stack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Vercel"],
    highlights: [
      "Practice-area architecture dominating niche search results",
      "Attorney profiles that convert credentials into client trust",
      "Structured intake that pre-qualifies every enquiry",
    ],
    metrics: [
      { label: "Qualified enquiries", value: "+132%" },
      { label: "Organic visibility", value: "+215%" },
      { label: "Insight readership", value: "5.4×" },
      { label: "Intake call time", value: "-40%" },
    ],
    overview:
      "Cobalt Legal is a boutique firm with genuine depth in corporate law and dispute resolution — but a website that made them look like every other firm: stock gavels, vague practice descriptions, and no evidence of the calibre of their work.",
    challenge:
      "Legal clients choose on perceived expertise. Cobalt's partners were publishing nothing, ranking for nothing, and receiving enquiries that were poorly qualified — forcing expensive partner time into intake calls that went nowhere.",
    solution:
      "We rebuilt the firm's presence around demonstrated expertise: practice pages that answer the questions clients actually search, an insights engine that turns the partners' knowledge into searchable authority, and a structured intake flow that captures matter details before the first conversation.",
    features: [
      {
        title: "Practice-area pages",
        description: "Deep, search-optimised pages that rank for the queries clients actually ask.",
        icon: "Scale",
      },
      {
        title: "Insights engine",
        description: "Partner-authored analysis with a CMS simple enough for lawyers to use.",
        icon: "Newspaper",
      },
      {
        title: "Attorney profiles",
        description: "Credential-rich profiles with matter experience and published work.",
        icon: "UserRound",
      },
      {
        title: "Qualified intake",
        description: "Structured enquiry forms that capture matter type, parties, and urgency.",
        icon: "ClipboardCheck",
      },
      {
        title: "Resource library",
        description: "Guides and checklists that generate leads while demonstrating expertise.",
        icon: "Library",
      },
      {
        title: "Matter confidentiality",
        description: "Enquiry handling designed around privilege and data minimisation.",
        icon: "Lock",
      },
    ],
    process: [
      {
        heading: "Interviewing the experts",
        body: "We ran structured interviews with every partner to extract the questions clients ask in first meetings. Those questions became the architecture — each practice page answers, in order, what a prospective client is silently asking.",
      },
      {
        heading: "Designing authority",
        body: "The design language is precision itself: a disciplined typographic system, a restrained palette, and photography of the real team and real office. Nothing stock, nothing borrowed — because legal clients can smell inauthenticity.",
      },
      {
        heading: "SEO for legal search",
        body: "Legal search is intent-rich and competitive. We mapped the query landscape across practice areas, built pages around client language rather than legal jargon, and earned visibility that now delivers a steady flow of inbound matters.",
      },
      {
        heading: "Making publishing effortless",
        body: "Partners will publish if it takes ten minutes and makes them look brilliant. The CMS was configured around that standard — and readership of firm insights grew more than five-fold, with several articles directly attributed in new client enquiries.",
      },
    ],
    palette: ["#12161F", "#94A7C7"],
    icon: "Scale",
  },
  {
    slug: "meridian-travel",
    title: "Meridian Travel",
    category: "Travel Experience Platform",
    industry: "startups",
    year: "2025",
    client: "Meridian Travel Co.",
    tagline: "Wanderlust, engineered into a booking machine",
    summary:
      "A storytelling-first platform for a boutique travel company — immersive itineraries, instant quote generation, and a trip-design flow that converts dreamers into bookers.",
    services: ["Design", "Development", "Booking System"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Sanity CMS"],
    highlights: [
      "Immersive itinerary pages with day-by-day storytelling",
      "Instant trip quotes from a rules-based pricing engine",
      "Traveller dashboard with documents and countdown",
    ],
    metrics: [
      { label: "Quote requests", value: "+178%" },
      { label: "Quote-to-booking", value: "+41%" },
      { label: "Avg. trip value", value: "+28%" },
      { label: "Referral bookings", value: "2.3×" },
    ],
    overview:
      "Meridian designs bespoke journeys — honeymoons, expeditions, multi-generational trips. Their process was entirely manual: enquiries by email, quotes assembled in documents over two days, and itineraries delivered as PDFs that failed to capture the magic of what they were selling.",
    challenge:
      "Bespoke travel lives or dies in the gap between dreaming and deciding. Meridian's slow, text-heavy quoting process was losing emotionally-ready buyers to faster competitors, while delivering none of the visual inspiration that justifies premium pricing.",
    solution:
      "We built a platform where every itinerary is a story — day-by-day pages with photography, maps, and inclusions rendered beautifully. A rules-based pricing engine generates instant quotes, and a traveller dashboard carries the relationship from first deposit through to the flight home.",
    features: [
      {
        title: "Immersive itineraries",
        description: "Day-by-day journey pages with photography, maps, and curated experiences.",
        icon: "Route",
      },
      {
        title: "Instant quotes",
        description: "A pricing engine that turns enquiry to tailored proposal in minutes, not days.",
        icon: "Calculator",
      },
      {
        title: "Traveller dashboard",
        description: "Payments, documents, packing lists, and a live countdown to departure.",
        icon: "LayoutDashboard",
      },
      {
        title: "Experience library",
        description: "A CMS-powered catalogue of stays, guides, and moments the team curates.",
        icon: "Compass",
      },
      {
        title: "Referral programme",
        description: "Post-trip referral flows that turned happy travellers into the top sales channel.",
        icon: "Gift",
      },
      {
        title: "Seasonal collections",
        description: "Editorial trip collections the team publishes without developer help.",
        icon: "Images",
      },
    ],
    process: [
      {
        heading: "Following the dream",
        body: "We traced Meridian's enquiry-to-booking funnel and found the fatal gap: 48 hours between enquiry and quote, during which emotional momentum died. Every subsequent decision served one goal — collapse that gap while making the offer irresistible.",
      },
      {
        heading: "Designing wanderlust",
        body: "Itinerary pages were designed like travel magazine features — cinematic photography, unhurried typography, and maps that make geography feel like a promise. The design sells the feeling; the details are always one scroll away.",
      },
      {
        heading: "A pricing engine with judgement",
        body: "We codified Meridian's pricing logic — seasonality, party size, accommodation tiers, margin rules — into an engine that produces consultant-quality quotes instantly, with the consultant reviewing rather than assembling.",
      },
      {
        heading: "From booking to advocacy",
        body: "The traveller dashboard keeps clients engaged through the months between booking and departure, and post-trip flows capture reviews and referrals at peak happiness. Referrals are now the fastest-growing source of new bookings.",
      },
    ],
    palette: ["#101C22", "#5FB3A8"],
    icon: "Plane",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));

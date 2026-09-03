import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "restaurants",
    title: "Restaurants & Cafés",
    tagline: "Fill more tables with a website that sells the experience",
    description:
      "Reservation-first websites and ordering systems that turn hungry browsers into booked tables and repeat regulars.",
    icon: "UtensilsCrossed",
    overview:
      "Diners decide with their eyes long before they taste anything. We build restaurant websites that capture your atmosphere, showcase your menu beautifully, and make reserving a table effortless — while local SEO ensures you're found the moment someone searches for their next meal.",
    challenges: [
      "Losing reservations to competitors with better online presence",
      "Reservation requests scattered across calls, DMs, and walk-ins",
      "Menus locked in PDFs that frustrate mobile visitors",
      "Third-party platforms taking heavy commissions on orders",
      "No way to promote events, seasonal menus, or private dining",
    ],
    solutions: [
      "Immersive websites with photography-led menu experiences",
      "Integrated reservation systems with automated confirmations",
      "Direct online ordering that eliminates marketplace commissions",
      "Local SEO that wins 'near me' searches in your neighbourhood",
      "CMS tools to update menus, hours, and events in minutes",
    ],
    stats: [
      { label: "Avg. reservation growth", value: 180, suffix: "%" },
      { label: "Restaurant projects", value: 24, suffix: "+" },
    ],
  },
  {
    slug: "hotels",
    title: "Hotels & Hospitality",
    tagline: "Direct bookings that beat the OTAs",
    description:
      "Booking-first platforms for hotels, resorts, and boutique stays — designed to shift revenue from commission-hungry OTAs to your own channel.",
    icon: "Hotel",
    overview:
      "Every OTA booking costs you 15–25% and owns the guest relationship. We build hotel websites with booking experiences so seamless, pricing so transparent, and storytelling so compelling that guests choose to book direct — and return without a middleman.",
    challenges: [
      "Heavy dependence on OTAs and their commissions",
      "Outdated booking flows that lose guests at checkout",
      "Property photography that undersells the experience",
      "No first-party guest data for marketing",
      "Multiple properties with disconnected websites",
    ],
    solutions: [
      "Unified booking engines with real-time rates and availability",
      "Cinematic property and room-level storytelling",
      "Best-rate guarantees and direct-booking incentives",
      "Guest CRM flows for pre-arrival and post-stay engagement",
      "Multi-property platforms under one brand architecture",
    ],
    stats: [
      { label: "Avg. direct booking lift", value: 186, suffix: "%" },
      { label: "Hospitality projects", value: 14, suffix: "+" },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare & Clinics",
    tagline: "Trust-building digital experiences for care providers",
    description:
      "Calming, credibility-first websites and patient systems for clinics, hospitals, and wellness practices.",
    icon: "HeartPulse",
    overview:
      "Patients choose providers they trust, and trust starts online. We design healthcare websites that reduce anxiety, explain treatments clearly, showcase credentials, and make booking effortless — all while meeting the privacy standards healthcare demands.",
    challenges: [
      "Anxious patients finding fear-amplifying information online",
      "Front desks overwhelmed with appointment phone calls",
      "No-shows draining schedule utilisation",
      "Difficulty showcasing specialities and credentials",
      "Privacy and compliance requirements for patient data",
    ],
    solutions: [
      "Anxiety-aware UX with clear treatment explainers and pricing",
      "Online appointment booking with automated reminders",
      "Doctor profiles and outcome galleries that build confidence",
      "Secure patient portals for records and teleconsultation",
      "Local SEO dominating 'doctor near me' searches",
    ],
    stats: [
      { label: "Avg. booking growth", value: 150, suffix: "%" },
      { label: "Healthcare projects", value: 19, suffix: "+" },
    ],
  },
  {
    slug: "education",
    title: "Education & Training",
    tagline: "Enrolment engines for institutions and educators",
    description:
      "Websites and learning platforms for schools, academies, and course creators that turn interest into enrolment.",
    icon: "GraduationCap",
    overview:
      "Choosing an educational institution is a high-stakes, research-heavy decision. We build platforms that present programmes compellingly, prove outcomes with evidence, and make the path from curiosity to enrolment as short as possible.",
    challenges: [
      "Programme information buried in confusing site structures",
      "Enquiry processes that lose prospective students",
      "Difficulty demonstrating outcomes and credibility",
      "Manual admission workflows consuming staff time",
      "Competition from online-first education platforms",
    ],
    solutions: [
      "Programme pages structured around student decision journeys",
      "Enquiry and application flows with automated follow-up",
      "Outcome evidence: placements, results, and alumni stories",
      "Learning management and student portal integrations",
      "Content strategies that build authority in your subject areas",
    ],
    stats: [
      { label: "Avg. enquiry growth", value: 145, suffix: "%" },
      { label: "Education projects", value: 11, suffix: "+" },
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    tagline: "Property platforms that generate pipeline",
    description:
      "Search-first property websites and lead systems for developers, brokerages, and agencies.",
    icon: "Building2",
    overview:
      "Property buyers start online, and the first agent to respond usually wins. We build real estate platforms with portal-grade search, listings that sell the lifestyle, and lead routing that gets enquiries to the right agent in seconds.",
    challenges: [
      "Portals owning the buyer relationship and charging for leads",
      "Slow, clunky property search experiences",
      "Listings that fail to convey a property's true appeal",
      "Leads sitting in inboxes while competitors respond first",
      "No nurture system for long buying cycles",
    ],
    solutions: [
      "Instant property search with map-based discovery",
      "Immersive listing pages with tours, plans, and calculators",
      "Saved searches and alerts that bring buyers back",
      "Smart lead routing with SLA-tracked agent response",
      "Market-report content that nurtures long buying cycles",
    ],
    stats: [
      { label: "Avg. lead growth", value: 220, suffix: "%" },
      { label: "Real estate projects", value: 16, suffix: "+" },
    ],
  },
  {
    slug: "retail",
    title: "Retail & E-Commerce",
    tagline: "Stores engineered for conversion",
    description:
      "High-performance online stores and omnichannel experiences for retail brands ready to own their digital shelf.",
    icon: "ShoppingBag",
    overview:
      "In retail, every millisecond of load time and every unnecessary checkout step costs real money. We build headless commerce experiences with flagship-store polish, obsessive performance, and merchandising flexibility that keeps your marketing team moving at campaign speed.",
    challenges: [
      "Slow storefronts bleeding mobile conversions",
      "Template stores that can't express the brand",
      "Checkout friction driving cart abandonment",
      "Merchandising locked behind developer availability",
      "Marketplace dependency eroding margins",
    ],
    solutions: [
      "Headless storefronts with sub-second performance",
      "Editorial merchandising and campaign landing pages",
      "Checkout optimization with wallets, UPI, and express pay",
      "Abandoned-cart and retention flows on autopilot",
      "Reviews, UGC, and loyalty systems that compound LTV",
    ],
    stats: [
      { label: "Avg. conversion lift", value: 64, suffix: "%" },
      { label: "Retail projects", value: 21, suffix: "+" },
    ],
  },
  {
    slug: "construction",
    title: "Construction & Infrastructure",
    tagline: "Digital credibility for companies that build",
    description:
      "Corporate platforms for contractors and developers that win tenders, attract talent, and reassure investors.",
    icon: "HardHat",
    overview:
      "Construction is a credibility business where websites are vetted before contracts are signed. We build corporate platforms that present your portfolio with institutional polish, document your credentials, and turn your track record into your best salesperson.",
    challenges: [
      "Websites that undermine credibility during tender evaluation",
      "Impressive portfolios presented unimpressively",
      "Difficulty attracting engineering and project talent",
      "Investor and compliance information scattered or missing",
      "Tender enquiries arriving unstructured and unqualified",
    ],
    solutions: [
      "Interactive project portfolios with specs, timelines, and progress",
      "Credentials libraries for certifications and safety records",
      "Careers portals that sell the mission to top talent",
      "Investor relations sections with institutional polish",
      "Structured RFQ flows that qualify opportunities early",
    ],
    stats: [
      { label: "Avg. tender enquiry lift", value: 94, suffix: "%" },
      { label: "Construction projects", value: 9, suffix: "+" },
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    tagline: "Authority platforms for experts and advisors",
    description:
      "Websites for law firms, consultancies, accountants, and agencies that convert expertise into inbound pipeline.",
    icon: "Scale",
    overview:
      "Clients hire expertise they can verify. We build professional-services websites that demonstrate depth through thought leadership, present credentials with precision, and qualify enquiries before they consume billable hours.",
    challenges: [
      "Websites indistinguishable from every competitor",
      "Expertise invisible to search engines and prospects",
      "Unqualified enquiries consuming expensive partner time",
      "No system for publishing insights consistently",
      "Referral-dependent growth with no inbound engine",
    ],
    solutions: [
      "Practice-area architecture that ranks for client questions",
      "Insight engines that turn expertise into searchable authority",
      "Credential-rich team profiles that build personal trust",
      "Structured intake flows that pre-qualify every enquiry",
      "Resource libraries that generate leads around the clock",
    ],
    stats: [
      { label: "Avg. enquiry growth", value: 132, suffix: "%" },
      { label: "Services projects", value: 17, suffix: "+" },
    ],
  },
  {
    slug: "startups",
    title: "Startups & SaaS",
    tagline: "Launch fast, look funded, convert relentlessly",
    description:
      "Product websites, MVPs, and growth systems for startups that need to move fast without looking cheap.",
    icon: "Rocket",
    overview:
      "Startups need to look bigger than they are while shipping faster than everyone else. We build product websites and web applications with the polish of a Series-C company and the velocity your runway demands — plus the analytics to know exactly what's working.",
    challenges: [
      "Looking credible enough for enterprise prospects and investors",
      "Marketing sites that can't keep pace with product velocity",
      "MVPs that need real engineering without burning runway",
      "No instrumentation to learn what's converting",
      "Founders stretched between product and marketing",
    ],
    solutions: [
      "Product websites that punch above your funding stage",
      "Component systems your team can ship with independently",
      "Production-grade MVP development on modern stacks",
      "Analytics and experimentation wired in from day one",
      "Ongoing design-engineering partnership as you scale",
    ],
    stats: [
      { label: "Startup launches", value: 15, suffix: "+" },
      { label: "Avg. time to launch", value: 6, suffix: " wks" },
    ],
  },
  {
    slug: "medical",
    title: "Medical & Dental Practices",
    tagline: "Patient-first digital front doors",
    description:
      "Specialised websites for dental, dermatology, physiotherapy, and specialty medical practices.",
    icon: "Stethoscope",
    overview:
      "Specialty practices win patients through trust and visibility. We build practice websites that rank for the treatments you offer, answer the anxieties patients bring, and fill your appointment book with patients who arrive already confident in your care.",
    challenges: [
      "Competing against aggregators and chain clinics",
      "Patients choosing on price because value isn't communicated",
      "Appointment workflows stuck in phone-tag",
      "Before/after results that aren't showcased effectively",
      "Reviews and reputation left to chance",
    ],
    solutions: [
      "Treatment pages that rank and convert for high-value procedures",
      "Transparent pricing guidance that pre-qualifies patients",
      "Booking systems with automated reminders and recalls",
      "Consent-based outcome galleries that demonstrate expertise",
      "Review generation engines that build a 5-star moat",
    ],
    stats: [
      { label: "Avg. patient growth", value: 158, suffix: "%" },
      { label: "Medical projects", value: 13, suffix: "+" },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

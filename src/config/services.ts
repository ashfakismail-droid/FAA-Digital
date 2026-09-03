import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    shortTitle: "Business Websites",
    tagline: "A website that works as hard as you do",
    description:
      "Conversion-focused websites for local and growing businesses — designed to build trust, communicate value, and turn visitors into enquiries.",
    icon: "Globe",
    featured: true,
    problem:
      "Most small-business websites look dated, load slowly, and fail to answer the one question every visitor has: why should I choose you? The result is lost credibility and lost customers.",
    solution:
      "We design bespoke business websites around your customer's decision journey — clear messaging, social proof, and effortless contact paths, wrapped in a premium visual identity that makes your business look established and trustworthy.",
    benefits: [
      "A premium first impression that builds instant trust",
      "Clear messaging structure that converts visitors into enquiries",
      "Blazing-fast load times on every device",
      "Easy content updates without technical knowledge",
      "Built-in local SEO foundations so customers find you",
      "Analytics wired in from day one",
    ],
    outcomes: [
      "2–4× more enquiry volume within the first quarter",
      "Measurably lower bounce rates",
      "Higher-quality leads who already trust your brand",
    ],
    deliverables: [
      "Custom design system & UI kit",
      "5–10 fully designed and developed pages",
      "CMS for effortless content editing",
      "On-page SEO setup",
      "Analytics & conversion tracking",
      "30 days of post-launch support",
    ],
  },
  {
    slug: "corporate-websites",
    title: "Corporate Websites",
    shortTitle: "Corporate",
    tagline: "Enterprise presence, engineered to scale",
    description:
      "Sophisticated corporate platforms with the governance, security, and scalability that established organisations demand.",
    icon: "Building2",
    problem:
      "Corporate websites carry heavy demands — multiple stakeholders, strict brand governance, complex content structures, and zero tolerance for downtime or security issues.",
    solution:
      "We architect corporate platforms with modular design systems, role-based content workflows, and enterprise-grade infrastructure — so marketing teams move fast without breaking brand or compliance.",
    benefits: [
      "A design system that keeps every page on-brand",
      "Multi-team content workflows with approvals",
      "Enterprise security and 99.9% uptime architecture",
      "Multilingual and multi-site readiness",
      "Accessibility compliant (WCAG 2.2 AA)",
      "Seamless integration with CRM and marketing stacks",
    ],
    outcomes: [
      "Faster campaign launches by marketing teams",
      "Reduced dependency on developers for content",
      "A digital presence that matches the scale of your organisation",
    ],
    deliverables: [
      "Corporate design system & component library",
      "Headless CMS with editorial workflows",
      "Performance & security hardening",
      "Analytics and stakeholder dashboards",
      "Documentation & team training",
      "SLA-backed maintenance plan",
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    shortTitle: "Landing Pages",
    tagline: "Pages engineered to convert",
    description:
      "High-converting campaign landing pages built around a single goal — measured, tested, and refined for maximum ROI.",
    icon: "MousePointerClick",
    problem:
      "Sending paid traffic to a generic homepage wastes budget. Without a focused landing page, campaigns underperform and cost-per-acquisition climbs.",
    solution:
      "We design single-minded landing pages where every element — headline, proof, offer, form — is engineered around one conversion goal, then instrumented for A/B testing and continuous improvement.",
    benefits: [
      "Message-matched pages for every campaign",
      "Sub-second load times that protect ad spend",
      "Persuasive copy structure backed by research",
      "Built-in A/B testing and experimentation",
      "Frictionless forms that maximise completion",
      "Full conversion tracking and attribution",
    ],
    outcomes: [
      "25–60% lift in conversion rates vs. generic pages",
      "Lower cost-per-acquisition on paid campaigns",
      "Clear data on what messaging actually works",
    ],
    deliverables: [
      "Conversion-focused page design",
      "Copywriting framework & wireframes",
      "A/B testing setup",
      "Analytics & event tracking",
      "Thank-you & follow-up flows",
      "Post-launch optimization report",
    ],
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    shortTitle: "E-Commerce",
    tagline: "Stores that sell while you sleep",
    description:
      "Beautiful, high-performance online stores with frictionless checkout — built on modern headless commerce architecture.",
    icon: "ShoppingBag",
    featured: true,
    problem:
      "Slow, clunky stores bleed revenue. Every extra second of load time costs conversions, and a confusing checkout abandons carts that took real marketing budget to fill.",
    solution:
      "We build headless commerce experiences with sub-second page loads, obsessive checkout optimization, and merchandising flexibility — so your store converts like the best in your category.",
    benefits: [
      "Sub-second page loads across the entire catalogue",
      "Checkout flows optimized to reduce abandonment",
      "Flexible promotions, bundles, and merchandising",
      "Inventory, payments, and shipping integrations",
      "Mobile-first design where most buyers shop",
      "SEO architecture that grows organic revenue",
    ],
    outcomes: [
      "15–40% improvement in conversion rate",
      "Higher average order value through smart merchandising",
      "An owned channel that reduces marketplace dependency",
    ],
    deliverables: [
      "Custom storefront design & development",
      "Headless commerce platform setup",
      "Payment, shipping & tax integrations",
      "Product information architecture",
      "Abandoned cart & email flows",
      "Staff training & documentation",
    ],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    shortTitle: "Web Apps",
    tagline: "From idea to production-grade product",
    description:
      "Custom web applications — booking systems, portals, dashboards, and SaaS products — engineered for reliability and scale.",
    icon: "AppWindow",
    featured: true,
    problem:
      "Off-the-shelf tools force your business into someone else's workflow. Critical processes end up spread across spreadsheets, inboxes, and disconnected tools that don't scale.",
    solution:
      "We design and engineer custom web applications around how your business actually works — with clean architecture, rigorous testing, and a user experience your team and customers will love.",
    benefits: [
      "Software that fits your exact workflow",
      "Real-time dashboards and reporting",
      "Role-based access and audit trails",
      "API-first architecture for future integrations",
      "Scales from ten users to ten thousand",
      "Automated testing that keeps releases safe",
    ],
    outcomes: [
      "Hours of manual work automated every week",
      "A defensible digital asset your business owns",
      "Operational visibility you've never had before",
    ],
    deliverables: [
      "Product discovery & technical specification",
      "UX flows and interface design",
      "Full-stack development & API design",
      "Automated test suite",
      "Deployment pipeline & cloud infrastructure",
      "Ongoing iteration roadmap",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    tagline: "Design that users feel before they think",
    description:
      "Research-driven interface design and design systems that make complex products feel effortless.",
    icon: "PenTool",
    problem:
      "Products fail quietly through friction — confusing flows, inconsistent interfaces, and design decisions made on opinion instead of evidence.",
    solution:
      "Our design practice combines user research, journey mapping, and iterative prototyping with a craft-obsessed visual standard — delivering interfaces that are both beautiful and measurably easier to use.",
    benefits: [
      "Decisions grounded in user research, not guesswork",
      "A complete design system your team can build on",
      "Interactive prototypes before a line of code",
      "Consistent experience across every touchpoint",
      "Accessibility baked into every component",
      "Design-to-development handoff with zero loss",
    ],
    outcomes: [
      "Higher activation and retention metrics",
      "Reduced support tickets from confused users",
      "Faster development with a reusable system",
    ],
    deliverables: [
      "User research & journey maps",
      "Wireframes and interactive prototypes",
      "Complete UI design in Figma",
      "Design system & component library",
      "Usability testing report",
      "Developer handoff package",
    ],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    shortTitle: "Redesign",
    tagline: "Your website, reborn — without losing what works",
    description:
      "Strategic redesigns that modernise your presence while preserving SEO equity and improving every metric that matters.",
    icon: "RefreshCcw",
    problem:
      "An aging website quietly erodes trust and rankings. But a careless redesign can destroy years of SEO equity overnight and confuse loyal customers.",
    solution:
      "We approach redesigns as careful surgery — auditing what works, preserving every ounce of search equity with meticulous redirect mapping, and rebuilding the experience around modern standards and fresh conversion strategy.",
    benefits: [
      "A modern look without losing search rankings",
      "Data-driven decisions from a full UX audit",
      "Dramatically improved speed and Core Web Vitals",
      "Refreshed messaging aligned to today's customer",
      "Zero-downtime migration process",
      "Before/after measurement framework",
    ],
    outcomes: [
      "Improved rankings within 60–90 days",
      "Higher engagement from returning visitors",
      "A site your sales team is proud to share",
    ],
    deliverables: [
      "UX & SEO audit of current site",
      "Redirect & migration strategy",
      "Complete visual redesign",
      "Performance optimization",
      "Analytics comparison dashboard",
      "Post-launch monitoring",
    ],
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    shortTitle: "SEO",
    tagline: "Be found by the customers already looking for you",
    description:
      "Technical and content SEO that compounds — building an organic growth engine instead of renting attention.",
    icon: "TrendingUp",
    problem:
      "Your customers are searching right now, but they're finding your competitors. Technical issues, thin content, and poor structure keep you invisible where it matters most.",
    solution:
      "We fix the technical foundation first — speed, structure, indexability — then build a content strategy around what your customers actually search for, earning rankings that compound month after month.",
    benefits: [
      "Full technical SEO audit and remediation",
      "Keyword strategy mapped to buyer intent",
      "Content architecture that builds topical authority",
      "Local SEO for map and 'near me' searches",
      "Schema markup for rich search results",
      "Transparent monthly reporting",
    ],
    outcomes: [
      "First-page rankings for revenue keywords",
      "Compounding organic traffic growth",
      "Reduced dependence on paid advertising",
    ],
    deliverables: [
      "Technical SEO audit & fixes",
      "Keyword & competitor research",
      "On-page optimization",
      "Content strategy & calendar",
      "Schema & structured data setup",
      "Monthly performance reports",
    ],
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    shortTitle: "Performance",
    tagline: "Every millisecond is money",
    description:
      "Core Web Vitals optimization that turns slow sites into instant experiences — protecting revenue and rankings.",
    icon: "Gauge",
    problem:
      "A one-second delay in load time can cut conversions by 7%. Slow sites rank lower, convert worse, and frustrate the customers you worked hard to attract.",
    solution:
      "We perform deep performance engineering — image pipelines, code splitting, edge caching, database optimization — and hold ourselves to measurable Core Web Vitals targets.",
    benefits: [
      "Green Core Web Vitals across key pages",
      "50–80% reduction in load times",
      "Optimized images, fonts, and scripts",
      "Edge caching for instant global delivery",
      "Reduced hosting and bandwidth costs",
      "Ongoing performance monitoring",
    ],
    outcomes: [
      "Measurable lift in conversion rate",
      "Improved search rankings from better vitals",
      "Lower bounce rates on mobile networks",
    ],
    deliverables: [
      "Full performance audit",
      "Core Web Vitals remediation",
      "Asset optimization pipeline",
      "Caching & CDN configuration",
      "Performance budget setup",
      "Monitoring dashboard",
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    shortTitle: "Maintenance",
    tagline: "Sleep well — we've got your website covered",
    description:
      "Proactive care plans that keep your website secure, updated, fast, and improving every single month.",
    icon: "ShieldCheck",
    problem:
      "Websites decay. Plugins fall out of date, security holes open, content goes stale, and small issues compound into emergencies at the worst possible moment.",
    solution:
      "Our care plans provide proactive monitoring, security patching, backups, and a dedicated improvement budget — so your website gets better every month instead of slowly falling apart.",
    benefits: [
      "24/7 uptime and security monitoring",
      "Daily backups with rapid restore",
      "Monthly updates and health checks",
      "Priority support with guaranteed response times",
      "Small design & content updates included",
      "Quarterly strategy reviews",
    ],
    outcomes: [
      "Zero emergency incidents from neglected updates",
      "A website that continuously improves",
      "Complete peace of mind",
    ],
    deliverables: [
      "Monitoring & alerting setup",
      "Monthly maintenance reports",
      "Update & patch management",
      "Backup & disaster recovery",
      "Content update allowance",
      "Quarterly performance review",
    ],
  },
  {
    slug: "digital-consultation",
    title: "Digital Consultation",
    shortTitle: "Consultation",
    tagline: "Senior thinking before you spend a rupee on building",
    description:
      "Strategic guidance on technology, digital marketing, and product decisions — from a team that ships.",
    icon: "Lightbulb",
    problem:
      "Technology decisions are expensive to get wrong. Without experienced guidance, businesses overbuild, underinvest, or choose tools they'll outgrow within a year.",
    solution:
      "We bring a decade of shipping experience to your biggest digital decisions — auditing your current state, mapping opportunities, and delivering a prioritised roadmap you can execute with confidence.",
    benefits: [
      "Independent, vendor-neutral advice",
      "A clear, prioritised digital roadmap",
      "Honest build-vs-buy analysis",
      "Budget planning with realistic estimates",
      "Technology stack recommendations",
      "A senior sounding board on demand",
    ],
    outcomes: [
      "Confident, evidence-based decisions",
      "Avoided costly wrong turns",
      "A roadmap your whole team believes in",
    ],
    deliverables: [
      "Digital maturity audit",
      "Opportunity & gap analysis",
      "Prioritised roadmap",
      "Technology recommendations",
      "Budget & timeline planning",
      "Follow-up advisory sessions",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

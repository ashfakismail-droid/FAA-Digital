import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    icon: "Search",
    description:
      "We immerse ourselves in your business — your customers, your competitors, and the outcomes that actually matter to you. No assumptions, no templates, just honest questions and careful listening.",
    activities: [
      "Stakeholder interviews & goal alignment",
      "Business and customer research",
      "Technical and content audit",
      "Success metrics definition",
    ],
    deliverable: "Discovery brief with goals, scope & success metrics",
  },
  {
    number: "02",
    title: "Research",
    duration: "Week 1–2",
    icon: "Microscope",
    description:
      "We study your market like anthropologists — how your customers search, decide, and buy, and precisely where your competitors are vulnerable. Strategy built on evidence, not opinions.",
    activities: [
      "Customer journey & behaviour analysis",
      "Competitive landscape teardown",
      "Keyword & search-intent mapping",
      "Content gap analysis",
    ],
    deliverable: "Research report with strategic opportunities",
  },
  {
    number: "03",
    title: "Planning",
    duration: "Week 2",
    icon: "Map",
    description:
      "Research becomes architecture. We define the sitemap, user flows, content strategy, and technical stack — a complete blueprint everyone signs off on before design begins.",
    activities: [
      "Information architecture & sitemap",
      "User flow design",
      "Content strategy & messaging hierarchy",
      "Technical architecture & stack selection",
    ],
    deliverable: "Project blueprint: sitemap, flows & technical spec",
  },
  {
    number: "04",
    title: "Wireframing",
    duration: "Week 3",
    icon: "PenLine",
    description:
      "Structure before style. We wireframe every key page to nail layout, hierarchy, and conversion flow — so design decisions are validated in days, not discovered as mistakes in development.",
    activities: [
      "Low-fidelity wireframes for key pages",
      "Conversion-path mapping",
      "Content placement & hierarchy",
      "Stakeholder review & iteration",
    ],
    deliverable: "Approved wireframes for all key templates",
  },
  {
    number: "05",
    title: "UI Design",
    duration: "Week 3–5",
    icon: "Palette",
    description:
      "Where craft meets strategy. We design a bespoke visual language — typography, colour, motion, and components — then apply it across every screen with obsessive attention to detail.",
    activities: [
      "Visual direction & moodboards",
      "Design system: type, colour, components",
      "High-fidelity designs for all pages",
      "Interactive prototypes & motion design",
    ],
    deliverable: "Complete design system & high-fidelity designs",
  },
  {
    number: "06",
    title: "Development",
    duration: "Week 5–8",
    icon: "Code2",
    description:
      "Designs become reality with pixel-perfect fidelity. Clean, typed, tested code on modern infrastructure — with a staging environment you can watch evolve daily.",
    activities: [
      "Component-driven frontend development",
      "CMS & backend integration",
      "Performance engineering from day one",
      "Weekly staging reviews with your team",
    ],
    deliverable: "Fully functional site on staging environment",
  },
  {
    number: "07",
    title: "Testing",
    duration: "Week 8–9",
    icon: "FlaskConical",
    description:
      "We try to break everything before your visitors can. Cross-device, cross-browser, accessibility, performance, and content — a structured QA gauntlet with zero tolerance for rough edges.",
    activities: [
      "Cross-browser & device testing",
      "Accessibility audit (WCAG 2.2 AA)",
      "Performance & Core Web Vitals verification",
      "Content, SEO & analytics QA",
    ],
    deliverable: "QA report with all issues resolved",
  },
  {
    number: "08",
    title: "Launch",
    duration: "Week 9",
    icon: "Rocket",
    description:
      "A choreographed, zero-downtime launch — DNS, redirects, monitoring, and rollback plans all rehearsed. Then we watch the real-world data confirm what we built.",
    activities: [
      "Pre-launch checklist & rollback plan",
      "Zero-downtime deployment",
      "Redirect & SEO verification",
      "Launch-day monitoring",
    ],
    deliverable: "Live website with monitoring in place",
  },
  {
    number: "09",
    title: "Support & Growth",
    duration: "Ongoing",
    icon: "TrendingUp",
    description:
      "Launch is the starting line. We monitor, maintain, and continuously improve — turning your website from a project into a compounding business asset.",
    activities: [
      "Proactive monitoring & maintenance",
      "Monthly performance reports",
      "Conversion optimization experiments",
      "Quarterly strategy reviews",
    ],
    deliverable: "Care plan with continuous improvement",
  },
];

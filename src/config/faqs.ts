import type { FaqCategory } from "@/types";

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        question: "What does FAA Digital actually do?",
        answer:
          "We design and build premium digital experiences — business websites, e-commerce stores, booking platforms, and custom web applications. Everything is handled in-house: strategy, design, development, SEO, and ongoing support. Think of us as your complete digital team.",
      },
      {
        question: "What kinds of businesses do you work with?",
        answer:
          "We specialise in service and experience businesses — restaurants, hotels, clinics, real estate, retail, construction, professional services, and startups. If your customers research you online before buying, we know how to win that moment.",
      },
      {
        question: "Do you work with clients outside India?",
        answer:
          "Yes. Around 40% of our clients are international — across the US, UK, UAE, Singapore, and Australia. Our process is built for remote collaboration with clear milestones, weekly video check-ins, and a shared project dashboard.",
      },
      {
        question: "How do we get started?",
        answer:
          "Start with a free 30-minute discovery call. We'll discuss your goals, audit your current presence, and give you honest advice — including a fixed-scope proposal with timeline and investment. No pressure, no obligation.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Timeline",
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "Projects typically range from ₹1.5L for a focused business website to ₹15L+ for custom platforms and web applications. After a discovery call, you receive a fixed-price proposal — the number we quote is the number you pay, with no surprise invoices.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "A premium business website takes 4–6 weeks. E-commerce and booking platforms typically take 8–12 weeks. Custom web applications are scoped individually. We share a detailed timeline before starting and hit our dates — 96% of projects launch on or before schedule.",
      },
      {
        question: "What are your payment terms?",
        answer:
          "Standard terms are 40% to begin, 40% at design approval, and 20% at launch. For larger projects we structure milestone-based payments. We never hold your site hostage — you own everything, always.",
      },
      {
        question: "Are there ongoing costs after launch?",
        answer:
          "Only what you choose. Hosting is typically ₹500–2,000/month depending on scale. Our optional care plans (from ₹8,000/month) cover maintenance, updates, monitoring, and continuous improvements. Many clients start without one and add it later.",
      },
    ],
  },
  {
    id: "process",
    label: "Process & Delivery",
    items: [
      {
        question: "What does your process look like?",
        answer:
          "Nine clear phases: Discovery, Research, Planning, Wireframing, UI Design, Development, Testing, Launch, and ongoing Support. You approve work at every gate — nothing moves forward without your sign-off. See our Process page for the full breakdown.",
      },
      {
        question: "How involved do we need to be?",
        answer:
          "Plan for about 2–3 hours per week: a weekly review call plus feedback on deliverables. We handle everything else. The most successful projects have one empowered decision-maker on your side — we'll help you structure that.",
      },
      {
        question: "Can you work with our existing brand?",
        answer:
          "Absolutely. We can work within existing brand guidelines, evolve them where they're weak, or build a complete visual identity from scratch. Most clients land somewhere in the middle — keeping what works, elevating what doesn't.",
      },
      {
        question: "Who writes the content?",
        answer:
          "We can work with your existing content, polish what you have, or write everything from scratch with our copywriting team. Most clients choose our collaborative approach: we interview you, extract your expertise, and craft it into conversion-focused copy.",
      },
      {
        question: "What if we don't like the design?",
        answer:
          "It rarely happens — because you approve direction early through moodboards and wireframes, long before detailed design. Every design phase includes structured revision rounds, and we iterate until you're genuinely proud of it.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    items: [
      {
        question: "What technology do you build with?",
        answer:
          "Modern, proven stacks — typically Next.js, TypeScript, and Tailwind CSS on the frontend, with headless CMS platforms for content and battle-tested services for commerce, bookings, and databases. We choose boring, reliable technology over shiny experiments.",
      },
      {
        question: "Will we be able to update the site ourselves?",
        answer:
          "Yes — every site includes a content management system designed for non-technical teams. Update text, images, menus, prices, and pages yourself. We provide recorded training and written documentation, and we're always a message away.",
      },
      {
        question: "Do we own our website?",
        answer:
          "Completely. You own the code, the design files, the content, the domain, and the hosting accounts. Everything is registered in your name. If you ever want to move elsewhere, we'll help with the handover — though almost nobody does.",
      },
      {
        question: "Will our website be fast and mobile-friendly?",
        answer:
          "Speed is a feature we engineer for, not hope for. We target 90+ Lighthouse scores and sub-2-second loads on real mobile networks. Every site is designed mobile-first, because that's where most of your customers are.",
      },
      {
        question: "Can you integrate with our existing tools?",
        answer:
          "Almost certainly. We regularly integrate CRMs, booking systems, payment gateways, email platforms, ERPs, and custom APIs. If it has an API — or even if it doesn't — we'll find a way to connect it.",
      },
    ],
  },
  {
    id: "seo",
    label: "SEO & Marketing",
    items: [
      {
        question: "Will our website rank on Google?",
        answer:
          "Every site we build includes technical SEO foundations: semantic structure, metadata, schema markup, sitemaps, and speed optimization. Ranking for competitive terms takes ongoing effort — our SEO programmes typically show meaningful results within 3–6 months.",
      },
      {
        question: "Do you offer ongoing SEO services?",
        answer:
          "Yes. Our growth retainers combine technical SEO, content strategy, and local search optimization. We focus on keywords that drive revenue, not vanity rankings, and report in plain language every month.",
      },
      {
        question: "Can you help with Google Ads or social media?",
        answer:
          "We focus on what we do best: websites that convert and organic growth that compounds. For paid media, we partner with trusted specialists and ensure your landing pages and tracking are perfectly set up for their campaigns.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & Maintenance",
    items: [
      {
        question: "What happens after the website launches?",
        answer:
          "Every project includes 30 days of complimentary support for fixes and adjustments. After that, most clients choose a care plan covering updates, security, backups, monitoring, and a monthly improvement allowance.",
      },
      {
        question: "What if something breaks?",
        answer:
          "Care-plan clients get priority support with guaranteed response times — critical issues within 4 business hours. Our sites rarely break (modern architecture, automated monitoring), but if they do, fixing it is our problem, not yours.",
      },
      {
        question: "Can you maintain a website you didn't build?",
        answer:
          "Usually, yes. We start with a technical audit to understand what we're inheriting. If the foundation is sound, we'll maintain and improve it. If it's held together with duct tape, we'll tell you honestly and recommend the most cost-effective path.",
      },
    ],
  },
];

export const allFaqs = faqCategories.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.label }))
);

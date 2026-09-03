export interface TechItem {
  name: string;
  category: string;
  blurb: string;
}

export const techStack: TechItem[] = [
  { name: "Next.js", category: "Frontend", blurb: "React framework for blazing-fast, SEO-friendly experiences" },
  { name: "React", category: "Frontend", blurb: "Component-driven interfaces that scale with your product" },
  { name: "TypeScript", category: "Frontend", blurb: "Type-safe code that catches bugs before your users do" },
  { name: "Tailwind CSS", category: "Frontend", blurb: "Design systems translated into consistent, maintainable UI" },
  { name: "Framer Motion", category: "Frontend", blurb: "Purposeful animation that guides attention" },
  { name: "Node.js", category: "Backend", blurb: "Reliable APIs and services built for scale" },
  { name: "PostgreSQL", category: "Backend", blurb: "Rock-solid data layer for serious applications" },
  { name: "Redis", category: "Backend", blurb: "Sub-millisecond caching for instant experiences" },
  { name: "Sanity CMS", category: "Content", blurb: "Structured content your team will actually enjoy editing" },
  { name: "Shopify", category: "Commerce", blurb: "Battle-tested commerce engine behind bespoke storefronts" },
  { name: "Stripe", category: "Commerce", blurb: "Payments that just work, globally" },
  { name: "Vercel", category: "Infrastructure", blurb: "Edge deployment for instant global performance" },
  { name: "AWS", category: "Infrastructure", blurb: "Enterprise infrastructure when projects demand it" },
  { name: "Docker", category: "Infrastructure", blurb: "Reproducible environments from laptop to production" },
  { name: "Figma", category: "Design", blurb: "Where every pixel is designed before it's built" },
  { name: "Playwright", category: "Quality", blurb: "Automated testing that keeps releases safe" },
];

export const techCategories = Array.from(new Set(techStack.map((t) => t.category)));

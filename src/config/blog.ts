import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-business-website-isnt-converting",
    title: "Why Your Business Website Isn't Converting (And How to Fix It)",
    excerpt:
      "Your website gets traffic but no enquiries. Here are the seven conversion killers we find in almost every audit — and the exact fixes that turn visitors into customers.",
    category: "Conversion",
    tags: ["CRO", "Web Design", "Business Growth"],
    author: { name: "Arjun Kapoor", role: "Founder & Creative Director", initials: "AK" },
    date: "2026-06-18",
    readingTime: 9,
    icon: "TrendingUp",
    featured: true,
    content: {
      intro:
        "Most business websites don't have a traffic problem — they have a trust problem. Visitors arrive, scan for a few seconds, can't find a reason to believe, and leave. After auditing hundreds of business websites, we've found the same seven issues appearing again and again. The good news: every one of them is fixable.",
      sections: [
        {
          heading: "1. Your headline talks about you, not them",
          body: "The most common mistake: a homepage headline like 'Welcome to ABC Enterprises, established 1998.' Visitors don't care about your history yet — they care about their problem. Your headline should complete the sentence 'We help [who] achieve [what]' in language your customer would actually use. Test: read your headline aloud to a stranger. Can they tell you what you sell and who it's for?",
        },
        {
          heading: "2. There's no clear next step",
          body: "Every page needs one primary action, visually dominant and repeated at natural decision points. 'Contact us' buried in a navigation bar is not a strategy. If your visitor has to think about what to do next, they won't do anything. One page, one job: book a call, request a quote, or buy the product.",
        },
        {
          heading: "3. Social proof is missing or buried",
          body: "92% of buyers read reviews before purchasing. Yet most business websites hide testimonials on a dedicated page nobody visits. Proof belongs at every decision point: beside your headline, next to your pricing, and immediately before every call to action. Real names, real companies, real numbers — specificity is credibility.",
        },
        {
          heading: "4. Your site is slow — and mobile is an afterthought",
          body: "More than 60% of your visitors are on phones, often on mediocre connections. A site that takes five seconds to load loses half its audience before a single word is read. Run your site through PageSpeed Insights. If your mobile score is under 70, speed is your cheapest conversion win.",
        },
        {
          heading: "5. You're answering questions nobody is asking",
          body: "Visitors arrive with silent questions: What does it cost? How long does it take? What if it goes wrong? Websites that answer these questions honestly convert dramatically better than those that hide behind 'Contact us for pricing.' Transparency filters out bad-fit leads and builds trust with good ones.",
        },
        {
          heading: "6. The design undermines the message",
          body: "Visitors judge credibility in 50 milliseconds — before reading a word. Dated templates, stock photography, and inconsistent typography silently communicate that details don't matter to you. You don't need avant-garde design; you need design that looks like you care.",
        },
        {
          heading: "7. Nobody is following up",
          body: "Even a perfect website converts only a fraction of ready buyers. Enquiry forms without autoresponders, quotes without follow-ups, and abandoned checkouts without reminders leave enormous revenue on the table. The fix is usually automation, not more traffic.",
        },
      ],
      takeaways: [
        "Rewrite your headline around the customer's outcome, not your company",
        "Give every page one dominant, repeated call to action",
        "Move testimonials and proof next to every decision point",
        "Fix mobile load speed before spending another rupee on traffic",
        "Answer pricing and process questions honestly on the page",
        "Automate follow-up for every enquiry channel",
      ],
    },
  },
  {
    slug: "complete-guide-to-local-seo",
    title: "The Complete Guide to Local SEO for Service Businesses",
    excerpt:
      "When someone searches 'dentist near me' or 'best restaurant in Indiranagar', the map pack decides who gets the customer. Here's how to win it.",
    category: "SEO",
    tags: ["Local SEO", "Google Business", "Marketing"],
    author: { name: "Meera Nair", role: "Head of Growth", initials: "MN" },
    date: "2026-05-27",
    readingTime: 11,
    icon: "MapPin",
    featured: true,
    content: {
      intro:
        "For local businesses, Google is the new high street. 46% of all searches have local intent, and the top three map results capture the overwhelming majority of clicks. Local SEO isn't mysterious — it's a system of deliberate, compounding actions. This is the complete playbook we use for our clients.",
      sections: [
        {
          heading: "Your Google Business Profile is your second homepage",
          body: "For many customers, your GBP listing is the entire decision: photos, reviews, hours, and a call button. Complete every field, choose precise categories, upload real photos monthly, and post updates weekly. Businesses with complete profiles are 70% more likely to attract location visits — this is the highest-ROI hour in local marketing.",
        },
        {
          heading: "Reviews are the ranking factor you control",
          body: "Review quantity, velocity, and recency all influence map pack rankings — and reviews convert browsers even when you're not first. Build a system: ask every happy customer at the moment of peak satisfaction, make it a one-tap process, and respond to every review within 48 hours. Never buy reviews; Google's detection is ruthless and the penalty is permanent.",
        },
        {
          heading: "Build pages for services and locations, not just a homepage",
          body: "A single homepage cannot rank for 'root canal Indiranagar', 'teeth whitening Bengaluru', and 'dental implants near me' simultaneously. Create a dedicated, substantive page for each service — and if you serve multiple areas, for each location. Each page needs unique, genuinely helpful content, not the same text with city names swapped.",
        },
        {
          heading: "Citations and NAP consistency",
          body: "Your Name, Address, and Phone number must be identical everywhere: your website, GBP, directories, and social profiles. Inconsistencies erode Google's confidence in your data. Audit your top 20 citations annually and fix discrepancies — it's tedious and it works.",
        },
        {
          heading: "Local schema markup",
          body: "Structured data tells Google exactly what your business is, where it is, and when it's open. LocalBusiness schema on your contact page, service schema on service pages, and review schema where appropriate. It takes a developer an hour and clarifies everything for the algorithm.",
        },
        {
          heading: "Content that answers local questions",
          body: "The businesses that dominate local search publish content their customers actually search for: pricing guides, 'what to expect' articles, and local comparisons. A physiotherapy clinic ranking for 'how much does physio cost in Bengaluru' captures buyers at the exact moment of intent.",
        },
      ],
      takeaways: [
        "Treat your Google Business Profile as a second homepage — complete it fully",
        "Build a systematic, honest review generation engine",
        "Create dedicated pages for every service and service area",
        "Keep your name, address, and phone identical everywhere",
        "Implement LocalBusiness schema markup",
        "Publish content that answers real local questions",
      ],
    },
  },
  {
    slug: "website-redesign-checklist-2026",
    title: "The 2026 Website Redesign Checklist: 27 Things to Get Right",
    excerpt:
      "A redesign done wrong can destroy years of SEO equity overnight. This is the exact checklist our team runs before, during, and after every redesign project.",
    category: "Strategy",
    tags: ["Redesign", "SEO", "Project Management"],
    author: { name: "Arjun Kapoor", role: "Founder & Creative Director", initials: "AK" },
    date: "2026-04-30",
    readingTime: 10,
    icon: "ClipboardCheck",
    featured: true,
    content: {
      intro:
        "A website redesign is open-heart surgery on your digital presence. Done well, it's transformative. Done carelessly, it can erase years of search equity in an afternoon. This is the checklist our team has refined across a hundred redesigns — use it whether you work with us or not.",
      sections: [
        {
          heading: "Before you design a single pixel",
          body: "Audit what you have: crawl the current site, document every URL, export your analytics, and identify your top pages by traffic, conversions, and backlinks. These pages are assets — the redesign must protect them ruthlessly. Define success metrics now, or you'll never know if the redesign worked.",
        },
        {
          heading: "The redirect map is sacred",
          body: "Every URL that changes needs a 301 redirect to its new home — every single one. Losing track here is how businesses wake up to find their rankings gone. Build the redirect map from your crawl, test every redirect on staging, and monitor 404s aggressively for 90 days after launch.",
        },
        {
          heading: "Preserve your on-page SEO",
          body: "Title tags, meta descriptions, and heading structure on ranking pages shouldn't change without deliberate reason. New design, same SEO fundamentals — unless your audit identified specific improvements. Carry over schema markup, alt text, and internal links systematically.",
        },
        {
          heading: "Performance is a launch requirement, not a phase-2 wish",
          body: "Beautiful redesigns routinely ship slower than the sites they replaced — unoptimized hero images, third-party scripts, and animation libraries compound into a sluggish experience. Set a performance budget before design begins: LCP under 2.5 seconds, total page weight under 1.5MB. Enforce it in review.",
        },
        {
          heading: "The staging gauntlet",
          body: "Test on real devices, not just browser resize. Every form submitted, every integration verified, every redirect checked, every page proofread. Accessibility audit against WCAG 2.2 AA. Analytics firing correctly with conversion events mapped. Launch only when the checklist is genuinely complete — not when the calendar says so.",
        },
        {
          heading: "Launch week protocol",
          body: "Launch early in the week, never Friday. Submit the new sitemap to Search Console immediately. Watch analytics, 404 reports, and conversion data daily for two weeks. Something will slip through — the teams that win are the ones watching closely enough to catch it in hours, not months.",
        },
      ],
      takeaways: [
        "Crawl and document your current site before touching anything",
        "Build and test a complete 301 redirect map",
        "Preserve on-page SEO on pages that already rank",
        "Set and enforce a performance budget from day one",
        "Complete the full staging QA checklist before launch",
        "Monitor aggressively for two weeks post-launch",
      ],
    },
  },
  {
    slug: "how-much-should-a-website-cost",
    title: "How Much Should a Website Actually Cost in 2026?",
    excerpt:
      "₹15,000 templates to ₹15L custom platforms — the website market is confusing. Here's an honest breakdown of what you get at every price point.",
    category: "Business",
    tags: ["Pricing", "Buying Guide"],
    author: { name: "Meera Nair", role: "Head of Growth", initials: "MN" },
    date: "2026-03-21",
    readingTime: 8,
    icon: "Banknote",
    content: {
      intro:
        "Ask five agencies what a website costs and you'll get five wildly different answers. The confusion isn't accidental — 'a website' can mean anything from a weekend template install to a six-month engineering programme. Here's an honest map of the market, from someone who sells at the premium end but will tell you when you don't need it.",
      sections: [
        {
          heading: "₹10,000–50,000: The template tier",
          body: "A freelancer installs a theme, swaps in your logo and text, and hands over the keys. Perfectly legitimate for a brand-new business validating an idea. Understand what you're getting: generic design, no strategy, minimal SEO, and a site identical to thousands of others. Fine as a placeholder; insufficient as a growth asset.",
        },
        {
          heading: "₹50,000–1,50,000: The customised tier",
          body: "A small studio customises a framework with some original design. Quality varies enormously at this price — the best deliver genuine value, the worst deliver templates with premium invoices. Ask to see live sites, check their mobile speed, and be suspicious of anyone who doesn't ask about your business goals.",
        },
        {
          heading: "₹1,50,000–5,00,000: The professional tier",
          body: "This is where strategy enters: discovery, bespoke design, conversion copywriting, performance engineering, and SEO foundations. A website at this tier is built to generate measurable returns — enquiries, bookings, sales. For most established service businesses, this is the correct investment, with typical payback in 6–12 months.",
        },
        {
          heading: "₹5,00,000+: The platform tier",
          body: "E-commerce with serious catalogues, booking engines, customer portals, web applications — software that runs part of your business. At this level you're buying engineering, not pages: architecture, integrations, testing, and a partner for the long term.",
        },
        {
          heading: "The cost nobody quotes: ownership",
          body: "Whatever you spend, understand the ongoing economics: hosting, maintenance, updates, and improvements. A ₹3L website with no maintenance budget decays within two years. Budget 15–25% of build cost annually for care — or accept that you're buying a depreciating asset.",
        },
        {
          heading: "How to choose",
          body: "Match the investment to the value of a customer. If one new patient is worth ₹50,000 in lifetime value, a website that brings five extra patients a month pays for a premium build in weeks. If you're testing an unproven idea, start lean. The mistake isn't spending too much or too little — it's spending without connecting the number to a business outcome.",
        },
      ],
      takeaways: [
        "Match website investment to customer lifetime value",
        "Templates validate ideas; custom builds grow businesses",
        "Demand strategy and goals discussion at every tier",
        "Budget 15–25% of build cost annually for maintenance",
        "The right question isn't 'what does it cost' but 'what does it return'",
      ],
    },
  },
  {
    slug: "core-web-vitals-guide-for-business-owners",
    title: "Core Web Vitals Explained for Business Owners (No Jargon)",
    excerpt:
      "Google ranks fast sites higher and customers buy more from them. Here's what Core Web Vitals actually mean for your business, in plain language.",
    category: "Performance",
    tags: ["Core Web Vitals", "Speed", "SEO"],
    author: { name: "Rohan Verma", role: "Lead Engineer", initials: "RV" },
    date: "2026-02-14",
    readingTime: 7,
    icon: "Gauge",
    content: {
      intro:
        "Core Web Vitals are Google's way of measuring whether your website feels fast and stable. They affect your search rankings and — more importantly — your revenue. Here's what they are, why they matter, and what to do about them, without a single acronym left unexplained.",
      sections: [
        {
          heading: "The three measurements that matter",
          body: "LCP (Largest Contentful Paint) measures how long your main content takes to appear — aim for under 2.5 seconds. INP (Interaction to Next Paint) measures how quickly your site responds when someone taps or clicks — under 200 milliseconds. CLS (Cumulative Layout Shift) measures whether things jump around while loading — near zero. That's it: how fast it appears, how fast it responds, how stable it is.",
        },
        {
          heading: "Why Google cares (and why you should)",
          body: "Google's job is sending users to good experiences. Slow, janky sites make Google look bad, so they rank lower — Core Web Vitals are an official ranking factor. But the business case is stronger than the SEO case: every additional second of load time cuts conversions measurably. Amazon famously calculated that 100 milliseconds of delay costs 1% of sales.",
        },
        {
          heading: "The usual suspects",
          body: "Almost every slow business website suffers from the same handful of problems: enormous unoptimized images (the single biggest culprit), cheap shared hosting, too many third-party scripts, and page builders generating bloated code. Each is fixable; none requires rebuilding your business.",
        },
        {
          heading: "How to check your site right now",
          body: "Go to PageSpeed Insights, enter your URL, and look at the mobile score — not desktop, because most of your customers are on phones. Under 50 means you're losing measurable revenue daily. 50–80 means meaningful gains are available. Above 90 means your technical foundation is solid.",
        },
        {
          heading: "What fixing it looks like",
          body: "A performance engagement typically runs 2–4 weeks: image pipeline optimization, hosting improvements, script auditing, and code cleanup. Results are measurable within days and permanent — unlike content, speed improvements don't decay. It's among the highest-ROI technical investments a business website can make.",
        },
      ],
      takeaways: [
        "Core Web Vitals measure speed, responsiveness, and visual stability",
        "They're a Google ranking factor and a conversion factor",
        "Images, hosting, and third-party scripts cause most problems",
        "Test your mobile score on PageSpeed Insights today",
        "Speed improvements are permanent and measurable",
      ],
    },
  },
  {
    slug: "booking-systems-guide",
    title: "From Phone Tag to Booked Solid: A Guide to Online Booking Systems",
    excerpt:
      "Restaurants, clinics, salons, hotels — every appointment business loses revenue to phone tag. Here's how to choose and implement a booking system that pays for itself.",
    category: "Business",
    tags: ["Booking Systems", "Automation", "Operations"],
    author: { name: "Rohan Verma", role: "Lead Engineer", initials: "RV" },
    date: "2026-01-09",
    readingTime: 8,
    icon: "CalendarCheck",
    content: {
      intro:
        "Every missed call is a missed booking. Every game of phone tag is a customer who gave up and booked your competitor. Online booking isn't a convenience feature anymore — it's core revenue infrastructure. Here's how to get it right.",
      sections: [
        {
          heading: "The true cost of phone bookings",
          body: "Count it honestly: staff hours on scheduling calls, no-shows from unreminded customers, after-hours enquiries that went to competitors, and double-bookings from manual diaries. For most appointment businesses, this quietly costs 10–20% of potential revenue. Automation addresses every one of these leaks.",
        },
        {
          heading: "Build vs. buy: the honest framework",
          body: "Off-the-shelf tools (Calendly, SimplyBook, industry-specific platforms) work brilliantly for simple scheduling — start there. Custom booking engines make sense when your rules are unique: complex resource allocation, multi-step services, deposits and dynamic pricing, or deep integration with your operations. The mistake is building custom before outgrowing off-the-shelf.",
        },
        {
          heading: "The features that actually matter",
          body: "Real-time availability (not 'we'll confirm by email'), automated reminders by SMS and WhatsApp (the single biggest no-show killer), easy rescheduling without a phone call, and deposits for high-value slots. Everything else is secondary. Fancy features that add friction lose more bookings than they create.",
        },
        {
          heading: "Booking is a conversion flow, not a form",
          body: "Treat your booking flow like checkout: minimal steps, guest-friendly (no forced account creation), total clarity on duration and price, and instant confirmation with calendar integration. We routinely see 40%+ completion lifts from flow redesign alone — with zero change in traffic.",
        },
        {
          heading: "Implementation realities",
          body: "The technology is the easy part. Success requires operational buy-in: staff trained to trust the system, availability kept accurate, and phone bookings entered into the same calendar. A booking system is only as good as the single source of truth behind it.",
        },
      ],
      takeaways: [
        "Phone-based booking quietly leaks 10–20% of potential revenue",
        "Start with off-the-shelf; build custom when rules genuinely demand it",
        "Automated reminders are the highest-ROI feature",
        "Design the booking flow like a checkout, not a contact form",
        "One calendar must be the single source of truth",
      ],
    },
  },
  {
    slug: "hotel-direct-bookings-playbook",
    title: "The Hotel Direct Bookings Playbook: Escaping OTA Dependency",
    excerpt:
      "OTAs take 15–25% of every booking and own your guest relationships. Here's the proven playbook for shifting your channel mix toward direct.",
    category: "Industry",
    tags: ["Hotels", "Hospitality", "Direct Bookings"],
    author: { name: "Meera Nair", role: "Head of Growth", initials: "MN" },
    date: "2025-12-05",
    readingTime: 10,
    icon: "Hotel",
    content: {
      intro:
        "Online travel agencies are a wonderful acquisition channel and a terrible business model — for hotels. Every OTA booking costs 15–25% commission and, worse, the guest relationship belongs to the platform, not to you. Here's how hotels systematically shift the balance without sacrificing occupancy.",
      sections: [
        {
          heading: "Understand what you're actually paying",
          body: "Calculate your true OTA cost: commission percentage × booking value × annual OTA bookings. For a 60-room boutique hotel, this routinely exceeds ₹40–60 lakh per year — enough to fund an exceptional direct-booking platform many times over. You can't manage what you don't measure.",
        },
        {
          heading: "Your booking experience must beat the OTA's",
          body: "Guests book through OTAs because it's fast, clear, and trustworthy. Your direct channel must match or exceed that standard: sub-second page loads, total price shown upfront, a one-page checkout, and instant confirmation. If booking direct is harder than booking through an OTA, all other tactics fail.",
        },
        {
          heading: "Give guests a reason that matters to them",
          body: "Best-rate guarantees are table stakes. Real direct-booking incentives: flexible cancellation only on direct bookings, room upgrades when available, late checkout, or a welcome amenity. The perceived value of these perks far exceeds their cost — and they make 'book direct' a rational choice, not a favour.",
        },
        {
          heading: "Own the guest relationship",
          body: "Every OTA guest should leave as your guest: collect email at check-in (with a genuine value exchange), deliver an exceptional stay, then run post-stay email flows with direct-booking offers for their next visit. A guest who booked via OTA once and direct forever after is a profitable outcome.",
        },
        {
          heading: "Metasearch levels the playing field",
          body: "Google Hotel Ads and metasearch platforms let your direct rate appear alongside OTA prices at the moment of comparison — usually at lower cost-per-acquisition than OTA commissions. For most properties, this is the fastest measurable win in the entire playbook.",
        },
        {
          heading: "Play the long game",
          body: "Channel shift is measured in quarters, not weeks. Track direct percentage monthly, expect 2–4 points of improvement per quarter with sustained effort, and don't panic at short-term OTA volume dips. The destination — 50%+ direct — is worth years of commission savings and a guest database you actually own.",
        },
      ],
      takeaways: [
        "Calculate your true annual OTA commission cost",
        "Match the OTA booking experience before anything else",
        "Offer direct-only perks guests actually value",
        "Convert OTA guests into owned relationships at check-in",
        "Use metasearch to compete at the moment of comparison",
        "Measure channel mix quarterly and commit to the long game",
      ],
    },
  },
  {
    slug: "restaurant-website-essentials",
    title: "9 Things Every Restaurant Website Must Have in 2026",
    excerpt:
      "77% of diners check a restaurant's website before visiting. Here's exactly what separates restaurant websites that fill tables from those that send customers elsewhere.",
    category: "Industry",
    tags: ["Restaurants", "Web Design", "Local SEO"],
    author: { name: "Arjun Kapoor", role: "Founder & Creative Director", initials: "AK" },
    date: "2025-11-12",
    readingTime: 7,
    icon: "UtensilsCrossed",
    content: {
      intro:
        "Your restaurant's website is your digital front door — and most diners check it before deciding where to eat. Yet the majority of restaurant websites fail at the basics: menus locked in PDFs, no reservation system, and photography that undersells the food. Here are the nine essentials, in priority order.",
      sections: [
        {
          heading: "1–3: The non-negotiables",
          body: "One: a mobile-friendly HTML menu — never a PDF — that's readable in sunlight and updated the day a dish changes. Two: online reservations with instant confirmation; every phone-only booking requirement loses tables. Three: location, hours, and contact visible within seconds on every page, with a tap-to-call button and map link.",
        },
        {
          heading: "4–6: The trust builders",
          body: "Four: real photography of your food and space — diners can smell stock photos, and dark, dated phone snaps are worse than none. Five: genuine reviews and press mentions, pulled in live where possible. Six: your story, briefly told — why this restaurant exists. In a market of interchangeable options, story is differentiation.",
        },
        {
          heading: "7–9: The revenue drivers",
          body: "Seven: private dining and events information with a structured enquiry form — group bookings are high-margin and high-intent. Eight: gift cards, purchasable online in under a minute; they're pure cash flow and your best customers' favourite gift. Nine: local SEO foundations — schema markup, Google Business integration, and pages that rank for 'cuisine + neighbourhood' searches.",
        },
        {
          heading: "What to skip",
          body: "Auto-playing music (always), splash intro screens (always), and a separate mobile site (it's 2026). Skip the gallery page that duplicates Instagram — embed your feed instead. And skip anything that delays a hungry visitor from menu, booking, or directions by even one click.",
        },
      ],
      takeaways: [
        "HTML menu, online reservations, and instant contact info come first",
        "Real photography and genuine reviews build trust",
        "Private dining, gift cards, and local SEO drive incremental revenue",
        "Never use PDFs, auto-play music, or splash screens",
        "Every click between hunger and booking costs you tables",
      ],
    },
  },
  {
    slug: "design-systems-for-business-websites",
    title: "Design Systems Aren't Just for Tech Companies",
    excerpt:
      "The secret behind websites that stay consistent as they grow — and why even a ten-page business site benefits from systematic design.",
    category: "Design",
    tags: ["Design Systems", "UI Design", "Branding"],
    author: { name: "Arjun Kapoor", role: "Founder & Creative Director", initials: "AK" },
    date: "2025-10-08",
    readingTime: 6,
    icon: "PenTool",
    content: {
      intro:
        "Mention 'design system' and most business owners picture Silicon Valley engineering teams. But the underlying idea — a defined set of colours, type, spacing, and components used consistently — is exactly what separates websites that feel premium from those that feel assembled. Here's why it matters at every scale.",
      sections: [
        {
          heading: "Consistency is what 'premium' actually means",
          body: "Visitors can't articulate why one site feels expensive and another feels cheap, but the difference is almost always systematic: consistent spacing rhythm, a restrained colour palette, and typography with clear hierarchy. Randomness reads as carelessness; systems read as confidence.",
        },
        {
          heading: "The decay problem",
          body: "Websites rarely break all at once — they decay. A new landing page with slightly different buttons. A blog post with off-palette graphics. A team member adding a page that 'sort of matches.' Within eighteen months, the original polish is gone. A design system is the immune system against this decay.",
        },
        {
          heading: "Speed is the hidden benefit",
          body: "When every button, card, form, and section has a defined pattern, new pages are assembled rather than designed from scratch. Marketing moves at campaign speed, costs drop dramatically, and quality stays consistent because the decisions were made once, correctly.",
        },
        {
          heading: "What a business-scale system looks like",
          body: "You don't need Salesforce-scale infrastructure. A practical business design system is: a one-page brand sheet (colours, type scale, spacing), a component library of your site's building blocks, and image guidelines. Three artefacts, maintained in a shared file, that keep every future addition on-brand.",
        },
        {
          heading: "When to invest",
          body: "If your website is more than a year old, growing, or touched by more than one person, you need at least a lightweight system. The investment is small — typically part of any good design engagement — and it pays back every time someone adds a page without asking a designer.",
        },
      ],
      takeaways: [
        "Premium feel comes from systematic consistency, not decoration",
        "Design systems prevent the slow decay every website suffers",
        "Components make marketing dramatically faster and cheaper",
        "A brand sheet, component library, and image guidelines are enough",
        "Any growing website benefits, regardless of company size",
      ],
    },
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
export const blogTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

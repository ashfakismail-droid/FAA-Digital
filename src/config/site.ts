import type { SiteConfig } from "@/types";

export const site: SiteConfig = {
  name: "FAA Digital",
  legalName: "FAA Digital Studio",
  domain: "faadigital.com",
  url: "https://faadigital.com",
  tagline: "We design and build exceptional digital experiences for modern businesses.",
  description:
    "FAA Digital is a premium digital agency crafting high-performance websites, e-commerce stores, and web applications for restaurants, hotels, clinics, and growing businesses worldwide.",
  email: "hello@faadigital.com",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "919876543210",
  location: {
    city: "Bengaluru",
    country: "India",
    lines: ["Level 4, Prestige Towers", "MG Road, Bengaluru 560001", "India"],
    mapQuery: "MG Road, Bengaluru, India",
  },
  hours: [
    { days: "Monday – Friday", time: "9:30 AM – 6:30 PM IST" },
    { days: "Saturday", time: "10:00 AM – 2:00 PM IST" },
    { days: "Sunday", time: "Closed" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/faadigital", icon: "Linkedin" },
    { label: "Instagram", href: "https://instagram.com/faadigital", icon: "Instagram" },
    { label: "X (Twitter)", href: "https://x.com/faadigital", icon: "Twitter" },
    { label: "Dribbble", href: "https://dribbble.com/faadigital", icon: "Dribbble" },
    { label: "GitHub", href: "https://github.com/faadigital", icon: "Github" },
  ],
  founded: "2019",
};

export const stats = [
  { label: "Projects delivered", value: 120, suffix: "+" },
  { label: "Industries served", value: 18, suffix: "" },
  { label: "Average Lighthouse score", value: 96, suffix: "" },
  { label: "Client retention", value: 94, suffix: "%" },
];

export const clients = [
  "Aurelia Hotels",
  "Northbeam Realty",
  "DentCare Studio",
  "Saffron & Co.",
  "Vertex Builds",
  "Lumina Health",
  "Atlas Retail",
  "Cobalt Legal",
  "NovaFit",
  "Meridian Travel",
];

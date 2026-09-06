import type { LucideIcon } from "lucide-react";

export type IconName = string;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export interface Feature {
  title: string;
  description: string;
  icon?: IconName;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  client: string;
  tagline: string;
  summary: string;
  services: string[];
  stack: string[];
  highlights: string[];
  metrics: ProjectMetric[];
  overview: string;
  challenge: string;
  solution: string;
  features: Feature[];
  process: ProjectSection[];
  palette: [string, string];
  icon: IconName;
  featured?: boolean;
  liveUrl?: string;
  thumbnail?: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: IconName;
  problem: string;
  solution: string;
  benefits: string[];
  outcomes: string[];
  deliverables: string[];
  featured?: boolean;
}

export interface Industry {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: IconName;
  overview: string;
  challenges: string[];
  solutions: string[];
  stats: Stat[];
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  icon: IconName;
  activities: string[];
  deliverable: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  project?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    initials: string;
  };
  date: string;
  readingTime: number;
  icon: IconName;
  featured?: boolean;
  content: {
    intro: string;
    sections: ProjectSection[];
    takeaways: string[];
  };
}

export type DemoStatus = "live" | "coming-soon" | "in-progress" | "archived";
export type DemoPublishState = "published" | "draft" | "archived";
export type DemoSourceType = "local" | "external";
export type DemoDetectedType = "html" | "nextjs" | "unknown";

export interface Demo {
  slug: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  palette: [string, string];
  icon: IconName;
  popular?: boolean;
  featured?: boolean;
  featuredHero?: boolean;
  showcase?: boolean;
  status: DemoStatus;
  thumbnail?: string;
  industry?: string;
  order?: number;
  source?: {
    type: DemoSourceType;
    folder?: string;
    url?: string;
    detectedType?: DemoDetectedType;
  };
  publishState?: DemoPublishState;
  galleryImage?: string;
  logo?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  visibility?: "public" | "private";
  notes?: string;
  lastActivity?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  location: {
    city: string;
    country: string;
    lines: string[];
    mapQuery: string;
  };
  hours: { days: string; time: string }[];
  socials: SocialLink[];
  founded: string;
}

export type { LucideIcon };
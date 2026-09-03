import type { NavItem, NavGroup } from "@/types";

export const primaryNav: (NavItem | NavGroup)[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Demos", href: "/demos" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Business Websites", href: "/services/business-websites" },
    { label: "E-Commerce", href: "/services/ecommerce" },
    { label: "Web Applications", href: "/services/web-applications" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "SEO Optimization", href: "/services/seo-optimization" },
    { label: "View all services", href: "/services" },
  ],
  resources: [
    { label: "Demo Gallery", href: "/demos" },
    { label: "FAQ", href: "/faq" },
    { label: "Industries", href: "/industries" },
    { label: "Sitemap", href: "/sitemap-page" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

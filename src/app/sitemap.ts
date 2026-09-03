import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/config/projects";
import { services } from "@/config/services";
import { industries } from "@/config/industries";
import { blogPosts } from "@/config/blog";
import { demos } from "@/config/demos";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/demos", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sitemap-page", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${site.url}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${site.url}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const demoPages: MetadataRoute.Sitemap = demos.map((d) => ({
    url: `${site.url}/demos/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...servicePages, ...industryPages, ...blogPages, ...demoPages];
}
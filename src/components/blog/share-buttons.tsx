"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { site } from "@/config/site";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/blog/${slug}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const shares = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: Linkedin,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted">Share</span>
      {shares.map((share) => (
        <a
          key={share.label}
          href={share.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={share.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-500"
        >
          <share.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-500"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

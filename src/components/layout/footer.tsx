"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { Icon } from "@/components/ui/icon";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer className="relative border-t border-border bg-surface">
      {/* Newsletter band */}
      <div className="container-x border-b border-border py-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Digital insights, monthly.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Practical strategies for websites that convert — no spam, no fluff, unsubscribe anytime.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="input-base flex-1"
            />
            <button
              type="submit"
              className="inline-flex h-[46px] shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-500 hover:shadow-glow"
            >
              {subscribed ? (
                <>
                  <Check className="h-4 w-4" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline} Premium websites, e-commerce, and web applications for businesses that
            refuse to look ordinary.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-brand-500" /> {site.email}
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4 text-brand-500" /> {site.phoneDisplay}
            </a>
            <span className="inline-flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <span>
                {site.location.city}, {site.location.country}
              </span>
            </span>
          </div>
          <div className="mt-6 flex gap-2">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-500"
              >
                <Icon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Company" links={footerNav.company} />
        <FooterColumn title="Services" links={footerNav.services} />
        <FooterColumn title="Resources" links={footerNav.resources} />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with precision in {site.location.city}
            <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand-500" />
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/faq" className="transition-colors hover:text-foreground">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
              <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

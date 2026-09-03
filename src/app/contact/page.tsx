import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";
import { faqCategories } from "@/config/faqs";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { Section, SectionHeader, SectionTag } from "@/components/ui/section";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ContactForm } from "@/components/contact/contact-form";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "Contact — Start Your Project",
  description:
    "Tell us about your project. Get an honest assessment and a fixed-scope proposal within 48 hours. Call, WhatsApp, email, or visit our Bengaluru studio.",
  path: "/contact",
});

const contactChannels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: `https://wa.me/${site.whatsapp}`,
    note: "Fastest response — usually within an hour",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Detailed proposals within 48 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    note: "Mon–Sat, business hours IST",
  },
];

export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.location.mapQuery)}&output=embed`;
  const contactFaqs = [...faqCategories[0].items.slice(0, 2), ...faqCategories[1].items.slice(0, 2)];

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Contact</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Let's talk about your project
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              Tell us where your business is heading. You'll get an honest assessment and a
              fixed-scope proposal — no pressure, no obligation, no jargon.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-soft sm:p-10">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Project enquiry
              </h2>
              <p className="mt-2 text-sm text-muted">
                The more you tell us, the more useful our first response will be.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Channels & info */}
          <div className="flex flex-col gap-5">
            {contactChannels.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 0.07}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:text-brand-400">
                    <channel.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      {channel.label}
                    </p>
                    <p className="truncate font-medium text-foreground">{channel.value}</p>
                    <p className="text-xs text-muted">{channel.note}</p>
                  </div>
                </a>
              </Reveal>
            ))}

            {/* Location */}
            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
                <div className="flex items-start gap-4 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">Studio</p>
                    {site.location.lines.map((line) => (
                      <p key={line} className="text-sm text-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <iframe
                  src={mapUrl}
                  title={`Map showing ${site.name} location`}
                  className="h-52 w-full border-t border-border grayscale-[0.3] dark:grayscale dark:invert-[0.92] dark:hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Hours */}
            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Clock className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    Business hours
                  </p>
                </div>
                <dl className="mt-4 flex flex-col gap-2.5">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex items-center justify-between text-sm">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="font-medium text-foreground">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Mini FAQ */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="Before you ask"
          title="Quick answers"
          description="The questions everyone asks before their first project with us."
        />
        <Reveal className="mx-auto max-w-3xl">
          <Accordion>
            {contactFaqs.map((faq) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </Accordion>
        </Reveal>
      </Section>

      <CtaSection
        title="Prefer to schedule a call instead?"
        description="Book a free 30-minute discovery call. We'll discuss your goals and give you honest, actionable advice."
      />
    </>
  );
}

import type { Metadata } from "next";
import { site } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Privacy Policy"
      updated="June 1, 2026"
      intro={`This policy explains what information ${site.legalName} collects, why we collect it, and the choices you have. We've written it in plain language because privacy policies should be readable.`}
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you contact us through our website, WhatsApp, or email, we collect the information you choose to share: your name, email address, phone number, company name, and details about your project.",
            "We also collect standard technical information automatically — browser type, device, pages visited, and approximate location — through privacy-respecting analytics. This data is aggregated and never used to identify you personally.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use your contact details for one purpose: to respond to your enquiry and, if we work together, to deliver your project. We may occasionally send project-related updates or, with your consent, our monthly newsletter.",
            "We do not sell, rent, or trade your personal information to anyone. Ever. We do not use your details for advertising profiles or share them with data brokers.",
          ],
        },
        {
          heading: "Cookies and tracking",
          body: [
            "This website uses a minimal set of cookies: a preference cookie to remember your theme choice (stored locally in your browser) and privacy-respecting analytics that do not track you across other websites.",
            "You can block cookies in your browser settings without affecting your ability to use this website.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "We use a small number of trusted processors to operate: hosting providers to serve this website, and an email service to receive enquiries. Each is bound by data protection agreements and receives only the minimum data required.",
            "Links to external websites (such as our social profiles) are governed by those platforms' own privacy policies.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "Enquiry correspondence is retained for up to 24 months so we can reference previous conversations, then deleted. Project data for active clients is retained for the duration of our engagement plus any legally required period.",
            "We protect your information with encryption in transit, access controls, and the principle of least privilege — only team members who need your data to serve you can access it.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it entirely. We will honour any such request within 30 days, free of charge.",
            `To exercise any of these rights, email us at ${site.email} with the subject line "Privacy request".`,
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If we change this policy in a material way, we will update the date above and, for active clients, notify you by email. Continued use of the website after changes constitutes acceptance of the updated policy.",
            `Questions about privacy? Contact us at ${site.email} — a human will reply.`,
          ],
        },
      ]}
    />
  );
}

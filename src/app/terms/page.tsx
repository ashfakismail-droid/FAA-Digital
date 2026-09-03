import type { Metadata } from "next";
import { site } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `The terms governing use of the ${site.name} website and our client services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Terms of Service"
      updated="June 1, 2026"
      intro={`These terms govern your use of the ${site.name} website and the services we provide to clients. Plain language, mutual fairness, no traps.`}
      sections={[
        {
          heading: "Using this website",
          body: [
            "The content on this website — including case studies, articles, and design work — is the intellectual property of " + site.legalName + " and is provided for informational purposes. You may not reproduce or republish it without written permission.",
            "You agree not to misuse this website: no attempting to breach security, scrape content at scale, or interfere with its operation.",
          ],
        },
        {
          heading: "Quotes and proposals",
          body: [
            "Proposals we issue are valid for 30 days and describe a fixed scope of work at a fixed price. Work outside the agreed scope is estimated and approved in writing before it begins — you will never receive an unexpected invoice.",
            "Our standard payment schedule is 40% to begin, 40% at design approval, and 20% at launch, unless otherwise agreed in your proposal.",
          ],
        },
        {
          heading: "Client responsibilities",
          body: [
            "Successful projects need timely input: feedback within agreed review windows, content and assets when required, and a single empowered decision-maker. Delays in feedback extend timelines by the same duration.",
            "You confirm that any material you provide — text, images, logos, data — is yours to use and does not infringe third-party rights.",
          ],
        },
        {
          heading: "Intellectual property and ownership",
          body: [
            "Upon full payment, you own the final deliverables: website code, design files, and content created specifically for your project. We retain the right to showcase the work in our portfolio unless you request otherwise in writing.",
            "We retain ownership of our pre-existing tools, libraries, and reusable components, which are licensed to you perpetually as part of your deliverables.",
          ],
        },
        {
          heading: "Warranties and liability",
          body: [
            "We warrant that deliverables will substantially match the approved designs and specifications, and we fix defects reported within 30 days of launch at no charge.",
            "To the maximum extent permitted by law, our total liability for any claim arising from our services is limited to the fees paid for the relevant project. We are not liable for indirect losses such as lost profits.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "Projects often involve third-party platforms — hosting, payment gateways, booking systems — each governed by their own terms. We configure them in accounts registered in your name, so you retain control and the direct relationship.",
            "We are not responsible for outages, price changes, or policy changes made by third-party providers, though we will always help you navigate them.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "Either party may end an engagement with 14 days' written notice. You pay for work completed to date; we hand over everything produced so far. No exit fees, no hostage situations.",
            "Care plans are monthly and can be cancelled anytime with effect from the next billing cycle.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            `These terms are governed by the laws of India, with disputes subject to the jurisdiction of courts in ${site.location.city}. We would always rather resolve disagreements through honest conversation first.`,
            `Questions about these terms? Email ${site.email}.`,
          ],
        },
      ]}
    />
  );
}

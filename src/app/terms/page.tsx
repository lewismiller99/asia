import { LegalLayout } from "@/components/legal-layout";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the Miller & Partners Asia website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="10 September 2026">
      <p>
        These Terms of Use govern access to and use of the Miller &amp;
        Partners Asia website. By using this website, you agree to these
        terms.
      </p>

      <h2>Informational Purpose</h2>
      <p>
        Content on this website is provided for general informational
        purposes about Miller &amp; Partners Asia, its activities and its
        founder, Lewis Miller. It does not constitute legal, financial, tax
        or investment advice, and should not be relied upon as such.
      </p>

      <h2>No Offer</h2>
      <p>
        Nothing on this website constitutes an offer or solicitation to buy
        or sell any security, investment product or interest in any project.
        Any specific opportunity would be discussed directly and separately,
        subject to appropriate documentation and professional advice.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The content, design and branding of this website are the property of
        Miller &amp; Partners Asia and may not be reproduced without
        permission, except for personal, non-commercial reference.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        This website may link to third-party websites. We are not
        responsible for the content or practices of any linked third-party
        site.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Miller &amp; Partners Asia makes reasonable efforts to keep
        information on this website accurate and current, but makes no
        warranty as to its completeness or accuracy, and accepts no
        liability for decisions made in reliance on it.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws applicable to the jurisdiction
        in which Miller &amp; Partners Asia primarily operates, without
        prejudice to any mandatory local consumer protection provisions.
      </p>

      <h2>Contact</h2>
      <p>
        Questions regarding these Terms can be directed to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </LegalLayout>
  );
}

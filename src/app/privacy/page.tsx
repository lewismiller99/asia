import { LegalLayout } from "@/components/legal-layout";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Miller & Partners Asia handles personal data collected through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="10 September 2026">
      <p>
        This Privacy Policy explains how Miller &amp; Partners Asia
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and protects
        personal data provided through this website.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you submit an enquiry through our contact form, we collect the
        information you provide: your name, email address, company,
        telephone number (if given), area of interest and message content.
        We do not collect financial, payment or government identification
        information through this website.
      </p>

      <h2>How We Use Information</h2>
      <p>
        Information submitted through the contact form is used solely to
        respond to your enquiry and to maintain a record of business
        correspondence. We do not sell, rent or trade personal data to third
        parties.
      </p>

      <h2>Data Storage</h2>
      <p>
        Enquiries are processed through the contact form provider configured
        for this website (see the technical documentation for current
        details) and via direct email. Data is retained only as long as
        reasonably necessary for legitimate business purposes.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of personal
        data you have provided to us by contacting{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        This website uses limited cookies as described in our{" "}
        <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material
        changes will be reflected by an updated revision date at the top of
        this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions regarding this Privacy Policy can be directed to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </LegalLayout>
  );
}

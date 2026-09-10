import { LegalLayout } from "@/components/legal-layout";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How cookies are used on the Miller & Partners Asia website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="10 September 2026">
      <p>
        This website uses a limited number of cookies to support essential
        functionality and, where analytics are enabled, to understand
        general usage patterns.
      </p>

      <h2>Essential Cookies</h2>
      <p>
        These are required for the website to function correctly, such as
        remembering your cookie preference. The website does not require
        essential cookies to render its core content.
      </p>

      <h2>Analytics Cookies</h2>
      <p>
        If an analytics service (such as a privacy-respecting visitor
        analytics tool) is enabled for this website, it may use cookies or
        similar technologies to understand aggregate visitor behaviour. No
        analytics service is enabled by default in the current build of this
        website; see the project README for how to add one.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        Most browsers allow you to refuse or delete cookies through their
        settings. Doing so may affect certain website functionality.
      </p>

      <h2>Contact</h2>
      <p>
        Questions regarding this Cookie Policy can be directed to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </LegalLayout>
  );
}

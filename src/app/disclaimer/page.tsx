import { LegalLayout } from "@/components/legal-layout";
import { legalDisclaimer } from "@/lib/site-config";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Legal Disclaimer",
  description: "Legal disclaimer covering how Miller & Partners Asia operates.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Legal Disclaimer" updated="10 September 2026">
      <p>{legalDisclaimer}</p>

      <h2>Independent Platform</h2>
      <p>
        Miller &amp; Partners Asia is an independent business and advisory
        brand operated by Lewis Miller. It is not represented as a
        registered limited company, a formal legal partnership, or a
        regulated financial institution unless explicitly stated in writing
        in connection with a specific project.
      </p>

      <h2>How Projects Are Structured</h2>
      <p>
        Projects, investments and commercial activities presented through
        this website may be undertaken personally by Lewis Miller, through
        independent partners, or through separate legal entities specific to
        that project. The structure applicable to any individual opportunity
        would be made clear before any commitment is required.
      </p>

      <h2>No Regulated Advice</h2>
      <p>
        Miller &amp; Partners Asia does not represent itself as a licensed
        legal, financial, securities or investment advisory firm. Where
        regulated professional services are required — including legal, tax,
        financial or securities advice — clients are referred to
        appropriately qualified independent professionals.
      </p>

      <h2>No Guarantee of Outcome</h2>
      <p>
        References to past or current projects, ventures or advisory
        mandates on this website describe the nature of our work and do not
        constitute a guarantee of similar outcomes for any future
        engagement.
      </p>
    </LegalLayout>
  );
}

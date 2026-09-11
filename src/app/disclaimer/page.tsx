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
    <LegalLayout title="Legal Disclaimer" updated="11 September 2026">
      <h2>No Regulated Advice</h2>
      <p>{legalDisclaimer}</p>
      <p>
        Miller &amp; Partners Asia is not a registered company or regulated
        financial institution unless stated otherwise in writing for a
        specific project.
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

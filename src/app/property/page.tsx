import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/page-metadata";
import { ventures } from "@/content/ventures";

export const metadata = pageMetadata({
  title: "Property",
  description:
    "Property investment, development strategy and project advisory across Thailand and selected Asian markets.",
  path: "/property",
});

export default function PropertyPage() {
  return (
    <ServicePage
      eyebrow="Property"
      title="Property investment and development across Asia"
      intro="Property is one of our deepest areas of experience — positioning, structuring and advising on projects across Thailand and Asia. This is not a property portal; we don't list transactions."
      heroImage="/images/bangkok-skyline.jpg"
      heroImageAlt="Bangkok skyline representing property investment and development"
      overviewLabel="Property"
      overviewHeading="Understanding the fundamentals of every project"
      overviewParagraphs={[
        "Our approach is focused on understanding the commercial fundamentals of each project, the ownership environment, the target market and the long term viability of the opportunity.",
        "Where specialist legal, financial or regulatory advice is required, we work with qualified independent professionals.",
      ]}
      overviewImage="/images/bangkok-daylight.jpg"
      overviewImageAlt="Bangkok skyline in daylight, representing property development in Thailand"
      areasLabel="Focus"
      areasHeading="Where our property experience concentrates"
      areas={[
        "Property Investment",
        "Property Development",
        "Development Strategy",
        "Sales Strategy",
        "Market Positioning",
        "Commercial Advisory",
        "Thailand Property",
        "Selected Asian Opportunities",
        "Developer Partnerships",
        "Project Advisory",
      ]}
      relatedVentures={ventures.filter((v) => v.category === "Property")}
      disclaimer="Property transactions in Thailand and across Asia carry ownership, regulatory and tax considerations specific to each jurisdiction. Independent legal, tax and regulatory advice should always be obtained before entering into any property transaction."
    />
  );
}

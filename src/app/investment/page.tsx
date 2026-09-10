import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/page-metadata";
import { ventures } from "@/content/ventures";

export const metadata = pageMetadata({
  title: "Investment",
  description:
    "Selected private investment opportunities across Asia, spanning technology, property, development and emerging commercial ventures.",
  path: "/investment",
});

export default function InvestmentPage() {
  return (
    <ServicePage
      eyebrow="Investment"
      title="Selected private investment across Asia"
      intro="We identify, evaluate and participate in selected investment opportunities across technology, property, development and emerging commercial ventures."
      heroImage="/images/hongkong-harbour.jpg"
      heroImageAlt="Hong Kong harbour skyline representing private investment across Asia"
      overviewLabel="Investment"
      overviewHeading="Direct participation, or access to the right opportunity"
      overviewParagraphs={[
        "Our interests include private businesses, technology, property, development and emerging commercial opportunities where we believe our experience, network or involvement can create additional value.",
        "We also work with investors seeking access to opportunities, partnerships and projects within Thailand and the wider Asian market. Depending on the project, Miller & Partners Asia may invest directly, participate strategically, or connect investors with a selected opportunity.",
      ]}
      overviewImage="/images/shanghai-skyline.jpg"
      overviewImageAlt="Shanghai skyline representing Asian investment markets"
      areasLabel="Focus"
      areasHeading="Where we look for value"
      areas={[
        "Private Businesses",
        "Technology Investment",
        "Property Investment",
        "Development Projects",
        "Emerging Commercial Opportunities",
        "Strategic Participation",
        "Investor Relationships",
        "Project Evaluation",
        "Thailand and China Focus",
      ]}
      relatedVentures={ventures.filter(
        (v) => v.category === "Technology" || v.category === "Property"
      )}
      disclaimer="Miller & Partners Asia does not provide regulated securities or investment advice. Any reference to an investment opportunity is provided for general commercial context only, and appropriate independent financial, legal and tax advice should always be sought before committing capital to any project."
    />
  );
}

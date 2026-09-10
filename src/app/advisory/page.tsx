import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/page-metadata";
import { ventures } from "@/content/ventures";

export const metadata = pageMetadata({
  title: "Advisory",
  description:
    "Practical commercial advisory for businesses, investors and entrepreneurs operating in Asia or entering the region, including Thailand market entry and BOI positioning.",
  path: "/advisory",
});

export default function AdvisoryPage() {
  return (
    <ServicePage
      eyebrow="Advisory"
      title="Practical commercial advisory across Asia"
      intro="We provide practical commercial advisory for businesses, investors and entrepreneurs operating in Asia or looking to enter the region."
      heroImage="/images/singapore-port-terminal.jpg"
      heroImageAlt="Container terminal representing cross-border trade and market entry"
      overviewLabel="Advisory"
      overviewHeading="Market entry, strategy and structuring"
      overviewParagraphs={[
        "Our work can include business strategy, market entry, commercial development, partnerships, project structuring, investor introductions and strategic positioning.",
        "We also support businesses exploring opportunities available through Thailand's investment promotion framework, and work alongside appropriate professional specialists where regulatory, legal, tax or corporate advice is required.",
      ]}
      overviewImage="/images/bangkok-benjakiti.jpg"
      overviewImageAlt="Bangkok skyline representing commercial advisory in Thailand"
      areasLabel="Focus"
      areasHeading="Where our advisory work concentrates"
      areas={[
        "Market Entry",
        "Thailand Strategy",
        "Asian Expansion",
        "Business Development",
        "Strategic Partnerships",
        "Commercial Strategy",
        "Project Structuring",
        "BOI Opportunity Assessment",
        "Investment Promotion Strategy",
        "Professional Partner Introductions",
      ]}
      relatedVentures={ventures.filter(
        (v) =>
          v.category === "Market Entry" ||
          v.category === "Strategic Advisory Mandate"
      )}
      disclaimer="Specialist legal, tax, financial or regulatory advice is always provided through appropriately qualified external professionals. Our advisory work supports commercial strategy and positioning; it is not a substitute for licensed legal or financial advice."
    />
  );
}

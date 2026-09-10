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
      heroImage="/images/bangkok-skyline.jpg"
      heroImageAlt="Bangkok skyline representing commercial advisory and market entry in Thailand"
      overviewLabel="Advisory"
      overviewHeading="Market entry, strategy and structuring"
      overviewParagraphs={[
        "Most engagements fall into three buckets: getting a business into Thailand or expanding within Asia, structuring a partnership or project properly, and positioning a company for capital or growth.",
        "We also help businesses assess Thailand's investment promotion framework, working alongside qualified professionals wherever legal, tax or regulatory advice is required.",
      ]}
      overviewImage="/images/singapore-skyline.jpg"
      overviewImageAlt="Singapore's financial district at golden hour, representing regional advisory work"
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

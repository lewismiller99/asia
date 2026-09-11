import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/page-metadata";
import { ventures } from "@/content/ventures";

export const metadata = pageMetadata({
  title: "Technology",
  description:
    "Development, investment and commercial strategy for technology led ventures built for Asian markets.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <ServicePage
      eyebrow="Technology"
      title="Technology ventures built for Asia"
      intro="Technology is a growing part of the portfolio: digital businesses and software platforms built primarily for Asian markets."
      heroImage="/images/technology-factory.jpg"
      heroImageAlt="An industrial robot arm on a factory production line, representing technology ventures in Asia"
      overviewLabel="Technology"
      overviewHeading="From concept to commercial launch"
      overviewParagraphs={[
        "Our involvement can start as early as concept and commercial strategy, and run through company formation, product development and market launch.",
        "We work with founders who understand their product but need support translating it into a commercially viable business for specific Asian markets, where distribution, payment behaviour and local relevance often matter more than the technology itself.",
      ]}
      overviewImage="/images/shanghai-tower.jpg"
      overviewImageAlt="The Shanghai Tower's twisting glass facade, a symbol of Asia's technology ambitions"
      areasLabel="Focus"
      areasHeading="Where we get involved"
      areas={[
        "Digital Ventures",
        "Software Platforms",
        "Mobile Applications",
        "Technology Strategy",
        "Business Model Development",
        "Commercialisation",
        "Product Development",
        "Market Launch Strategy",
        "Technology Investment",
        "Asian Market Expansion",
      ]}
      relatedVentures={ventures.filter((v) => v.category === "Technology")}
      disclaimer="Where a technology venture involves raising capital or offering securities, appropriately qualified legal and financial professionals are engaged. Miller & Partners Asia does not itself provide regulated investment or securities advice."
    />
  );
}

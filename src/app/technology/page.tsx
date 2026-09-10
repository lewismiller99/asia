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
      intro="Technology is an increasingly important part of the Miller & Partners Asia portfolio. We develop and participate in digital businesses, software platforms and technology led ventures designed primarily for Asian markets."
      heroImage="/images/shanghai-skyline.jpg"
      heroImageAlt="Shanghai skyline representing technology ventures in Asia"
      overviewLabel="Technology"
      overviewHeading="From concept to commercial launch"
      overviewParagraphs={[
        "Our involvement can range from concept development and commercial strategy through to company formation, investment, product development, partnerships and market launch.",
        "We work with founders who understand their product but need support translating it into a commercially viable business for specific Asian markets — where distribution, payment behaviour and local relevance often matter more than the technology itself.",
      ]}
      overviewImage="/images/hongkong-harbour.jpg"
      overviewImageAlt="Hong Kong skyline representing technology markets in Asia"
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

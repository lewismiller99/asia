import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/brand/logo";
import { AmpouleSet, BalmStick, CreamJar, RetailBox, SerumDropper, SupplementJar } from "@/components/products/renders";
import { anchors } from "@/lib/site-config";

type Item = {
  kind: "concept" | "environment" | "mark";
  label: string;
  span: string;
  aspect: string;
  surface?: string;
  render?: React.ReactNode;
  image?: { src: string; alt: string };
};

const items: Item[] = [
  {
    kind: "concept",
    label: "Serum, frosted glass",
    span: "col-span-1 md:col-span-4",
    aspect: "aspect-[4/5]",
    surface: "bg-[radial-gradient(110%_80%_at_50%_10%,#2c2c2c_0%,#0a0a0a_70%)]",
    render: <SerumDropper className="mx-auto h-full" />,
  },
  {
    kind: "environment",
    label: "Production line, illustrative",
    span: "col-span-1 md:col-span-4",
    aspect: "aspect-[4/5]",
    image: { src: "/images/production-line-portrait.jpg", alt: "Industrial machinery on a production line, illustrative stock photography" },
  },
  {
    kind: "concept",
    label: "Cream jar, bone and black",
    span: "col-span-2 md:col-span-4",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
    surface: "bg-[linear-gradient(180deg,#f3f0ea_0%,#d9d3c8_100%)]",
    render: <CreamJar className="mx-auto h-full" />,
  },
  {
    kind: "mark",
    label: "The signature",
    span: "col-span-2 md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-auto",
    surface: "bg-seal",
  },
  {
    kind: "concept",
    label: "Retail box, matte black",
    span: "col-span-1 md:col-span-3",
    aspect: "aspect-[4/5]",
    surface: "bg-[linear-gradient(180deg,#1f1f1f_0%,#0a0a0a_100%)]",
    render: <RetailBox className="mx-auto h-full" />,
  },
  {
    kind: "environment",
    label: "Shanghai, illustrative",
    span: "col-span-1 md:col-span-4",
    aspect: "aspect-[4/5]",
    image: { src: "/images/shanghai-portrait.jpg", alt: "The Shanghai skyline across the Huangpu river" },
  },
  {
    kind: "concept",
    label: "Supplement jar",
    span: "col-span-1 md:col-span-3",
    aspect: "aspect-[4/5]",
    surface: "bg-[linear-gradient(180deg,#e9e3d9_0%,#cdc5b8_100%)]",
    render: <SupplementJar className="mx-auto h-full" />,
  },
  {
    kind: "concept",
    label: "Ampoule set",
    span: "col-span-1 md:col-span-5",
    aspect: "aspect-[4/5] md:aspect-[5/4]",
    surface: "bg-[radial-gradient(100%_100%_at_50%_100%,#303030_0%,#0a0a0a_70%)]",
    render: <AmpouleSet className="mx-auto h-full" />,
  },
  {
    kind: "concept",
    label: "Balm stick",
    span: "col-span-2 md:col-span-4",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
    surface: "bg-[linear-gradient(180deg,#faf8f4_0%,#e2dcd2_100%)]",
    render: <BalmStick className="mx-auto h-full" />,
  },
];

/**
 * Section 5: the showcase. Illustrative concepts and manufacturing
 * environments, clearly labelled, set in an editorial grid with one tile
 * reserved for the brand signature.
 */
export function Showcase() {
  return (
    <section id={anchors.showcase.slice(1)} className="surface-black section-pad relative">
      <div className="container-wide">
        <SectionHeading
          eyebrow="The showcase"
          title={
            <>
              Made to be
              <br />
              <span className="serif-accent font-normal lowercase text-white/90">your</span> brand.
            </>
          }
          lede="Illustrative product concepts beside the environments they come from. Client work is shared privately and with permission. Nothing here is presented as a completed project."
          align="split"
        />

        <ul className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-12 md:gap-5">
          {items.map((item, i) => (
            <Reveal
              key={item.label}
              as="li"
              variant="mask"
              delayMs={(i % 3) * 80}
              className={`${item.span} ${item.aspect} relative overflow-hidden`}
            >
              <figure className={`group relative h-full w-full ${item.surface ?? ""} ${item.kind === "mark" ? "text-white" : ""}`}>
                {item.kind === "concept" && (
                  <div className="absolute inset-x-0 top-[5%] bottom-[15%] transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] md:bottom-[12%]">
                    {item.render}
                  </div>
                )}
                {item.kind === "environment" && item.image && (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    quality={70}
                  />
                )}
                {item.kind === "mark" && (
                  <div className="flex h-full flex-col justify-between p-5 pb-14 md:p-8 md:pb-16">
                    <Logo tone="light" className="w-full max-w-[16rem] md:max-w-[22rem]" />
                    <p className="serif-accent text-[clamp(1.35rem,2.4vw,2.25rem)] leading-tight">Your brand. Built at source.</p>
                  </div>
                )}
                <figcaption
                  className={`absolute bottom-0 left-0 right-0 flex flex-col gap-0.5 p-3 text-[0.5625rem] uppercase tracking-[0.18em] md:gap-1 md:p-5 md:text-[0.625rem] md:tracking-[0.2em] ${
                    item.kind === "environment" || item.surface?.includes("#0a0a0a") || item.kind === "mark" ? "text-white/70" : "text-ink/60"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="opacity-60">{item.kind === "concept" ? "Illustrative concept" : item.kind === "environment" ? "Environment, stock" : "Identity"}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

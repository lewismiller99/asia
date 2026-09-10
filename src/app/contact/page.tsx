import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation with Miller & Partners Asia about an investment, market entry, technology venture or property opportunity.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        intro="Whether you are exploring an investment, entering an Asian market, developing a new business, seeking a strategic partner or considering a project in Thailand, we are open to conversations where there is a genuine opportunity to create value."
        image="/images/bangkok-dusk-ratchadamri.jpg"
        imageAlt="Bangkok skyline at dusk"
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              We read every enquiry personally
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-olive">
              For the fastest response, tell us a little about the
              opportunity, your role and your timeline.
            </p>
            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-ink underline decoration-bronze decoration-2 underline-offset-4"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                  LinkedIn
                </dt>
                <dd className="mt-1">
                  <a
                    href={siteConfig.linkedInUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-ink underline decoration-bronze decoration-2 underline-offset-4"
                  >
                    {siteConfig.linkedInHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                  Based
                </dt>
                <dd className="mt-1 text-olive">{siteConfig.location}</dd>
                <dd className="mt-1 text-xs text-olive/80">
                  Operating across Asia, with partners and activity extending
                  across the wider region.
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

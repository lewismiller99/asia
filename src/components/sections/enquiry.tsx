import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { anchors } from "@/lib/site-config";
import { EnquiryForm } from "./enquiry-form";

const next = [
  { index: "01", title: "You send the message", text: "Your enquiry opens in WhatsApp, pre-filled, for you to review and send." },
  { index: "02", title: "We reply personally", text: "A direct conversation about what you want to make and whether it is a fit." },
  { index: "03", title: "We scope it with our partners", text: "Options, indicative quantities and next steps, with no obligation." },
];

/** Section 6: the enquiry. The one conversion on the page. */
export function Enquiry() {
  return (
    <section id={anchors.enquire.slice(1)} className="surface-paper section-pad relative scroll-mt-[var(--header-h)]">
      <div className="container-wide">
        <SectionHeading
          tone="light"
          eyebrow="The enquiry"
          title={
            <>
              Build your
              <br />
              brand today.
            </>
          }
          lede="Tell us what you want to create. Share your idea and start a conversation directly on WhatsApp."
          align="split"
        />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <EnquiryForm />
          </Reveal>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="stagger" className="grid gap-0">
              <p className="eyebrow text-ash">What happens next</p>
              {next.map((step) => (
                <div key={step.index} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 first:mt-6 first:border-t">
                  <span className="numeral text-[2rem] text-ink/80">{step.index}</span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ash">{step.text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

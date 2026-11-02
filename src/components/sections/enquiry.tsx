import { Reveal } from "@/components/ui/reveal";
import { anchors } from "@/lib/site-config";
import { EnquiryForm } from "./enquiry-form";

const next = [
  { n: "01", title: "You send the message", text: "Your enquiry opens in WhatsApp, pre-filled, for you to review and send." },
  { n: "02", title: "We reply personally", text: "A direct conversation about what you want to make and whether it is a fit." },
  { n: "03", title: "We scope it with our partners", text: "Options, indicative quantities and next steps, with no obligation." },
];

/** Chapter 05. The one conversion on the page, on the dark set. */
export function Enquiry() {
  return (
    <section id={anchors.enquire.slice(1)} className="surface-black relative scroll-mt-[var(--header-h)] border-t border-white/10">
      <div className="container-wide py-[clamp(5rem,12vw,10rem)]">
        <Reveal>
          <p className="chapter text-white/55">05 &nbsp; The enquiry</p>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal delayMs={80} className="md:col-span-8">
            <h2 className="giant text-[clamp(3rem,10vw,10.5rem)] text-white">
              Build your
              <br />
              brand today<span className="accent">.</span>
            </h2>
          </Reveal>
          <Reveal delayMs={160} className="md:col-span-4 md:pb-4">
            <p className="lede text-mist">Tell us what you want to create. Share your idea and start a conversation directly on WhatsApp.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="form-dark lg:col-span-7">
            <EnquiryForm tone="dark" />
          </Reveal>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="stagger" className="grid gap-0">
              <p className="chapter text-white/55">What happens next</p>
              {next.map((step) => (
                <div key={step.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-6 first:mt-6 first:border-t">
                  <span className="numeral text-[2rem] text-white/80">{step.n}</span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>
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

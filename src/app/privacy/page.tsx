import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Footer } from "@/components/sections/footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles the information you share through the website and WhatsApp.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const updated = "1 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <header className="surface-black">
        <div className="container-wide flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" aria-label={`${siteConfig.name} home`}>
            <Logo tone="light" className="h-11 w-auto" />
          </Link>
          <Link href="/" className="link-rule text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80">
            Back to site
          </Link>
        </div>
      </header>

      <main id="main-content" className="surface-paper">
        <div className="container-wide section-pad">
          <p className="eyebrow text-ash">Privacy policy</p>
          <h1 className="display mt-7 text-[clamp(2.5rem,7vw,6.5rem)] text-ink">Your information.</h1>
          <p className="mt-6 text-sm text-ash">Last updated {updated}.</p>

          <div className="mt-14 grid max-w-[46rem] gap-10 text-[1.0625rem] leading-relaxed text-ink/85 [&_h2]:display-sm [&_h2]:text-[1.5rem] [&_h2]:text-ink [&_p+p]:mt-4">
            <section>
              <h2>Who we are</h2>
              <p>
                {siteConfig.name} ({siteConfig.domain}) helps businesses develop and manufacture products through
                manufacturing partners in China. This policy explains what information we receive through this website
                and how it is used.
              </p>
            </section>

            <section>
              <h2>The enquiry form and WhatsApp</h2>
              <p>
                The enquiry form on this website does not send anything to our servers. When you press the button, your
                browser composes a WhatsApp message on your own device containing the details you entered: your name,
                email address, WhatsApp number, selected product interests and anything you wrote about your idea. You
                can review and edit that message in WhatsApp before you choose to send it.
              </p>
              <p>
                Once sent, the message is delivered through WhatsApp to our business number. WhatsApp&apos;s own terms of
                service and privacy policy apply to that transmission. We use the information you send to reply to you
                and to discuss your project. We do not sell it or share it with third parties for marketing.
              </p>
            </section>

            <section>
              <h2>What this website collects on its own</h2>
              <p>
                This website does not use advertising trackers, and it does not place analytics cookies by default. Our
                hosting provider keeps standard server logs (such as IP address, browser type and the pages requested)
                for security and performance, in line with their own policies.
              </p>
            </section>

            <section>
              <h2>Keeping and deleting information</h2>
              <p>
                Conversations are kept for as long as needed to respond to you and to manage any project we work on
                together. You can ask us at any time to delete the messages you have sent us, as far as the WhatsApp
                service allows, and to stop contacting you.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                Depending on where you live, you may have the right to access, correct or delete personal information we
                hold about you, and to object to how it is used. To exercise these rights, contact us
                {siteConfig.contact.email ? (
                  <>
                    {" "}
                    at <a href={`mailto:${siteConfig.contact.email}`} className="link-rule text-ink">{siteConfig.contact.email}</a>
                  </>
                ) : (
                  " through the WhatsApp number on this website"
                )}
                .
              </p>
            </section>

            <section>
              <h2>Changes</h2>
              <p>We will update this page when our practices change and revise the date above.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

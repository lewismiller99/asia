import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SocialIcon, WhatsAppIcon } from "@/components/ui/icons";
import { configuredSocials, siteConfig, whatsappUrl } from "@/lib/site-config";

export function Footer() {
  const socials = configuredSocials();
  const wa = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-black relative border-t border-white/10">
      <div className="container-wide py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Logo tone="light" className="w-[min(80vw,26rem)]" />
            <p className="serif-accent mt-8 text-[clamp(1.5rem,2.4vw,2rem)] text-white/90">Your Brand. Built at Source.</p>
          </div>

          <div className="md:col-span-5 md:justify-self-end">
            <ul className="flex flex-wrap gap-x-7 gap-y-4">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="link-rule inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80 hover:text-white"
                  >
                    <SocialIcon name={s.key} size={15} />
                    {s.label}
                  </a>
                </li>
              ))}
              {wa ? (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80 hover:text-white"
                  >
                    <WhatsAppIcon size={15} />
                    WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.6875rem] uppercase tracking-[0.16em] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. {siteConfig.domain}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="link-rule hover:text-white">
              Privacy Policy
            </Link>
            {siteConfig.contact.email ? (
              <a href={`mailto:${siteConfig.contact.email}`} className="link-rule normal-case tracking-normal hover:text-white">
                {siteConfig.contact.email}
              </a>
            ) : null}
          </div>
        </div>
        <p className="mt-4 max-w-[52rem] text-[0.6875rem] leading-relaxed text-white/60">
          Product imagery on this site shows illustrative concepts. Film and photography of cities, ports and factories
          are illustrative and do not depict our manufacturing partners or their facilities.
        </p>
      </div>
    </footer>
  );
}

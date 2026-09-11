import Link from "next/link";
import { footerLegalNav, primaryNav, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif-display text-2xl">
              Miller &amp; Partners Asia
            </p>
            <p className="mt-2 text-sm tracking-[0.08em] text-stone">
              {siteConfig.descriptor}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
              Investment, advisory, technology and property opportunities
              across Asia.
            </p>
            <p className="mt-6 text-sm text-stone">{siteConfig.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-7">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                Navigate
              </p>
              <ul className="mt-4 space-y-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-stone transition-colors duration-300 hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                Legal
              </p>
              <ul className="mt-4 space-y-3">
                {footerLegalNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-stone transition-colors duration-300 hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm text-stone">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition-colors duration-300 hover:text-ivory"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedInUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors duration-300 hover:text-ivory"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line-dark pt-8">
          <p className="text-xs text-stone/60">
            © {year} Miller &amp; Partners Asia. Founded by {siteConfig.founder}.
          </p>
        </div>
      </div>
    </footer>
  );
}

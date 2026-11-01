"use client";

import { useEffect, useState } from "react";
import { Logo, Wordmark } from "@/components/brand/logo";
import { anchors, siteConfig, whatsappUrl } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/ui/icons";

const nav = [
  { label: "Create", href: anchors.create },
  { label: "Process", href: anchors.process },
  { label: "Founder", href: anchors.founder },
  { label: "Showcase", href: anchors.showcase },
];

/**
 * Fixed header. Transparent over the hero film, then settles onto a dark
 * blurred bar once the visitor scrolls. The primary action stays visible
 * at every size.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappUrl();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled ? "border-b border-white/10 bg-black/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-wide flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#top"
          className={`block shrink-0 transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
          aria-label={`${siteConfig.name} home`}
          tabIndex={scrolled ? 0 : -1}
          aria-hidden={!scrolled}
        >
          <Logo tone="light" className="hidden h-9 w-auto sm:block" />
          <Wordmark tone="light" className="h-8 w-auto sm:hidden" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-rule text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/80 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-white md:inline-flex"
              aria-label="Message us on WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
          ) : null}
          <a href={anchors.enquire} className="btn btn-seal !min-h-11 !px-5 text-[0.6875rem]">
            Build your brand
          </a>
        </div>
      </div>
    </header>
  );
}

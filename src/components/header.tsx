import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/90">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="group flex flex-col leading-none text-ivory"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="font-serif-display text-lg tracking-[0.02em] sm:text-xl">
            MILLER &amp; PARTNERS
          </span>
          <span className="mt-1 text-[11px] font-medium tracking-[0.5em] text-stone">
            ASIA
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 lg:flex"
        >
          {primaryNav.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-stone transition-colors duration-300 hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center border border-bronze/60 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:border-bronze hover:bg-bronze/10"
          >
            Start a Conversation
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}

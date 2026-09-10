import type { ReactNode } from "react";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-offwhite py-32 sm:py-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze">
          Legal
        </p>
        <h1 className="mt-5 font-serif-display text-3xl text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-olive/80">Last updated: {updated}</p>
        <div className="prose-insight mt-12">{children}</div>
      </div>
    </section>
  );
}

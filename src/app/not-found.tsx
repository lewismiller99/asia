import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-offwhite px-6 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze">
        404
      </p>
      <h1 className="mt-5 font-serif-display text-4xl text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-olive">
        The page you are looking for may have been moved or no longer
        exists.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center bg-ink px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:bg-olive"
      >
        Return Home
      </Link>
    </section>
  );
}

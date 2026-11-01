import Link from "next/link";

export default function NotFound() {
  return (
    <section className="surface-black flex min-h-dvh flex-col items-start justify-center px-[var(--gutter)]">
      <p className="eyebrow text-mist">404</p>
      <h1 className="display mt-6 text-[clamp(2.5rem,8vw,6rem)]">Page not found.</h1>
      <p className="lede mt-6 max-w-md text-mist">The page you are looking for may have moved or no longer exists.</p>
      <Link href="/" className="btn btn-seal mt-10">
        Return home
      </Link>
    </section>
  );
}

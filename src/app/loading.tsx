import { Seal } from "@/components/brand/logo";

export default function Loading() {
  return (
    <div className="surface-black flex min-h-dvh items-center justify-center" role="status" aria-label="Loading">
      <Seal size={28} className="opacity-80" />
    </div>
  );
}

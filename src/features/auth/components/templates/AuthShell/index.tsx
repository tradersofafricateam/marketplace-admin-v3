import type { ReactNode } from "react";
import { Logo } from "@/components/atoms/Logo";

const RING_RADII = [56, 96, 138, 182, 228, 276];
const RING_STROKE = [
  "rgba(255,255,255,0.07)",
  "rgba(56,189,248,0.16)",
  "rgba(255,255,255,0.05)",
  "rgba(249,115,22,0.14)",
  "rgba(56,189,248,0.1)",
  "rgba(255,255,255,0.08)",
];

function RingMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 560" className={className} aria-hidden>
      {RING_RADII.map((r, i) => (
        <circle
          key={r}
          cx="560"
          cy="0"
          r={r}
          fill="none"
          stroke={RING_STROKE[i % RING_STROKE.length]}
          strokeWidth={i === RING_RADII.length - 1 ? 2 : 1.25}
        />
      ))}
    </svg>
  );
}

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-5 py-12 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.1),transparent_42%),radial-gradient(circle_at_85%_85%,rgba(249,115,22,0.08),transparent_42%)]" />
      <RingMotif className="pointer-events-none absolute -right-32 -top-32 h-144 w-xl" />
      <RingMotif className="pointer-events-none absolute -bottom-40 -left-40 h-120 w-120 rotate-180" />

      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="absolute -inset-8 rounded-[3rem] bg-white/4 blur-3xl" />
        <div className="relative overflow-hidden rounded-4xl border border-white/80 bg-white/85 p-8 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.25),0_40px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-11">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent" />
          <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-white/60 blur-2xl" />

          <div className="relative mb-8 flex justify-center">
            <Logo />
          </div>

          <p className="relative text-center text-xs font-semibold uppercase tracking-[0.28em] text-navy/60">
            {eyebrow}
          </p>
          <h1 className="relative mt-2.5 text-center text-[1.75rem] font-bold tracking-tight text-navy-deep">
            {title}
          </h1>
          <p className="relative mt-2 text-center text-[14px] leading-6 text-slate-600">
            {subtitle}
          </p>

          <div className="relative">{children}</div>

          {footer && (
            <p className="relative mt-8 text-center text-[11px] leading-5 text-slate-500">
              {footer}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

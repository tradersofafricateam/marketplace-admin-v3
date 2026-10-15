import type { ReactNode } from "react";

export function ProfileSection({ title, children }: { title: string; children: ReactNode }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-navy-deep">{title}</h2><dl className="mt-4 grid gap-x-6 sm:grid-cols-2">{children}</dl></article>;
}

export function ProfileField({ label, children }: { label: string; children: ReactNode }) {
  return <div className="min-w-0 border-b border-slate-100 py-4"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-2 break-words text-sm font-medium text-navy-deep">{children === "" || children == null ? "—" : children}</dd></div>;
}

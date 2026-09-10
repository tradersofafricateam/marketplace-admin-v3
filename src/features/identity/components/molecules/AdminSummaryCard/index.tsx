import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Props = { label: string; value: number; icon: LucideIcon; href?: string; accent: string };

export function AdminSummaryCard({ label, value, icon: Icon, href, accent }: Props) {
  const content = <><span className={`grid size-11 place-items-center rounded-xl ${accent}`}><Icon size={20} /></span><div className="mt-5"><strong className="text-3xl font-bold text-navy-deep">{value}</strong><p className="mt-1 text-sm text-slate-500">{label}</p></div></>;
  return href ? <Link href={href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">{content}</Link> : <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{content}</article>;
}

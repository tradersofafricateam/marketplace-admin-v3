import type { LucideIcon } from "lucide-react";
import { StatusBadge } from "@/components/atoms/StatusBadge";

type MetricCardProps = { label: string; value: string; trend: string; icon: LucideIcon };

export function MetricCard({ label, value, trend, icon: Icon }: MetricCardProps) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="rounded-xl bg-sky-50 p-2.5 text-sky-600"><Icon size={20} /></div><StatusBadge tone="success">{trend}</StatusBadge></div><p className="mt-6 text-3xl font-bold text-navy-deep">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></article>;
}

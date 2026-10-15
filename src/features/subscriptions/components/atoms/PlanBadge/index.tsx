import type { PlanStatus } from "../../../types";
const colors = { draft: "bg-amber-50 text-amber-700", active: "bg-emerald-50 text-emerald-700", inactive: "bg-slate-100 text-slate-600", archived: "bg-slate-100 text-slate-600" };
export function PlanBadge({ status }: { status: PlanStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${colors[status]}`}>{status}</span>;
}

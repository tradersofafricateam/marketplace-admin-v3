import type { CategoryStatus } from "../../../types";
const colors = { active: "bg-emerald-50 text-emerald-700", inactive: "bg-amber-50 text-amber-700", archived: "bg-slate-100 text-slate-600", deleted: "bg-red-50 text-red-700" };
export function CategoryBadge({ status }: { status: CategoryStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${colors[status]}`}>{status}</span>;
}

import type { PlansQuery } from "../../../types";
import { PLAN_AUDIENCES, PLAN_STATUSES } from "../../../constants";
import { planFieldClass } from "../../atoms/PlanField";
export function PlansFilters({ query, onChange }: { query: PlansQuery; onChange: (query: Partial<PlansQuery>) => void }) {
  return <div className="flex flex-wrap gap-3 border-b border-slate-200 p-5">
    <select aria-label="Filter plans by status" value={query.status} onChange={(event) => onChange({ status: event.target.value as PlansQuery["status"] })} className={planFieldClass + " sm:w-auto"}><option value="">All statuses</option>{PLAN_STATUSES.map((status) => <option key={status}>{status}</option>)}</select>
    <select aria-label="Filter plans by audience" value={query.audience} onChange={(event) => onChange({ audience: event.target.value as PlansQuery["audience"] })} className={planFieldClass + " sm:w-auto"}><option value="">All audiences</option>{PLAN_AUDIENCES.map((audience) => <option key={audience}>{audience}</option>)}</select>
    <select aria-label="Filter free or paid plans" value={query.isFree} onChange={(event) => onChange({ isFree: event.target.value as PlansQuery["isFree"] })} className={planFieldClass + " sm:w-auto"}><option value="">Free and paid</option><option value="true">Free plans</option><option value="false">Paid plans</option></select>
    {(query.status || query.audience || query.isFree) && <button onClick={() => onChange({ status: "", audience: "", isFree: "" })} className="text-sm text-sky-700">Clear filters</button>}
  </div>;
}

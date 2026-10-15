import type { CategoryQuery, CategoryStatus } from "../../../types";
import { CATEGORY_STATUSES } from "../../../constants";
import { fieldClass } from "../../atoms/CategoryField";
import { CopyableId } from "@/components/atoms/CopyableId";
export function CategoryFilters({ query, update }: { query: CategoryQuery; update: (query: Partial<CategoryQuery>) => void }) {
  return <div className="space-y-3 border-b border-slate-200 p-5">
    <div className="flex flex-col gap-3 sm:flex-row">
      <form className="flex flex-1 gap-2" onSubmit={(event) => { event.preventDefault(); update({ search: String(new FormData(event.currentTarget).get("search")).trim(), page: 1 }); }}><input key={query.search} name="search" aria-label="Search categories" placeholder="Search categories" defaultValue={query.search} className={fieldClass} /><button className="rounded-xl bg-navy px-4 text-sm font-semibold text-white">Search</button></form>
      <select aria-label="Category status" className={fieldClass + " sm:w-40"} value={query.status} onChange={(event) => update({ status: event.target.value as CategoryStatus | "", page: 1 })}><option value="">All statuses</option>{CATEGORY_STATUSES.map((status) => <option key={status}>{status}</option>)}</select>
    </div>
    {query.parentId && <p className="text-sm">Subcategories of <CopyableId value={query.parentId} label="Parent ID" /></p>}
    {(query.search || query.status || query.parentId) && <button onClick={() => update({ search: "", status: "", parentId: "", page: 1 })} className="text-sm text-sky-700">Clear filters</button>}
  </div>;
}

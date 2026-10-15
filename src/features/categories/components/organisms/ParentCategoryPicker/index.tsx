"use client";
import { useState } from "react";
import { useCategories } from "../../../hooks/use-categories";
import { categoryName } from "../../../helpers";
import { QueryError } from "@/components/organisms/QueryError";
import { fieldClass } from "../../atoms/CategoryField";
export function ParentCategoryPicker({ value, onChange, excludeId }: { value: string | null; onChange: (value: string | null) => void; excludeId?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState("");
  const results = useCategories({ search, page, limit: 20 });
  return <div className="space-y-2 rounded-xl border border-slate-200 p-3">
    <label className="block text-sm font-semibold">Find parent category<input aria-label="Search parent categories" value={draft} onChange={(event) => setDraft(event.target.value)} className={fieldClass} /></label>
    <button type="button" onClick={() => { setSearch(draft.trim()); setPage(1); }} className="text-sm text-sky-700">Search parents</button>
    {results.isPending ? <p role="status" className="text-sm">Loading parents…</p> : results.isError ? <QueryError resource="parent categories" onRetry={() => { void results.refetch(); }} /> : <>
      <select aria-label="Parent category" value={value ?? ""} onChange={(event) => onChange(event.target.value || null)} className={fieldClass}>
        <option value="">No parent (top level)</option>
        {value && !results.data.data.some((item) => item.id === value) && <option value={value}>Current parent ({value})</option>}
        {results.data.data.filter((item) => item.id !== excludeId && item.status !== "deleted").map((item) => <option key={item.id} value={item.id}>{categoryName(item.name)} ({item.status})</option>)}
      </select>
      <div className="flex justify-between text-sm"><button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="disabled:opacity-40">Previous</button><span>Page {page}</span><button type="button" disabled={page >= results.data.pagination.totalPages} onClick={() => setPage(page + 1)} className="disabled:opacity-40">Next</button></div>
    </>}
  </div>;
}

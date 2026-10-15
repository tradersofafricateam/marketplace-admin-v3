"use client";
import { useState } from "react";
import { useCategories } from "../../../hooks/use-categories";
import { categoryName } from "../../../helpers";
import { QueryError } from "@/components/organisms/QueryError";
import { AdminPagination } from "@/features/identity/components/molecules/AdminPagination";
import { CategoriesSkeleton } from "../../templates/CategoriesSkeleton";
import { fieldClass } from "../../atoms/CategoryField";
export function ActiveCategories({ onSelect }: { onSelect: (id: string) => void }) {
  const [query, setQuery] = useState({ search: "", page: 1, limit: 20, parentId: "" });
  const categories = useCategories(query, true);
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <form className="flex gap-3 p-5" onSubmit={(event) => { event.preventDefault(); const search = String(new FormData(event.currentTarget).get("search")).trim(); setQuery({ ...query, search, page: 1 }); }}><input aria-label="Search active categories" name="search" placeholder="Search active categories" className={fieldClass} /><button className="text-sm font-semibold text-sky-700">Search</button></form>
    {query.parentId && <button className="px-5 pb-4 text-sm text-sky-700" onClick={() => setQuery({ ...query, parentId: "", page: 1 })}>Show all categories</button>}
    {categories.isPending ? <CategoriesSkeleton /> : categories.isError ? <QueryError resource="active categories" onRetry={() => { void categories.refetch(); }} /> : <>
      <ul className="divide-y divide-slate-100">{categories.data.data.map((category) => <li key={category.id} className="flex items-center justify-between gap-3 px-5 py-4"><button onClick={() => onSelect(category.id)} className="font-medium text-sky-700 hover:underline">{categoryName(category.name)}</button><button onClick={() => setQuery({ ...query, parentId: category.id, page: 1 })} className="text-sm text-slate-500">Subcategories ({category.childrenCount ?? "view"})</button></li>)}</ul>
      {!categories.data.data.length && <p className="p-5 text-sm text-slate-500">No active categories match your search.</p>}
      <AdminPagination itemLabel="categories" pagination={{ ...categories.data.pagination, page: Math.max(1, categories.data.pagination.page), totalPages: Math.max(1, categories.data.pagination.totalPages) }} onPageChange={(page) => setQuery({ ...query, page })} onLimitChange={(limit) => setQuery({ ...query, limit, page: 1 })} />
    </>}
  </section>;
}

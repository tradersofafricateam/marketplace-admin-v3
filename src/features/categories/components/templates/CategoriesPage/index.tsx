"use client";
import { useState } from "react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { QueryError } from "@/components/organisms/QueryError";
import { AdminPagination } from "@/features/identity/components/molecules/AdminPagination";
import { useCategories } from "../../../hooks/use-categories";
import { useCategoryQuery } from "../../../hooks/use-category-query";
import { useCategoryAccess } from "../../../hooks/use-category-access";
import type { Category, CategoryStatus } from "../../../types";
import { CategoriesTable } from "../../organisms/CategoriesTable";
import { CategoryForm } from "../../organisms/CategoryForm";
import { CategoryDetails } from "../../organisms/CategoryDetails";
import { CategoryStatusDialog } from "../../organisms/CategoryStatusDialog";
import { CategoryTree } from "../../organisms/CategoryTree";
import { ActiveCategories } from "../../organisms/ActiveCategories";
import { PublicCategoryDetails } from "../../organisms/PublicCategoryDetails";
import { CategoryFilters } from "../../molecules/CategoryFilters";
import { CategoriesSkeleton } from "../CategoriesSkeleton";

type Modal = { kind: "create" } | { kind: "edit" | "view"; category: Category } | { kind: "status"; category: Category; status: CategoryStatus } | { kind: "public"; id: string };
export function CategoriesPage() {
  const { query, update } = useCategoryQuery();
  const categories = useCategories(query);
  const { can } = useCategoryAccess();
  const [tab, setTab] = useState("Manage");
  const [modal, setModal] = useState<Modal | null>(null);
  const close = () => setModal(null);
  return <div className="space-y-7">
    <header className="flex flex-wrap items-end justify-between gap-4"><SectionTitle eyebrow="Commerce" title="Categories" description="Manage category structure, translations, and marketplace availability." />{can("create") && <button onClick={() => setModal({ kind: "create" })} className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white">Create category</button>}</header>
    <div role="group" aria-label="Category view" className="flex flex-wrap gap-2">{["Manage", "Active categories", "Hierarchy"].map((item) => <button key={item} aria-pressed={tab === item} onClick={() => setTab(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === item ? "bg-navy text-white" : "bg-white text-slate-600"}`}>{item}</button>)}</div>
    {tab === "Manage" && <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <CategoryFilters query={query} update={update} />
      {categories.isPending ? <CategoriesSkeleton /> : categories.isError ? <QueryError resource="categories" onRetry={() => { void categories.refetch(); }} /> : <>
        <CategoriesTable categories={categories.data.data} onView={(category) => setModal({ kind: "view", category })} onEdit={(category) => setModal({ kind: "edit", category })} onStatus={(category, status) => setModal({ kind: "status", category, status })} onChildren={(parentId) => update({ parentId, page: 1 })} />
        <AdminPagination itemLabel="categories" pagination={{ ...categories.data.pagination, page: Math.max(1, categories.data.pagination.page), totalPages: Math.max(1, categories.data.pagination.totalPages) }} onPageChange={(page) => update({ page })} onLimitChange={(limit) => update({ limit, page: 1 })} />
      </>}
    </section>}
    {tab === "Active categories" && <ActiveCategories onSelect={(id) => setModal({ kind: "public", id })} />}
    {tab === "Hierarchy" && <CategoryTree onSelect={(id) => setModal({ kind: "public", id })} />}
    {modal?.kind === "create" && <CategoryForm onClose={close} />}
    {modal?.kind === "edit" && <CategoryForm key={modal.category.id} category={modal.category} onClose={close} />}
    {modal?.kind === "view" && <CategoryDetails category={modal.category} onClose={close} />}
    {modal?.kind === "status" && <CategoryStatusDialog category={modal.category} status={modal.status} onClose={close} />}
    {modal?.kind === "public" && <PublicCategoryDetails id={modal.id} onClose={close} />}
  </div>;
}

"use client";

import { useState } from "react";
import { CategoryFilterSelect } from "@/features/categories/components/molecules/CategoryFilterSelect";
import { useRouter, useSearchParams } from "next/navigation";
import { Boxes, PackageCheck, PackageX, Search } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { QueryError } from "@/components/organisms/QueryError";
import { useProducts } from "../../../hooks";
import type { AdminProduct, ProductStatus, ProductsQuery } from "../../../types";
import { PRODUCT_STATUS_LABELS, PRODUCT_STATUS_OPTIONS } from "../../../constants";
import { ProductsPagination } from "../../molecules";
import { ChangeProductStatusModal, ProductsTable, ProductsTableSkeleton } from "../../organisms";

function baseQuery(overrides: Partial<ProductsQuery> = {}): ProductsQuery {
  return { search: "", status: "", page: 1, limit: 1, ...overrides };
}

export function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusTarget, setStatusTarget] = useState<AdminProduct | null>(null);
  const query: ProductsQuery = {
    search: searchParams.get("search") ?? "",
    categoryId: searchParams.get("categoryId") ?? "",
    status: (searchParams.get("status") ?? "") as ProductStatus | "",
    page: Math.max(1, Number(searchParams.get("page")) || 1),
    limit: [10, 20, 50].includes(Number(searchParams.get("limit"))) ? Number(searchParams.get("limit")) : 20,
  };
  const products = useProducts(query);
  const allProducts = useProducts(baseQuery());
  const activeProducts = useProducts(baseQuery({ status: "active" }));
  const draftProducts = useProducts(baseQuery({ status: "draft" }));

  function updateQuery(updates: Record<string, string | number>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => (value ? next.set(key, String(value)) : next.delete(key)));
    router.push(`/products?${next.toString()}`);
  }

  return (
    <div className="space-y-7">
      <SectionTitle eyebrow="Commerce" title="Products" description="Browse marketplace listings and moderate their lifecycle status." />
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
            <Boxes size={20} />
          </span>
          <div className="mt-5">
            <strong className="text-3xl font-bold text-navy-deep">{allProducts.data?.pagination.total ?? 0}</strong>
            <p className="mt-1 text-sm text-slate-500">Total products</p>
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <PackageCheck size={20} />
          </span>
          <div className="mt-5">
            <strong className="text-3xl font-bold text-navy-deep">{activeProducts.data?.pagination.total ?? 0}</strong>
            <p className="mt-1 text-sm text-slate-500">Active listings</p>
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-700">
            <PackageX size={20} />
          </span>
          <div className="mt-5">
            <strong className="text-3xl font-bold text-navy-deep">{draftProducts.data?.pagination.total ?? 0}</strong>
            <p className="mt-1 text-sm text-slate-500">Awaiting publish (draft)</p>
          </div>
        </article>
      </div>
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row">
          <form
            className="flex flex-1 gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              updateQuery({ search: String(data.get("search") ?? ""), page: 1 });
            }}
          >
            <label className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
              <Search size={17} className="text-slate-400" />
              <input name="search" defaultValue={query.search} placeholder="Search by product name" className="w-full bg-transparent text-sm outline-none" />
            </label>
            <button className="rounded-xl bg-navy px-4 text-sm font-semibold text-white">Search</button>
          </form>
          <CategoryFilterSelect value={query.categoryId ?? ""} onChange={(categoryId) => updateQuery({ categoryId, page: 1 })} />
          <select
            aria-label="Filter by status"
            value={query.status}
            onChange={(event) => updateQuery({ status: event.target.value, page: 1 })}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600"
          >
            <option value="">All statuses</option>
            {PRODUCT_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {PRODUCT_STATUS_LABELS[option]}
              </option>
            ))}
          </select>
        </div>
        {products.isPending ? (
          <ProductsTableSkeleton />
        ) : products.isError ? (
          <div className="p-5">
            <QueryError resource="products" onRetry={() => { void products.refetch(); }} />
          </div>
        ) : (
          <ProductsTable products={products.data?.data ?? []} onChangeStatus={setStatusTarget} />
        )}
        <ProductsPagination
          pagination={products.data?.pagination ?? { page: query.page, limit: query.limit, total: 0, totalPages: 1 }}
          onPageChange={(page) => updateQuery({ page })}
          onLimitChange={(limit) => updateQuery({ limit, page: 1 })}
        />
      </section>
      <ChangeProductStatusModal key={statusTarget?.id ?? "none"} product={statusTarget} onClose={() => setStatusTarget(null)} />
    </div>
  );
}

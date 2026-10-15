"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_STATUSES } from "../constants";
import type { CategoryQuery, CategoryStatus } from "../types";
export function useCategoryQuery() {
  const params = useSearchParams();
  const router = useRouter();
  const page = Number(params.get("page"));
  const status = params.get("status") as CategoryStatus;
  const query: CategoryQuery = { page: Number.isSafeInteger(page) && page > 0 ? page : 1, limit: [10, 20, 50].includes(Number(params.get("limit"))) ? Number(params.get("limit")) : 20, search: params.get("search") ?? "", status: CATEGORY_STATUSES.includes(status) ? status : "", parentId: params.get("parentId") ?? "" };
  function update(updates: Partial<CategoryQuery>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => value ? next.set(key, String(value)) : next.delete(key));
    router.push(`/categories?${next}`);
  }
  return { query, update };
}

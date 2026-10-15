import { createCategoryFormData } from "../helpers/create-category-form";
import { apiClient } from "@/lib/api";
import { ADMIN_CATEGORIES, PUBLIC_CATEGORIES } from "../constants";
import type { CreateCategoryInput, Category, CategoryAction, CategoryInput, CategoryNode, CategoryPage, CategoryQuery, StatusChange } from "../types";

export async function getCategories(query: CategoryQuery, publicOnly = false) {
  const { data } = await apiClient.get<CategoryPage>(publicOnly ? PUBLIC_CATEGORIES : ADMIN_CATEGORIES, {
    params: { ...query, search: query.search || undefined, status: publicOnly ? undefined : query.status || undefined, parentId: query.parentId || undefined },
  });
  return data;
}
export async function getCategoryTree() {
  const { data } = await apiClient.get<{ data: CategoryNode[] }>(`${PUBLIC_CATEGORIES}/tree`);
  return data.data;
}
export async function getPublicCategory(id: string) {
  const { data } = await apiClient.get<{ data: Category }>(`${PUBLIC_CATEGORIES}/${encodeURIComponent(id)}`);
  return data.data;
}
export async function createCategory(payload: CreateCategoryInput) {
  const { data } = await apiClient.post<CategoryAction>(ADMIN_CATEGORIES, createCategoryFormData(payload), { headers: { "Content-Type": undefined } });
  return data;
}
export async function updateCategory(id: string, payload: Partial<CategoryInput>) {
  const { data } = await apiClient.patch<CategoryAction>(`${ADMIN_CATEGORIES}/${encodeURIComponent(id)}`, payload);
  return data;
}
export async function changeCategoryStatus(id: string, payload: StatusChange) {
  const { data } = await apiClient.patch<CategoryAction>(`${ADMIN_CATEGORIES}/${encodeURIComponent(id)}/status`, payload);
  return data;
}

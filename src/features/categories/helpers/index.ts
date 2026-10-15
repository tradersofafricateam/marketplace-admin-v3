import type { Category, CategoryInput, CategoryStatus, Translation } from "../types";

export function categoryName(value?: Translation | null): string {
  return typeof value === "string" ? value : value?.en || Object.values(value ?? {}).find(Boolean) || "—";
}
export function statusActions(status: CategoryStatus): CategoryStatus[] {
  if (status === "deleted") return [];
  if (status === "archived") return ["active", "deleted"];
  return [status === "active" ? "inactive" : "active", "archived", "deleted"];
}
export function actionLabel(status: CategoryStatus) {
  return { active: "Activate / restore", inactive: "Deactivate", archived: "Archive", deleted: "Delete" }[status];
}
export function changedFields(input: CategoryInput, category?: Category): Partial<CategoryInput> {
  if (!category) return input;
  const old: CategoryInput = { name: categoryName(category.name), description: category.description ? categoryName(category.description) : "", parentId: category.parentId, icon: category.icon ?? null, image: category.image ?? null, sortOrder: category.sortOrder ?? 0 };
  return Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== old[key as keyof CategoryInput]));
}

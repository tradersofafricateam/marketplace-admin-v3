import type { CreateCategoryInput } from "../types";

export const CATEGORY_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function createCategoryFormData(input: CreateCategoryInput): FormData {
  if (!input.name.trim()) throw new Error("Category name is required.");
  const data = new FormData();
  data.append("name", input.name.trim());
  for (const key of ["description", "sourceLanguage", "parentId"] as const) {
    const value = input[key]?.trim();
    if (value) data.append(key, value);
  }
  if (input.sortOrder !== undefined) {
    if (!Number.isSafeInteger(input.sortOrder) || input.sortOrder < 0) throw new Error("Sort order must be a non-negative integer.");
    data.append("sortOrder", String(input.sortOrder));
  }
  for (const key of ["icon", "image"] as const) {
    const file = input[key];
    if (!file) continue;
    if (!CATEGORY_IMAGE_TYPES.includes(file.type)) throw new Error("Choose a JPEG, PNG or WebP file.");
    data.append(key, file, file.name);
  }
  return data;
}

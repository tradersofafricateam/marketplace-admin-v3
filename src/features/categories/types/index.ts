export type CategoryStatus = "active" | "inactive" | "archived" | "deleted";
export type Translation = string | Partial<Record<"en" | "fr" | "ar" | "sw" | "pt", string>>;
export type Category = {
  id: string; name: Translation; slug: string; parentId: string | null;
  status: CategoryStatus; sortOrder?: number; productsCount?: number; childrenCount?: number;
  description?: Translation | null; icon?: string | null; image?: string | null;
  createdBy?: string | { id: string; name: string }; updatedBy?: string | null;
  createdAt?: string; updatedAt?: string; deletedAt?: string | null;
};
export type CategoryNode = { id: string; name: Translation; slug: string; children: CategoryNode[] };
export type CategoryQuery = { search?: string; status?: CategoryStatus | ""; parentId?: string; page: number; limit: number };
export type CategoryPage = { success: boolean; data: Category[]; pagination: { page: number; limit: number; total: number; totalPages: number } };
export type CategoryInput = { name: string; description?: string; parentId?: string | null; icon?: string | null; image?: string | null; sortOrder?: number };
export type CategoryAction = { success: boolean; message: string; data?: Partial<Category> };
export type StatusChange = { status: CategoryStatus; reason: string };

export type CreateCategoryInput = {
  name: string; description?: string; sourceLanguage?: string; parentId?: string | null;
  sortOrder?: number; icon?: File; image?: File;
};

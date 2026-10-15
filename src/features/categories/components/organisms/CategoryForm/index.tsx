import type { Category } from "../../../types";
import { CreateCategoryForm } from "../CreateCategoryForm";
import { EditCategoryForm } from "../EditCategoryForm";

export function CategoryForm({ category, onClose }: { category?: Category; onClose: () => void }) {
  return category ? <EditCategoryForm category={category} onClose={onClose} /> : <CreateCategoryForm onClose={onClose} />;
}

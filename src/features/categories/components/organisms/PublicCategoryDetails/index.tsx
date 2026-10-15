"use client";
import { usePublicCategory } from "../../../hooks/use-categories";
import { CategoryDetails } from "../CategoryDetails";
import { CategoryDialog } from "../../molecules/CategoryDialog";
import { QueryError } from "@/components/organisms/QueryError";
export function PublicCategoryDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const category = usePublicCategory(id);
  if (category.isPending) return <CategoryDialog title="Category information" onClose={onClose}><p role="status">Loading category…</p></CategoryDialog>;
  if (category.isError) return <CategoryDialog title="Category information" onClose={onClose}><QueryError resource="category information" onRetry={() => { void category.refetch(); }} /></CategoryDialog>;
  return <CategoryDetails category={category.data} onClose={onClose} />;
}

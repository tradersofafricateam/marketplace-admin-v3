import Link from "next/link";
import { CopyableId } from "@/components/atoms/CopyableId";
import type { Category } from "../../../types";
import { CategoryDialog } from "../../molecules/CategoryDialog";
import { CategoryTranslations } from "../../molecules/CategoryTranslations";
import { CategoryBadge } from "../../atoms/CategoryBadge";
export function CategoryDetails({ category, onClose }: { category: Category; onClose: () => void }) {
  const creator = typeof category.createdBy === "string" ? category.createdBy : category.createdBy?.id;
  return <CategoryDialog title="Category information" onClose={onClose}>
    <div className="space-y-5">
      <div className="flex items-center justify-between"><CopyableId value={category.id} label="Category ID" /><CategoryBadge status={category.status} /></div>
      <section><h3 className="mb-2 font-semibold">Name & translations</h3><CategoryTranslations value={category.name} /></section>
      {category.description !== undefined && <section><h3 className="mb-2 font-semibold">Description</h3><CategoryTranslations value={category.description} /></section>}
      <dl className="grid gap-4 text-sm sm:grid-cols-2">{[["Slug", category.slug], ["Sort order", category.sortOrder], ["Products", category.productsCount], ["Subcategories", category.childrenCount], ["Created", category.createdAt], ["Updated", category.updatedAt], ["Icon", category.icon]].map(([label, value]) => <div key={label}><dt className="text-slate-500">{label}</dt><dd className="break-words">{value ?? "—"}</dd></div>)}</dl>
      {category.parentId && <p className="text-sm">Parent: <CopyableId value={category.parentId} label="Parent category ID" href={`/categories?parentId=${encodeURIComponent(category.parentId)}`} /></p>}
      {creator && <p className="text-sm">Created by: <CopyableId value={creator} label="Admin ID" href={`/admin-users/${encodeURIComponent(creator)}`} /></p>}
      {category.image && /^https?:\/\//i.test(category.image) && <a href={category.image} target="_blank" rel="noreferrer" className="text-sm text-sky-700 underline">View category image</a>}
      <Link href={`/products?categoryId=${encodeURIComponent(category.id)}`} className="block text-sm font-semibold text-sky-700 hover:underline">View products in this category</Link>
    </div>
  </CategoryDialog>;
}

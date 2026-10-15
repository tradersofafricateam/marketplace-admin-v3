"use client";
import { useState } from "react";
import type { Category, CategoryInput } from "../../../types";
import { categoryName, changedFields } from "../../../helpers";
import { useCategoryMutation } from "../../../hooks/use-category-mutation";
import { CategoryField, fieldClass } from "../../atoms/CategoryField";
import { CategoryDialog } from "../../molecules/CategoryDialog";
import { ParentCategoryPicker } from "../ParentCategoryPicker";
import { getApiErrorMessage } from "@/lib/api";
export function EditCategoryForm({ category, onClose }: { category: Category; onClose: () => void }) {
  const [parentId, setParentId] = useState(category?.parentId ?? null as string | null);
  const mutation = useCategoryMutation();
  return <CategoryDialog title={category ? "Edit category" : "Create category"} onClose={onClose} busy={mutation.isPending}>
    <form className="space-y-4" onSubmit={(event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const name = String(form.get("name")).trim();
      if (!name) return;
      const input: CategoryInput = { name, description: String(form.get("description")).trim(), parentId, icon: String(form.get("icon")).trim() || null, image: String(form.get("image")).trim() || null, sortOrder: Number(form.get("sortOrder")) };
      const payload = changedFields(input, category);
      if (category && !Object.keys(payload).length) { onClose(); return; }
      mutation.mutate({ kind: "edit", id: category.id, payload }, { onSuccess: onClose });
    }}>
      <fieldset disabled={mutation.isPending} className="space-y-4">
        <CategoryField label="Category name (English)" name="name" required pattern=".*\S.*" defaultValue={category ? categoryName(category.name) : ""} />
        <label className="block space-y-2 text-sm font-medium">Description (English)<textarea name="description" rows={3} defaultValue={category?.description ? categoryName(category.description) : ""} className={fieldClass} /></label>
        <ParentCategoryPicker value={parentId} onChange={setParentId} excludeId={category?.id} />
        <div className="grid gap-4 sm:grid-cols-2"><CategoryField label="Icon name" name="icon" defaultValue={category?.icon ?? ""} /><CategoryField label="Sort order" name="sortOrder" type="number" min={0} step={1} required defaultValue={category?.sortOrder ?? 0} /></div>
        <CategoryField label="Image URL" name="image" type="url" defaultValue={category?.image ?? ""} />
        {mutation.error && <p role="alert" className="text-sm text-red-600">{getApiErrorMessage(mutation.error, "Unable to save category.")}</p>}
        <footer className="flex justify-end gap-3"><button type="button" onClick={onClose}>Cancel</button><button className="rounded-xl bg-navy px-5 py-2.5 font-semibold text-white">{mutation.isPending ? "Saving…" : "Save category"}</button></footer>
      </fieldset>
    </form>
  </CategoryDialog>;
}

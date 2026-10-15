"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { getApiErrorMessage } from "@/lib/api";
import { useCategoryMutation } from "../../../hooks/use-category-mutation";
import { CategoryLanguageSelect } from "../../molecules/CategoryLanguageSelect";
import { CategoryField, fieldClass } from "../../atoms/CategoryField";
import { CategoryDialog } from "../../molecules/CategoryDialog";
import { CategoryUpload } from "../../molecules/CategoryUpload";
import { ParentCategoryPicker } from "../ParentCategoryPicker";

export function CreateCategoryForm({ onClose }: { onClose: () => void }) {
  const mutation = useCategoryMutation();
  const [parentId, setParentId] = useState<string | null>(null);
  const [icon, setIcon] = useState<File>();
  const [image, setImage] = useState<File>();
  return (
    <CategoryDialog title="Create category" onClose={onClose} busy={mutation.isPending}>
      <p className="mb-6 text-sm text-slate-500">Start with a name. Add visuals and organise the category when needed.</p>
      <form onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const order = String(form.get("sortOrder") ?? "").trim();
        mutation.mutate({ kind: "create", payload: {
          name: String(form.get("name") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          sourceLanguage: String(form.get("sourceLanguage") ?? ""),
          parentId, sortOrder: order ? Number(order) : undefined, icon, image,
        } }, { onSuccess: onClose });
      }}>
        <fieldset disabled={mutation.isPending} className="space-y-6">
          <section className="space-y-4">
            <h3 className="font-semibold">Category details</h3>
            <CategoryField label="Category name *" name="name" required placeholder="e.g. Agriculture" />
            <label className="block space-y-2 text-sm font-medium">Description <span className="text-slate-400">Optional</span><textarea name="description" rows={3} placeholder="Describe the products in this category" className={fieldClass} /></label>
            <CategoryLanguageSelect />
          </section>
          <section className="space-y-4 border-t border-slate-100 pt-5">
            <h3 className="font-semibold">Category visuals</h3>
            <div className="grid gap-5 sm:grid-cols-2"><CategoryUpload label="Icon" hint="A small visual to identify this category." file={icon} onChange={setIcon} /><CategoryUpload label="Image" hint="A cover image that represents the category." file={image} onChange={setImage} /></div>
          </section>
          <details className="rounded-xl border border-slate-200 p-4">
            <summary className="cursor-pointer text-sm font-semibold">Organisation <span className="font-normal text-slate-400">Optional</span></summary>
            <div className="mt-4 space-y-4"><ParentCategoryPicker value={parentId} onChange={setParentId} /><CategoryField label="Sort order" name="sortOrder" type="number" min={0} step={1} placeholder="Use default order" /></div>
          </details>
          {mutation.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{getApiErrorMessage(mutation.error, "Unable to create category.")}</p>}
          <footer className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white">{mutation.isPending && <LoaderCircle size={16} className="animate-spin" />}{mutation.isPending ? "Creating…" : "Create category"}</button></footer>
        </fieldset>
      </form>
    </CategoryDialog>
  );
}

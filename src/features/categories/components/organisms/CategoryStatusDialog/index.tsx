"use client";
import type { Category, CategoryStatus } from "../../../types";
import { actionLabel, categoryName } from "../../../helpers";
import { useCategoryMutation } from "../../../hooks/use-category-mutation";
import { CategoryDialog } from "../../molecules/CategoryDialog";
import { fieldClass } from "../../atoms/CategoryField";
import { getApiErrorMessage } from "@/lib/api";
export function CategoryStatusDialog({ category, status, onClose }: { category: Category; status: CategoryStatus; onClose: () => void }) {
  const mutation = useCategoryMutation();
  return <CategoryDialog title={`${actionLabel(status)} category`} onClose={onClose} busy={mutation.isPending}>
    <p className="mb-4 text-sm">{categoryName(category.name)} — {status === "deleted" ? "This removes the category from normal use. Historical relationships are retained, and it cannot be restored here." : "Existing product relationships are retained."}</p>
    <form className="space-y-4" onSubmit={(event) => {
      event.preventDefault();
      const reason = String(new FormData(event.currentTarget).get("reason")).trim();
      if (!reason) return;
      mutation.mutate({ kind: "status", id: category.id, payload: { status, reason } }, { onSuccess: onClose });
    }}>
      <label className="block space-y-2 text-sm">Reason<textarea name="reason" required rows={3} className={fieldClass} disabled={mutation.isPending} /></label>
      {mutation.error && <p role="alert" className="text-sm text-red-600">{getApiErrorMessage(mutation.error, "Unable to change status.")}</p>}
      <footer className="flex justify-end gap-3"><button type="button" disabled={mutation.isPending} onClick={onClose}>Cancel</button><button disabled={mutation.isPending} className={`rounded-xl px-4 py-2 text-white disabled:opacity-50 ${status === "deleted" ? "bg-red-600" : "bg-navy"}`}>{mutation.isPending ? "Saving…" : actionLabel(status)}</button></footer>
    </form>
  </CategoryDialog>;
}

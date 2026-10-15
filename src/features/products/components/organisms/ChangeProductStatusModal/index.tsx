"use client";

import { useState } from "react";
import { AlertTriangle, LoaderCircle, X } from "lucide-react";
import { useChangeProductStatus } from "../../../hooks";
import { PRODUCT_STATUS_LABELS } from "../../../constants";
import { getAvailableStatusTransitions, localizedText } from "../../../helpers";
import { getApiErrorMessage } from "@/lib/api";
import type { AdminProduct, ProductStatus } from "../../../types";

export function ChangeProductStatusModal({ product, onClose }: { product: AdminProduct | null; onClose: () => void }) {
  const mutation = useChangeProductStatus();
  const options = product ? getAvailableStatusTransitions(product.status) : [];
  const [status, setStatus] = useState<ProductStatus | null>(options[0] ?? null);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="change-status-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <div>
            <h2 id="change-status-title" className="text-xl font-bold text-navy-deep">Change product status</h2>
            <p className="mt-1 text-sm text-slate-500">{localizedText(product.productName)}</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>

        {options.length === 0 ? (
          <div className="mt-6 space-y-5">
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              {PRODUCT_STATUS_LABELS[product.status]} is a terminal status — no further status changes are available.
            </p>
            <div className="flex justify-end">
              <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Close</button>
            </div>
          </div>
        ) : (
          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (!status) return;
              mutation.mutate({ productId: product.id, status }, { onSuccess: onClose });
            }}
          >
            <label className="block space-y-2 text-sm font-semibold text-navy-deep">
              New status
              <select value={status ?? ""} onChange={(event) => setStatus(event.target.value as ProductStatus)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal">
                {options.map((option) => (
                  <option key={option} value={option}>
                    {PRODUCT_STATUS_LABELS[option]}
                  </option>
                ))}
              </select>
            </label>
            {status === "pending_approval" && (
              <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Submit this product for admin approval. Content edits return it to draft; inventory updates do not.</p>
            )}
            {product.status === "pending_approval" && status === "draft" && (
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Withdraw this submission and return the product to draft.</p>
            )}
            {status === "archived" && (
              <p className="flex gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                Archived products are removed from the storefront and cannot receive Orders or RFQs. Historical records are retained.
              </p>
            )}
            {status === "deleted" && (
              <p className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                This removes the product from the seller&apos;s catalog. Reserve this for policy violations — the record is retained for existing Orders.
              </p>
            )}
            {mutation.error && <p className="text-sm text-red-600">{getApiErrorMessage(mutation.error)}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
                Cancel
              </button>
              <button disabled={mutation.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                {mutation.isPending && <LoaderCircle className="animate-spin" size={16} />}
                Save status
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

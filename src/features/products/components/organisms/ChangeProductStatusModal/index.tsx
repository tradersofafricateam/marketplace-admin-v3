"use client";

import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { useChangeProductStatus } from "../../../hooks";
import { localizedText } from "../../../helpers";
import { getApiErrorMessage } from "@/lib/api";
import type { AdminProduct } from "../../../types";

export function ChangeProductStatusModal({ product, onClose }: { product: AdminProduct | null; onClose: () => void }) {
  const mutation = useChangeProductStatus();
  const [action, setAction] = useState<"approve" | "reject">("approve");

  const [reason, setReason] = useState("");

  if (!product || product.status === "rejected") return null;

  const effectiveAction = product.status === "pending_approval" ? action : "reject";
  const isRejection = effectiveAction === "reject";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="change-status-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <div>
            <h2 id="change-status-title" className="text-xl font-bold text-navy-deep">Review product</h2>
            <p className="mt-1 text-sm text-slate-500">{localizedText(product.productName)}</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (mutation.isPending || (isRejection && !reason.trim())) return;
              const input = isRejection
                ? { productId: product.id, currentStatus: product.status, action: "reject" as const, reason: reason.trim() }
                : { productId: product.id, currentStatus: product.status, action: "approve" as const };
              mutation.mutate(input, { onSuccess: onClose });
            }}
          >
            <label className="block space-y-2 text-sm font-semibold text-navy-deep">
              Action
              <select value={effectiveAction} onChange={(event) => setAction(event.target.value as "approve" | "reject")} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal">
                {product.status === "pending_approval" && <option value="approve">Approve product</option>}
                <option value="reject">Reject product</option>
              </select>
            </label>
            {isRejection && (
              <label className="block space-y-2 text-sm font-semibold text-navy-deep">
                Rejection reason
                <textarea required value={reason} onChange={(event) => setReason(event.target.value)} rows={3} placeholder="Explain what the seller needs to fix" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal" />
              </label>
            )}
            {mutation.error && <p className="text-sm text-red-600">{getApiErrorMessage(mutation.error)}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
                Cancel
              </button>
              <button disabled={mutation.isPending || (isRejection && !reason.trim())} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                {mutation.isPending && <LoaderCircle className="animate-spin" size={16} />}
                {isRejection ? "Reject product" : "Approve product"}
              </button>
            </div>
          </form>
      </section>
    </div>
  );
}

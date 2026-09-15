"use client";

import { LoaderCircle, X } from "lucide-react";
import { useApproveSeller } from "../../../hooks";
import { getApiErrorMessage } from "@/lib/api";

export function ApproveSellerModal({ open, verificationId, companyName, onClose }: { open: boolean; verificationId: string; companyName: string; onClose: () => void }) {
  const approveSeller = useApproveSeller();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="approve-seller-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <div>
            <h2 id="approve-seller-title" className="text-xl font-bold text-navy-deep">Approve seller</h2>
            <p className="mt-1 text-sm text-slate-500">{companyName}</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            approveSeller.mutate({ verificationId, payload: { notes: String(data.get("notes") ?? "") } }, { onSuccess: onClose });
          }}
        >
          <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
            This seller will be verified and can immediately list products, respond to RFQs, and receive orders.
          </p>
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Notes (optional)
            <textarea name="notes" rows={3} placeholder="e.g. Documents verified" className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-sky-500" />
          </label>
          {approveSeller.error && <p className="text-sm text-red-600">{getApiErrorMessage(approveSeller.error)}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
              Cancel
            </button>
            <button disabled={approveSeller.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {approveSeller.isPending && <LoaderCircle className="animate-spin" size={16} />}
              Approve seller
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

"use client";

import { LoaderCircle, X } from "lucide-react";
import { useRejectSeller } from "../../../hooks";
import { REJECT_SELLER_REASON_MIN_LENGTH } from "../../../constants";
import { getApiErrorMessage } from "@/lib/api";

export function RejectSellerModal({ open, verificationId, companyName, onClose }: { open: boolean; verificationId: string; companyName: string; onClose: () => void }) {
  const rejectSeller = useRejectSeller();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="reject-seller-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <div>
            <h2 id="reject-seller-title" className="text-xl font-bold text-navy-deep">Reject seller</h2>
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
            rejectSeller.mutate({ verificationId, payload: { reason: String(data.get("reason") ?? "").trim() } }, { onSuccess: onClose });
          }}
        >
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Reason for rejection
            <textarea
              name="reason"
              required
              minLength={REJECT_SELLER_REASON_MIN_LENGTH}
              rows={4}
              placeholder="e.g. Invalid registration document"
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-sky-500"
            />
            <span className="block text-xs font-normal text-slate-400">At least {REJECT_SELLER_REASON_MIN_LENGTH} characters. The applicant will see this reason and may resubmit.</span>
          </label>
          {rejectSeller.error && <p className="text-sm text-red-600">{getApiErrorMessage(rejectSeller.error)}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
              Cancel
            </button>
            <button disabled={rejectSeller.isPending} className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {rejectSeller.isPending && <LoaderCircle className="animate-spin" size={16} />}
              Reject seller
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

"use client";

import { LoaderCircle, X } from "lucide-react";
import { useCreateCurrency } from "../../../hooks";
import { getApiErrorMessage } from "@/lib/api";

export function CreateCurrencyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createCurrency = useCreateCurrency();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="create-currency-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <h2 id="create-currency-title" className="text-xl font-bold text-navy-deep">Add currency</h2>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            createCurrency.mutate(
              {
                code: String(data.get("code")),
                name: String(data.get("name")),
                symbol: String(data.get("symbol") ?? ""),
                decimalPlaces: Number(data.get("decimalPlaces")) || 2,
              },
              { onSuccess: onClose },
            );
          }}
        >
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Currency name
            <input name="name" required className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            ISO code
            <input name="code" required maxLength={3} placeholder="NGN" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal uppercase outline-none focus:border-sky-500" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Symbol
            <input name="symbol" placeholder="₦" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Decimal places
            <input name="decimalPlaces" type="number" defaultValue={2} min={0} max={4} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500" />
          </label>
          {createCurrency.error && <p className="text-sm text-red-600">{getApiErrorMessage(createCurrency.error)}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
            <button disabled={createCurrency.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {createCurrency.isPending && <LoaderCircle className="animate-spin" size={16} />}
              Add currency
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

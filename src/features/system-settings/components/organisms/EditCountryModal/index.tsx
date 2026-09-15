"use client";

import { LoaderCircle, X } from "lucide-react";
import { useUpdateCountry } from "../../../hooks";
import { getApiErrorMessage } from "@/lib/api";
import type { Country } from "../../../types";

export function EditCountryModal({ country, onClose }: { country: Country | null; onClose: () => void }) {
  const updateCountry = useUpdateCountry();
  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="edit-country-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <h2 id="edit-country-title" className="text-xl font-bold text-navy-deep">Edit country</h2>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            updateCountry.mutate(
              { countryId: country.id, payload: { name: String(data.get("name")), phoneCode: String(data.get("phoneCode") ?? "") } },
              { onSuccess: onClose },
            );
          }}
        >
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Country name
            <input name="name" required defaultValue={country.name} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Phone code
            <input name="phoneCode" defaultValue={country.phoneCode} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500" />
          </label>
          {updateCountry.error && <p className="text-sm text-red-600">{getApiErrorMessage(updateCountry.error)}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
            <button disabled={updateCountry.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {updateCountry.isPending && <LoaderCircle className="animate-spin" size={16} />}
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

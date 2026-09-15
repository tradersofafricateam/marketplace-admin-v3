"use client";

import { LoaderCircle, X } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  subtitle?: string;
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  description?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function StatusToggleModal({
  open,
  title,
  subtitle,
  isActive,
  activeLabel = "Activate",
  inactiveLabel = "Deactivate",
  description,
  isPending,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;
  const activating = !isActive;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="status-toggle-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <div>
            <h2 id="status-toggle-title" className="text-xl font-bold text-navy-deep">
              {activating ? activeLabel : inactiveLabel} {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <p className="mt-6 rounded-xl bg-sky-50 p-4 text-sm text-slate-600">
          {description ?? `Are you sure you want to ${activating ? "activate" : "deactivate"} this ${title.toLowerCase()}?`}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isPending && <LoaderCircle className="animate-spin" size={16} />}
            {activating ? activeLabel : inactiveLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export function PlanDialog({ title, children, busy = false, onClose }: { title: string; children: ReactNode; busy?: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  return <dialog ref={ref} aria-label={title} onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }} className="fixed inset-0 m-auto max-h-[90vh] w-[min(95vw,60rem)] overflow-y-auto rounded-2xl bg-white p-6 text-navy-deep shadow-xl backdrop:bg-navy-deep/55"><header className="mb-5 flex items-center justify-between gap-4"><h2 className="text-xl font-bold">{title}</h2><button type="button" disabled={busy} onClick={onClose} aria-label="Close dialog" className="rounded p-2 hover:bg-slate-100"><X size={18} /></button></header>{children}</dialog>;
}

"use client";

import { LoaderCircle, X } from "lucide-react";
import { useChangeAdminStatus } from "../../../hooks";
import type { AdminAccount } from "../../../types";

export function AdminStatusModal({ admin, onClose }: { admin: AdminAccount | null; onClose: () => void }) {
  const mutation = useChangeAdminStatus();
  if (!admin) return null;
  const activating = admin.status !== "active";
  return <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm"><section role="dialog" aria-modal="true" aria-labelledby="status-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><header className="flex items-start justify-between"><div><h2 id="status-title" className="text-xl font-bold text-navy-deep">{activating ? "Reactivate" : "Deactivate"} administrator</h2><p className="mt-1 text-sm text-slate-500">{admin.firstName} {admin.lastName}</p></div><button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></header><form className="mt-6 space-y-5" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); mutation.mutate({ adminId: admin.id, action: activating ? "activate" : "deactivate", reason: String(data.get("reason") ?? "") }, { onSuccess: onClose }); }}>{activating ? <p className="rounded-xl bg-sky-50 p-4 text-sm text-slate-600">This administrator will regain access according to their assigned role.</p> : <label className="block space-y-2 text-sm font-semibold text-navy-deep">Reason for deactivation<textarea name="reason" required rows={4} placeholder="For example: Left the organization" className="w-full resize-none rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-sky-500" /></label>}<div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button disabled={mutation.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white">{mutation.isPending && <LoaderCircle className="animate-spin" size={16} />}{activating ? "Reactivate admin" : "Deactivate admin"}</button></div></form></section></div>;
}

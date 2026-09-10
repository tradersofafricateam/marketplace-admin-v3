"use client";

import { LoaderCircle, X } from "lucide-react";
import { useAdminRoles, useUpdateAdmin } from "../../../hooks";
import type { AdminAccount } from "../../../types";

export function EditAdminRoleModal({ admin, onClose }: { admin: AdminAccount | null; onClose: () => void }) {
  const roles = useAdminRoles();
  const updateAdmin = useUpdateAdmin();
  if (!admin) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm"><section role="dialog" aria-modal="true" aria-labelledby="edit-role-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><header className="flex items-start justify-between"><div><h2 id="edit-role-title" className="text-xl font-bold text-navy-deep">Edit administrator role</h2><p className="mt-1 text-sm text-slate-500">{admin.firstName} {admin.lastName}</p></div><button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></header><form className="mt-6 space-y-5" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); updateAdmin.mutate({ adminId: admin.id, roleId: String(data.get("roleId")) }, { onSuccess: onClose }); }}><label className="block space-y-2 text-sm font-semibold text-navy-deep">Assigned role<select name="roleId" defaultValue={admin.role.id} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal">{roles.data?.data.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label><div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button disabled={updateAdmin.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white">{updateAdmin.isPending && <LoaderCircle className="animate-spin" size={16} />}Save role</button></div></form></section></div>;
}

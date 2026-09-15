"use client";

import { LoaderCircle, X } from "lucide-react";
import { useAdminRoles, useUpdateAdmin } from "../../../hooks";
import type { AdminAccount } from "../../../types";

export function EditAdminAccountModal({ admin, open, onClose }: { admin: AdminAccount; open: boolean; onClose: () => void }) {
  const roles = useAdminRoles();
  const mutation = useUpdateAdmin();
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm"><section role="dialog" aria-modal="true" aria-labelledby="edit-admin-title" className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl"><header className="flex items-start justify-between"><div><h2 id="edit-admin-title" className="text-xl font-bold text-navy-deep">Edit administrator</h2><p className="mt-1 text-sm text-slate-500">Update profile details and assigned role.</p></div><button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></header><form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); mutation.mutate({ adminId: admin.id, payload: { firstName: String(data.get("firstName")), lastName: String(data.get("lastName")), phoneNumber: String(data.get("phoneNumber")), roleId: String(data.get("roleId")) } }, { onSuccess: onClose }); }}><Field name="firstName" label="First name" defaultValue={admin.firstName} /><Field name="lastName" label="Last name" defaultValue={admin.lastName} /><Field name="phoneNumber" label="Phone number" defaultValue={admin.phoneNumber} /><label className="space-y-2 text-sm font-semibold text-navy-deep">Role<select name="roleId" defaultValue={admin.role.id} disabled={admin.isSuperAdmin} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal disabled:bg-slate-50">{roles.data?.data.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label><footer className="flex justify-end gap-3 border-t border-slate-100 pt-5 sm:col-span-2"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button disabled={mutation.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white">{mutation.isPending && <LoaderCircle className="animate-spin" size={16} />}Save changes</button></footer></form></section></div>;
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return <label className="space-y-2 text-sm font-semibold text-navy-deep">{label}<input name={name} defaultValue={defaultValue} required className="h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-sky-500" /></label>;
}

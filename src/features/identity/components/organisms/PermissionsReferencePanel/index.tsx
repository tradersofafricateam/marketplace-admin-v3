"use client";

import { usePermissions } from "../../../hooks";

export function PermissionsReferencePanel() {
  const permissions = usePermissions();
  const groups = permissions.data?.data ?? [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-bold text-navy-deep">Available permissions</h2>
      <p className="mt-1 text-sm text-slate-500">
        Permissions are defined by the platform and grouped by module. Assign them to roles rather than creating new ones here.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.module} className="rounded-xl border border-slate-100 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wide text-sky-600 capitalize">{group.module.replace(/_/g, " ")}</h3>
            <ul className="mt-2 space-y-1">
              {group.permissions.map((permission) => (
                <li key={permission.id} className="text-sm text-slate-600">{permission.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

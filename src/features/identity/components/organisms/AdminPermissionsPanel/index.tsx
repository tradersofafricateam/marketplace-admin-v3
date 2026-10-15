"use client";

import { useState } from "react";
import { Check, Search } from "lucide-react";
import type { RolePermissionSummary } from "../../../types";

function readable(value: string) {
  const words = value.replace(/[_.-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function AdminPermissionsPanel({ permissions, rolePermissions = [] }: {
  permissions: string[];
  rolePermissions?: RolePermissionSummary[];
}) {
  const [search, setSearch] = useState("");
  const names = new Map(rolePermissions.map((permission) => [permission.code, permission.name]));
  const entries = [...new Set(permissions)].map((code) => {
    const separator = code.indexOf(".");
    return {
      code,
      module: separator > 0 ? readable(code.slice(0, separator)) : "General",
      name: names.get(code) || (code === "*" ? "All permissions" : readable(code.slice(separator + 1))),
    };
  });
  const term = search.trim().toLowerCase();
  const filtered = entries.filter(({ code, module, name }) => `${code} ${module} ${name}`.toLowerCase().includes(term));
  const groups = new Map<string, typeof entries>();
  for (const entry of filtered) {
    const group = groups.get(entry.module) ?? [];
    group.push(entry);
    groups.set(entry.module, group);
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-navy-deep">Effective permissions</h2>
          <p className="mt-1 text-sm text-slate-500">Assigned access, grouped by module.</p>
        </div>
        <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">{entries.length} permissions</span>
      </div>
      {entries.length > 0 ? (
        <>
          <label className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-sky-500">
            <Search size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
            <input type="search" aria-label="Search permissions" placeholder="Search modules or permissions" value={search} onChange={(event) => setSearch(event.target.value)} className="w-full min-w-0 bg-transparent text-sm outline-none" />
          </label>
          <div className="mt-4 space-y-4">
            {[...groups].sort(([a], [b]) => a.localeCompare(b)).map(([module, items]) => (
              <section key={module} className="overflow-hidden rounded-xl border border-slate-200">
                <h3 className="flex items-center justify-between bg-slate-50 px-4 py-3 text-sm font-semibold text-navy-deep">
                  {module}<span className="text-xs font-medium text-slate-500">{items.length}</span>
                </h3>
                <ul className="grid gap-x-4 gap-y-3 p-4 sm:grid-cols-2">
                  {items.sort((a, b) => a.name.localeCompare(b.name)).map(({ code, name }) => (
                    <li key={code} className="flex items-start gap-2 text-sm text-slate-700" title={code}>
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span className="break-words">{name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {filtered.length === 0 && <p role="status" className="mt-4 text-sm text-slate-500">No permissions match your search.</p>}
        </>
      ) : <p className="mt-5 text-sm text-slate-500">No effective permissions assigned.</p>}
    </article>
  );
}

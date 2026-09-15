"use client";

import type { PermissionGroup } from "../../../types";

type Props = {
  groups: PermissionGroup[];
  selected: string[];
  onChange: (permissionIds: string[]) => void;
};

export function PermissionGroupPicker({ groups, selected, onChange }: Props) {
  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  }

  function toggleGroup(group: PermissionGroup, checked: boolean) {
    const ids = group.permissions.map((permission) => permission.id);
    onChange(checked ? [...new Set([...selected, ...ids])] : selected.filter((id) => !ids.includes(id)));
  }

  return (
    <div className="max-h-80 space-y-4 overflow-y-auto rounded-xl border border-slate-200 p-4">
      {groups.map((group) => {
        const ids = group.permissions.map((permission) => permission.id);
        const allSelected = ids.length > 0 && ids.every((id) => selected.includes(id));
        return (
          <div key={group.module} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
            <label className="flex items-center gap-2 text-sm font-bold capitalize text-navy-deep">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(event) => toggleGroup(group, event.target.checked)}
                className="size-4 rounded border-slate-300"
              />
              {group.module.replace(/_/g, " ")}
            </label>
            <div className="mt-2 grid gap-2 pl-6 sm:grid-cols-2">
              {group.permissions.map((permission) => (
                <label key={permission.id} className="flex items-start gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={selected.includes(permission.id)}
                    onChange={() => toggle(permission.id)}
                    className="mt-0.5 size-4 rounded border-slate-300"
                  />
                  <span>{permission.name}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { MoreHorizontal } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { cn } from "@/lib/utils";
import type { AdminRole } from "../../../types";

type Props = {
  roles: AdminRole[];
  onEdit: (role: AdminRole) => void;
  onToggleStatus: (role: AdminRole) => void;
};

export function RolesTable({ roles, onEdit, onToggleStatus }: Props) {
  const columns: DataTableColumn<AdminRole>[] = [
    {
      key: "name",
      header: "Role",
      render: (role) => (
        <div>
          <strong className="block text-sm text-navy-deep">{role.name}</strong>
          {role.description && <span className="text-xs text-slate-500">{role.description}</span>}
        </div>
      ),
    },
    {
      key: "permissions",
      header: "Permissions",
      render: (role) => <span className="text-slate-700">{role.permissions?.length ?? 0} assigned</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (role) => (
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
            role.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
          )}
        >
          {role.status ?? "active"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (role) => (
        <details className="relative">
          <summary className="list-none cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <MoreHorizontal size={18} />
          </summary>
          <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl">
            <button onClick={() => onEdit(role)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">
              Edit role
            </button>
            <button onClick={() => onToggleStatus(role)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">
              {role.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        </details>
      ),
    },
  ];
  return <DataTable columns={columns} data={roles} getRowKey={(role) => role.id} emptyMessage="No admin roles yet." />;
}

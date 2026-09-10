"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { AdminStatusBadge } from "../../atoms";
import { formatAdminDate, getInitials } from "../../../helpers";
import type { AdminAccount } from "../../../types";

type Props = { admins: AdminAccount[]; onEditRole: (admin: AdminAccount) => void; onToggleStatus: (admin: AdminAccount) => void };

export function AdminUsersTable({ admins, onEditRole, onToggleStatus }: Props) {
  const columns: DataTableColumn<AdminAccount>[] = [
    { key: "admin", header: "Admin", render: (admin) => <Link href={`/admin-users/${admin.id}`} className="group flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-50 text-xs font-bold text-navy">{getInitials(admin.firstName, admin.lastName)}</span><span><strong className="block text-sm text-navy-deep group-hover:text-sky-700">{admin.firstName} {admin.lastName}</strong><span className="text-xs text-slate-500">{admin.email}</span></span></Link> },
    { key: "role", header: "Role", render: (admin) => <span className="text-slate-700">{admin.isSuperAdmin ? "Super Admin" : admin.role.name}</span> },
    { key: "status", header: "Status", render: (admin) => <AdminStatusBadge status={admin.status} /> },
    { key: "lastLogin", header: "Last login", render: (admin) => <span className="whitespace-nowrap text-slate-500">{formatAdminDate(admin.lastLoginAt)}</span> },
    { key: "actions", header: "", className: "w-14", render: (admin) => <details className="relative"><summary className="list-none cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100"><MoreHorizontal size={18} /></summary><div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl"><Link href={`/admin-users/${admin.id}`} className="block rounded-lg px-3 py-2 hover:bg-slate-50">View admin</Link>{!admin.isSuperAdmin && <button onClick={() => onEditRole(admin)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">Edit user role</button>}<button onClick={() => onToggleStatus(admin)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">{admin.status === "active" ? "Deactivate" : "Activate"}</button></div></details> },
  ];
  return <DataTable columns={columns} data={admins} getRowKey={(admin) => admin.id} emptyMessage="No administrators match these filters." />;
}

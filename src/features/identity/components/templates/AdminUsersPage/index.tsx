"use client";

import { useState } from "react";
import { QueryError } from "@/components/organisms/QueryError";
import { AdminUsersPageSkeleton } from "../AdminUsersPageSkeleton";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { useAdminRoles, useAdminUsers } from "../../../hooks";
import type {
  AdminAccount,
  AdminAccountStatus,
  AdminUsersQuery,
} from "../../../types";
import { AdminPagination, AdminSummaryCard } from "../../molecules";
import {
  AdminStatusModal,
  AdminUsersTable,
  AdminUsersTableSkeleton,
  CreateAdminModal,
  EditAdminRoleModal,
} from "../../organisms";

export function AdminUsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [adminBeingEdited, setAdminBeingEdited] = useState<AdminAccount | null>(
    null,
  );
  const [adminStatusTarget, setAdminStatusTarget] =
    useState<AdminAccount | null>(null);
  const query: AdminUsersQuery = {
    search: searchParams.get("search") ?? "",
    status: (searchParams.get("status") ?? "") as AdminAccountStatus | "",
    roleId: searchParams.get("roleId") ?? "",
    page: Math.max(1, Number(searchParams.get("page")) || 1),
    limit: [10, 20, 50].includes(Number(searchParams.get("limit")))
      ? Number(searchParams.get("limit"))
      : 20,
  };
  const admins = useAdminUsers(query);
  const roles = useAdminRoles();
  const activeAdmins = useAdminUsers({ search: "", status: "active", roleId: "", page: 1, limit: 1 });
  const inactiveAdmins = useAdminUsers({ search: "", status: "inactive", roleId: "", page: 1, limit: 1 });

  function updateQuery(updates: Record<string, string | number>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) =>
      value ? next.set(key, String(value)) : next.delete(key),
    );
    router.push(`/admin-users?${next.toString()}`);
  }

  const queries = [admins, roles, activeAdmins, inactiveAdmins];
  if (queries.some((request) => request.isPending)) return <AdminUsersPageSkeleton />;
  if (queries.some((request) => request.isError)) {
    return <QueryError resource="admin accounts" onRetry={() => {
      queries.forEach((request) => { void request.refetch(); });
    }} />;
  }

  const active = activeAdmins.data?.pagination.total ?? 0;
  const inactive = inactiveAdmins.data?.pagination.total ?? 0;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="People & access"
          title="Admin accounts"
          description="Invite administrators, assign roles, and manage access to marketplace operations."
        />
        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-lg shadow-navy/15 hover:bg-navy-deep"
        >
          <Plus size={17} />
          Create new admin
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminSummaryCard
          label="Total administrators"
          value={admins.data?.pagination.total ?? 0}
          icon={Users}
          accent="bg-sky-50 text-sky-700"
        />
        <AdminSummaryCard
          label="Available roles"
          value={roles.data?.pagination.total ?? 0}
          icon={ShieldCheck}
          href="/roles-permissions"
          accent="bg-violet-50 text-violet-700"
        />
        <AdminSummaryCard
          label="Active administrators"
          value={active}
          icon={UserCheck}
          accent="bg-emerald-50 text-emerald-700"
        />
        <AdminSummaryCard
          label="Inactive administrators"
          value={inactive}
          icon={UserX}
          accent="bg-orange-50 text-orange-700"
        />
      </div>
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row">
          <form
            className="flex flex-1 gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              updateQuery({
                search: String(data.get("search") ?? ""),
                page: 1,
              });
            }}
          >
            <label className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
              <Search size={17} className="text-slate-400" />
              <input
                name="search"
                defaultValue={query.search}
                placeholder="Search by name or email"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <button className="rounded-xl bg-navy px-4 text-sm font-semibold text-white">
              Search
            </button>
          </form>
          <select
            aria-label="Filter by status"
            value={query.status}
            onChange={(event) =>
              updateQuery({ status: event.target.value, page: 1 })
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            aria-label="Filter by role"
            value={query.roleId}
            onChange={(event) =>
              updateQuery({ roleId: event.target.value, page: 1 })
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600"
          >
            <option value="">All roles</option>
            {roles.data?.data.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {(query.search || query.status || query.roleId) && (
            <Link
              href="/admin-users"
              className="self-center px-2 text-sm font-medium text-sky-700"
            >
              Clear filters
            </Link>
          )}
        </div>
        {admins.isPending ? (
          <AdminUsersTableSkeleton />
        ) : (
          <AdminUsersTable
            admins={admins.data?.data ?? []}
            onEditRole={setAdminBeingEdited}
            onToggleStatus={setAdminStatusTarget}
          />
        )}
        <AdminPagination
          pagination={
            admins.data?.pagination ?? {
              page: query.page,
              limit: query.limit,
              total: 0,
              totalPages: 1,
            }
          }
          onPageChange={(page) => updateQuery({ page })}
          onLimitChange={(limit) => updateQuery({ limit, page: 1 })}
        />
      </section>
      <CreateAdminModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <EditAdminRoleModal
        admin={adminBeingEdited}
        onClose={() => setAdminBeingEdited(null)}
      />
      <AdminStatusModal
        admin={adminStatusTarget}
        onClose={() => setAdminStatusTarget(null)}
      />
    </div>
  );
}

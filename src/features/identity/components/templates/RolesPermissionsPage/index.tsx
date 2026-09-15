"use client";

import { useState } from "react";
import { Plus, ShieldCheck, ShieldOff, Users } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { StatusToggleModal } from "@/components/organisms/StatusToggleModal";
import { useAdminRoles, useChangeRoleStatus, usePermissions } from "../../../hooks";
import type { AdminRole } from "../../../types";
import { AdminSummaryCard } from "../../molecules";
import { RolesPermissionsPageSkeleton } from "../RolesPermissionsPageSkeleton";
import {
  CreateRoleModal,
  EditRoleModal,
  PermissionsReferencePanel,
  RolesTable,
} from "../../organisms";

export function RolesPermissionsPage() {
  const roles = useAdminRoles("");
  const permissions = usePermissions();
  const changeStatus = useChangeRoleStatus();
  const [createOpen, setCreateOpen] = useState(false);
  const [roleBeingEdited, setRoleBeingEdited] = useState<AdminRole | null>(
    null,
  );
  const [roleStatusTarget, setRoleStatusTarget] = useState<AdminRole | null>(
    null,
  );

  if (roles.isPending || permissions.isPending) {
    return <RolesPermissionsPageSkeleton />;
  }

  if (roles.isError || permissions.isError) {
    return (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        <p>Unable to load roles and permissions. Please try again.</p>
        <button
          type="button"
          className="mt-3 font-semibold underline"
          onClick={() => {
            void roles.refetch();
            void permissions.refetch();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const allRoles = roles.data.data;
  const active = allRoles.filter((role) => role.status === "active").length;
  const inactive = allRoles.filter((role) => role.status === "inactive").length;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="People & access"
          title="Roles & permissions"
          description="Group permissions into roles and assign them to administrators. Access is always determined by permissions, not role names."
        />
        <button
          onClick={() => setCreateOpen(true)}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-lg shadow-navy/15 hover:bg-navy-deep"
        >
          <Plus size={17} />
          Create role
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard
          label="Total roles"
          value={allRoles.length}
          icon={Users}
          accent="bg-sky-50 text-sky-700"
        />
        <AdminSummaryCard
          label="Active roles"
          value={active}
          icon={ShieldCheck}
          accent="bg-emerald-50 text-emerald-700"
        />
        <AdminSummaryCard
          label="Inactive roles"
          value={inactive}
          icon={ShieldOff}
          accent="bg-orange-50 text-orange-700"
        />
      </div>
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <RolesTable
          roles={allRoles}
          onEdit={setRoleBeingEdited}
          onToggleStatus={setRoleStatusTarget}
        />
      </section>
      <PermissionsReferencePanel />
      <CreateRoleModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditRoleModal
        key={roleBeingEdited?.id ?? "none"}
        role={roleBeingEdited}
        onClose={() => setRoleBeingEdited(null)}
      />
      <StatusToggleModal
        open={roleStatusTarget !== null}
        title="role"
        subtitle={roleStatusTarget?.name}
        isActive={roleStatusTarget?.status === "active"}
        isPending={changeStatus.isPending}
        onClose={() => setRoleStatusTarget(null)}
        onConfirm={() => {
          if (!roleStatusTarget) return;
          changeStatus.mutate(
            {
              roleId: roleStatusTarget.id,
              status:
                roleStatusTarget.status === "active" ? "inactive" : "active",
            },
            { onSuccess: () => setRoleStatusTarget(null) },
          );
        }}
      />
    </div>
  );
}

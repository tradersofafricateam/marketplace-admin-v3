"use client";

import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { usePermissions, useCreateRole } from "../../../hooks";
import { PermissionGroupPicker } from "../../molecules";
import { getApiErrorMessage } from "@/lib/api";

export function CreateRoleModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const permissions = usePermissions();
  const createRole = useCreateRole();
  const [selected, setSelected] = useState<string[]>([]);

  if (!open) return null;

  function handleClose() {
    setSelected([]);
    createRole.reset();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-role-title"
        className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl"
      >
        <header className="flex items-start justify-between">
          <div>
            <h2
              id="create-role-title"
              className="text-xl font-bold text-navy-deep"
            >
              Create admin role
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Group permissions into a reusable role for administrators.
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </header>
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            createRole.mutate(
              {
                name: String(data.get("name")),
                description: String(data.get("description") ?? ""),
                permissionIds: selected,
              },
              { onSuccess: handleClose },
            );
          }}
        >
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Role name
            <input
              name="name"
              required
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500"
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-navy-deep">
            Description
            <textarea
              name="description"
              rows={2}
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-sky-500"
            />
          </label>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy-deep">
              Permissions
            </p>
            <PermissionGroupPicker
              groups={permissions.data?.data ?? []}
              selected={selected}
              onChange={setSelected}
            />
          </div>
          {createRole.error && (
            <p className="text-sm text-red-600">
              {getApiErrorMessage(createRole.error)}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              disabled={createRole.isPending}
              className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {createRole.isPending && (
                <LoaderCircle className="animate-spin" size={16} />
              )}
              Create role
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

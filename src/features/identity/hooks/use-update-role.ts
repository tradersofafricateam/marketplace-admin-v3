"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "../api";
import { mockAdmins, mockRoles, resolveRolePermissionsByIds, USE_ADMIN_USERS_MOCK } from "../constants";
import type { UpdateRolePayload } from "../types";
import { showToast } from "@/lib/toast";

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roleId, payload }: { roleId: string; payload: UpdateRolePayload }) => {
      if (!USE_ADMIN_USERS_MOCK) return updateRole(roleId, payload);
      const role = mockRoles.find((item) => item.id === roleId);
      if (!role) throw new Error("Role not found");
      if (payload.name !== undefined) role.name = payload.name.trim();
      if (payload.description !== undefined) role.description = payload.description.trim();
      if (payload.permissionIds !== undefined) {
        const permissions = resolveRolePermissionsByIds(payload.permissionIds);
        role.permissions = permissions;
        const codes = permissions.map((permission) => permission.code);
        mockAdmins.filter((admin) => admin.role.id === roleId).forEach((admin) => {
          admin.permissions = codes;
        });
      }
      return { success: true, message: "Admin role updated successfully.", data: role };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      showToast("Admin role updated successfully.");
    },
  });
}

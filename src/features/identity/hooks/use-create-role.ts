"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../api";
import { mockRoles, resolveRolePermissionsByIds, USE_ADMIN_USERS_MOCK } from "../constants";
import type { CreateRolePayload } from "../types";
import { showToast } from "@/lib/toast";

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateRolePayload) => {
      if (!USE_ADMIN_USERS_MOCK) return createRole(payload);
      if (
        mockRoles.some(
          (role) =>
            role.name.toLowerCase() === payload.name.trim().toLowerCase(),
        )
      ) {
        throw new Error("A role with this name already exists.");
      }
      const role = {
        id: `role_${Date.now()}`,
        name: payload.name.trim(),
        description: payload.description?.trim() ?? "",
        status: "active" as const,
        permissions: resolveRolePermissionsByIds(payload.permissionIds),
      };
      mockRoles.unshift(role);
      return {
        success: true,
        message: "Admin role created successfully.",
        data: role,
      };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      showToast("Admin role created successfully.");
    },
  });
}

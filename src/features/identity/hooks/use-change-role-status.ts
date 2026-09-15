"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeRoleStatus } from "../api";
import { mockAdmins, mockRoles, USE_ADMIN_USERS_MOCK } from "../constants";
import type { AdminRoleStatus } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useChangeRoleStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roleId, status }: { roleId: string; status: AdminRoleStatus }) => {
      if (!USE_ADMIN_USERS_MOCK) return changeRoleStatus(roleId, { status });
      const role = mockRoles.find((item) => item.id === roleId);
      if (!role) throw new Error("Role not found");
      if (status === "inactive" && mockAdmins.some((admin) => admin.role.id === roleId && admin.status === "active")) {
        throw new Error("This role cannot be deactivated while active admins are assigned to it. Reassign them first.");
      }
      role.status = status;
      return { success: true, message: status === "active" ? "Admin role reactivated successfully." : "Admin role deactivated successfully.", data: role };
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      showToast(response.message);
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to update role status."), "error"),
  });
}

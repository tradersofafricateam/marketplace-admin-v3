"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminUser, updateAdminUser } from "../api";
import { mockAdmins, mockPermissionsByRole, mockRoles, USE_ADMIN_USERS_MOCK } from "../constants";
import type { UpdateAdminPayload } from "../types";
import { showToast } from "@/lib/toast";

export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ adminId, payload }: { adminId: string; payload: UpdateAdminPayload }) => {
      if (!USE_ADMIN_USERS_MOCK) {
        await updateAdminUser(adminId, payload);
        return getAdminUser(adminId);
      }
      const admin = mockAdmins.find((item) => item.id === adminId);
      if (!admin) throw new Error("Administrator not found");
      if (payload.firstName !== undefined) admin.firstName = payload.firstName;
      if (payload.lastName !== undefined) admin.lastName = payload.lastName;
      if (payload.phoneNumber !== undefined) admin.phoneNumber = payload.phoneNumber;
      if (payload.roleId) {
        admin.role = mockRoles.find((role) => role.id === payload.roleId) ?? admin.role;
        admin.permissions = mockPermissionsByRole[payload.roleId] ?? [];
      }
      return admin;
    },
    onSuccess: (admin) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.setQueryData(["admin-user", admin.id], admin);
      showToast("Admin account updated successfully.");
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminUser } from "../api";
import { mockAdmins, mockRoles, USE_ADMIN_USERS_MOCK } from "../constants";
import type { CreateAdminPayload } from "../types";

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateAdminPayload) => {
      if (!USE_ADMIN_USERS_MOCK) return createAdminUser(payload);
      const admin = { ...payload, id: `admin_${Date.now()}`, status: "pending" as const, isSuperAdmin: false, role: mockRoles.find((role) => role.id === payload.roleId) ?? mockRoles[0], permissions: [], lastLoginAt: null, createdAt: new Date().toISOString() };
      mockAdmins.unshift(admin);
      return { success: true, message: "Admin account created successfully. An invitation has been sent to the Admin.", data: admin };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

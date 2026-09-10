"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockAdmins, mockRoles } from "../constants";
import type { AdminAccountStatus } from "../types";

type Update = { adminId: string; roleId?: string; status?: AdminAccountStatus };

export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ adminId, roleId, status }: Update) => {
      const admin = mockAdmins.find((item) => item.id === adminId);
      if (!admin) throw new Error("Administrator not found");
      if (roleId) admin.role = mockRoles.find((role) => role.id === roleId) ?? admin.role;
      if (status) admin.status = status;
      return admin;
    },
    onSuccess: (admin) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.setQueryData(["admin-user", admin.id], admin);
    },
  });
}

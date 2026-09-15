"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateAdminUser, deactivateAdminUser, getAdminUser } from "../api";
import { mockAdmins, USE_ADMIN_USERS_MOCK } from "../constants";
import { showToast } from "@/lib/toast";

type StatusChange = { adminId: string; action: "activate" | "deactivate"; reason?: string };

export function useChangeAdminStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ adminId, action, reason }: StatusChange) => {
      if (!USE_ADMIN_USERS_MOCK) {
        if (action === "activate") await activateAdminUser(adminId);
        else await deactivateAdminUser(adminId, { reason: reason?.trim() ?? "" });
        return getAdminUser(adminId);
      }
      const admin = mockAdmins.find((item) => item.id === adminId);
      if (!admin) throw new Error("Administrator not found");
      admin.status = action === "activate" ? "active" : "inactive";
      admin.deactivationReason = action === "deactivate" ? reason?.trim() || null : null;
      admin.deactivatedAt = action === "deactivate" ? new Date().toISOString() : null;
      return admin;
    },
    onSuccess: (admin) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.setQueryData(["admin-user", admin.id], admin);
      showToast(admin.status === "active" ? "Admin account activated successfully." : "Admin account deactivated successfully.");
    },
  });
}

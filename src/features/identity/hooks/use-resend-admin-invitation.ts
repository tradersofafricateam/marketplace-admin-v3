"use client";

import { useMutation } from "@tanstack/react-query";
import { resendAdminInvitation } from "../api";
import { USE_ADMIN_USERS_MOCK } from "../constants";
import { showToast } from "@/lib/toast";

export function useResendAdminInvitation() {
  return useMutation({
    mutationFn: async (adminId: string) => {
      if (!USE_ADMIN_USERS_MOCK) return resendAdminInvitation(adminId);
      return { success: true, message: "Admin invitation resent successfully." };
    },
    onSuccess: () => showToast("Admin invitation resent successfully."),
  });
}

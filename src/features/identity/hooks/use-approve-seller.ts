"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveSeller } from "../api";
import { mockSellerVerifications, USE_ADMIN_USERS_MOCK } from "../constants";
import type { ApproveSellerPayload } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useApproveSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ verificationId, payload }: { verificationId: string; payload: ApproveSellerPayload }) => {
      if (!USE_ADMIN_USERS_MOCK) return approveSeller(verificationId, payload);
      const verification = mockSellerVerifications.find((item) => item.id === verificationId);
      if (!verification) throw new Error("Verification not found");
      verification.verificationStatus = "approved";
      verification.reviewedAt = new Date().toISOString();
      verification.reviewedBy = "admin_super";
      verification.rejectionReason = null;
      return { success: true, message: "Seller approved successfully" };
    },
    onSuccess: (response, { verificationId }) => {
      void queryClient.invalidateQueries({ queryKey: ["seller-verifications"] });
      void queryClient.invalidateQueries({ queryKey: ["seller-verification", verificationId] });
      showToast(response.message);
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to approve this seller."), "error"),
  });
}

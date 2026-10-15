"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectSeller } from "../api";
import { mockSellerVerifications, USE_ADMIN_USERS_MOCK } from "../constants";
import type { RejectSellerPayload } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useRejectSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ verificationId, payload }: { verificationId: string; payload: RejectSellerPayload }) => {
      if (!USE_ADMIN_USERS_MOCK) return rejectSeller(verificationId, payload);
      const verification = mockSellerVerifications.find((item) => item.id === verificationId);
      if (!verification) throw new Error("Verification not found");
      verification.verificationStatus = "rejected";
      verification.reviewedAt = new Date().toISOString();
      verification.reviewedBy = "admin_super";
      verification.rejectionReason = payload.reason;
      return { success: true, message: "Seller verification rejected" };
    },
    onSuccess: (response, { verificationId }) => {
      void queryClient.invalidateQueries({ queryKey: ["seller-verifications"] });
      void queryClient.invalidateQueries({ queryKey: ["seller-verification", verificationId] });
      showToast(response.message);
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to reject this seller."), "error"),
  });
}

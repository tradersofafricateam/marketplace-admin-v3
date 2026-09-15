"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePaymentMethodStatus } from "../api";
import { mockPaymentMethods, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { EntityStatus } from "../types";
import { showToast } from "@/lib/toast";

export function useChangePaymentMethodStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentMethodId, status }: { paymentMethodId: string; status: EntityStatus }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return changePaymentMethodStatus(paymentMethodId, { status });
      const paymentMethod = mockPaymentMethods.find((item) => item.id === paymentMethodId);
      if (!paymentMethod) throw new Error("Payment method not found");
      paymentMethod.status = status;
      return { success: true, message: status === "active" ? "Payment method activated successfully." : "Payment method deactivated successfully." };
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      showToast(response.message);
    },
  });
}

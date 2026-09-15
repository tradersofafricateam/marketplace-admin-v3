"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeCurrencyStatus } from "../api";
import { mockCurrencies, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { EntityStatus } from "../types";
import { showToast } from "@/lib/toast";

export function useChangeCurrencyStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ currencyId, status }: { currencyId: string; status: EntityStatus }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return changeCurrencyStatus(currencyId, { status });
      const currency = mockCurrencies.find((item) => item.id === currencyId);
      if (!currency) throw new Error("Currency not found");
      currency.status = status;
      return { success: true, message: status === "active" ? "Currency activated successfully." : "Currency deactivated successfully." };
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ["currencies"] });
      showToast(response.message);
    },
  });
}

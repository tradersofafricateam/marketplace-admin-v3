"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrency } from "../api";
import { mockCurrencies, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { UpdateCurrencyPayload } from "../types";
import { showToast } from "@/lib/toast";

export function useUpdateCurrency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ currencyId, payload }: { currencyId: string; payload: UpdateCurrencyPayload }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return updateCurrency(currencyId, payload);
      const currency = mockCurrencies.find((item) => item.id === currencyId);
      if (!currency) throw new Error("Currency not found");
      if (payload.name !== undefined) currency.name = payload.name;
      if (payload.symbol !== undefined) currency.symbol = payload.symbol;
      if (payload.decimalPlaces !== undefined) currency.decimalPlaces = payload.decimalPlaces;
      if (payload.code !== undefined) currency.code = payload.code.toUpperCase();
      return { success: true, message: "Currency updated successfully." };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["currencies"] });
      showToast("Currency updated successfully.");
    },
  });
}

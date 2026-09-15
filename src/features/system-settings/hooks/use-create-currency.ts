"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCurrency } from "../api";
import { mockCurrencies, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { CreateCurrencyPayload } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useCreateCurrency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCurrencyPayload) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return createCurrency(payload);
      if (mockCurrencies.some((currency) => currency.code === payload.code.toUpperCase())) {
        throw new Error("A currency with this code already exists.");
      }
      mockCurrencies.unshift({
        id: `currency_${Date.now()}`,
        code: payload.code.toUpperCase(),
        name: payload.name,
        symbol: payload.symbol,
        decimalPlaces: payload.decimalPlaces,
        status: "active",
        createdAt: new Date().toISOString(),
      });
      return { success: true, message: "Currency added successfully." };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["currencies"] });
      showToast("Currency added successfully.");
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to add currency."), "error"),
  });
}

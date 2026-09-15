"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCountry } from "../api";
import { mockCountries, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { CreateCountryPayload } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useCreateCountry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCountryPayload) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return createCountry(payload);
      if (mockCountries.some((country) => country.code === payload.code.toUpperCase())) {
        throw new Error("A country with this code already exists.");
      }
      mockCountries.unshift({
        id: `country_${Date.now()}`,
        code: payload.code.toUpperCase(),
        name: payload.name,
        phoneCode: payload.phoneCode,
        status: "active",
        createdAt: new Date().toISOString(),
      });
      return { success: true, message: "Country added successfully." };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["countries"] });
      showToast("Country added successfully.");
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to add country."), "error"),
  });
}

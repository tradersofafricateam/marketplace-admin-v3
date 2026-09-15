"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCountry } from "../api";
import { mockCountries, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { UpdateCountryPayload } from "../types";
import { showToast } from "@/lib/toast";

export function useUpdateCountry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ countryId, payload }: { countryId: string; payload: UpdateCountryPayload }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return updateCountry(countryId, payload);
      const country = mockCountries.find((item) => item.id === countryId);
      if (!country) throw new Error("Country not found");
      if (payload.name !== undefined) country.name = payload.name;
      if (payload.phoneCode !== undefined) country.phoneCode = payload.phoneCode;
      if (payload.code !== undefined) country.code = payload.code.toUpperCase();
      return { success: true, message: "Country updated successfully." };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["countries"] });
      showToast("Country updated successfully.");
    },
  });
}

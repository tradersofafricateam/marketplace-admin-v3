"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeCountryStatus } from "../api";
import { mockCountries, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { EntityStatus } from "../types";
import { showToast } from "@/lib/toast";

export function useChangeCountryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ countryId, status }: { countryId: string; status: EntityStatus }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return changeCountryStatus(countryId, { status });
      const country = mockCountries.find((item) => item.id === countryId);
      if (!country) throw new Error("Country not found");
      country.status = status;
      return { success: true, message: status === "active" ? "Country activated successfully." : "Country deactivated successfully." };
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ["countries"] });
      showToast(response.message);
    },
  });
}

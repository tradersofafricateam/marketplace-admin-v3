"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../api";
import { mockCurrencies, USE_SYSTEM_SETTINGS_MOCK } from "../constants";

export function useCurrencies() {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: async () => (USE_SYSTEM_SETTINGS_MOCK ? mockCurrencies : getCurrencies()),
  });
}

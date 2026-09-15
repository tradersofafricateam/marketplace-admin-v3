"use client";

import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../api";
import { mockCountries, USE_SYSTEM_SETTINGS_MOCK } from "../constants";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => (USE_SYSTEM_SETTINGS_MOCK ? mockCountries : getCountries()),
  });
}

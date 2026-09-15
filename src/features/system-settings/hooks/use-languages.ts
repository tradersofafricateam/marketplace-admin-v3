"use client";

import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api";
import { mockLanguages, USE_SYSTEM_SETTINGS_MOCK } from "../constants";

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => (USE_SYSTEM_SETTINGS_MOCK ? mockLanguages : getLanguages()),
  });
}

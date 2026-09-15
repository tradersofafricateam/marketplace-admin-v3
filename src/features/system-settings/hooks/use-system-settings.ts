"use client";

import { useQuery } from "@tanstack/react-query";
import { getSystemSettings } from "../api";
import { mockSystemSettings, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { SettingCategory } from "../types";

export function useSystemSettings(categories?: SettingCategory[]) {
  return useQuery({
    queryKey: ["system-settings", categories?.join(",") ?? "all"],
    queryFn: async () => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return getSystemSettings();
      const data = categories ? mockSystemSettings.filter((setting) => categories.includes(setting.category)) : mockSystemSettings;
      return { success: true, data };
    },
  });
}

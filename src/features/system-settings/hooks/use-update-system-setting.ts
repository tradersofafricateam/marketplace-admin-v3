"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSystemSetting } from "../api";
import { mockSystemSettings, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { SettingValue } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useUpdateSystemSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: SettingValue }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return updateSystemSetting(key, { value });
      const setting = mockSystemSettings.find((item) => item.key === key);
      if (!setting) throw new Error("Setting not found");
      if (!setting.isEditable) throw new Error("This setting cannot be modified.");
      setting.value = value;
      setting.updatedAt = new Date().toISOString();
      return { success: true, message: "System setting updated successfully.", data: { key, value } };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["system-settings"] });
      showToast("System setting updated successfully.");
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to update this setting."), "error"),
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeLanguageStatus } from "../api";
import { mockLanguages, USE_SYSTEM_SETTINGS_MOCK } from "../constants";
import type { EntityStatus } from "../types";
import { showToast } from "@/lib/toast";

export function useChangeLanguageStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ languageId, status }: { languageId: string; status: EntityStatus }) => {
      if (!USE_SYSTEM_SETTINGS_MOCK) return changeLanguageStatus(languageId, { status });
      const language = mockLanguages.find((item) => item.id === languageId);
      if (!language) throw new Error("Language not found");
      language.status = status;
      return { success: true, message: status === "active" ? "Language activated successfully." : "Language deactivated successfully." };
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ["languages"] });
      showToast(response.message);
    },
  });
}

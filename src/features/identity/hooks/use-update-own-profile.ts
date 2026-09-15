"use client";

import { useMutation } from "@tanstack/react-query";
import { updateOwnAdminProfile } from "../api";
import { useAuthStore } from "@/store/auth-store";
import type { UpdateOwnProfilePayload } from "../types";
import { showToast } from "@/lib/toast";

export function useUpdateOwnProfile() {
  const currentAdmin = useAuthStore((state) => state.currentAdmin);
  const setCurrentAdmin = useAuthStore((state) => state.setCurrentAdmin);
  return useMutation({
    mutationFn: updateOwnAdminProfile,
    onSuccess: (_, payload: UpdateOwnProfilePayload) => {
      if (currentAdmin) setCurrentAdmin({ ...currentAdmin, ...payload });
      showToast("Profile updated successfully.");
    },
  });
}

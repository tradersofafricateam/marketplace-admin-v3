"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAdmin } from "../api";
import { getResetPasswordErrorMessage } from "../helpers";
import type { ResetPasswordPayload } from "../types";

export function useResetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPasswordAdmin(payload),
    onSuccess: () => {
      router.replace("/login");
    },
  });
  return { resetPassword: mutation.mutate, isPending: mutation.isPending, error: mutation.error ? getResetPasswordErrorMessage(mutation.error) : null };
}

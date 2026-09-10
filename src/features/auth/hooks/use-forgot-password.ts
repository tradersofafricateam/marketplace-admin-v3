"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAdmin } from "../api";
import { getForgotPasswordErrorMessage } from "../helpers";
import type { ForgotPasswordPayload } from "../types";

export function useForgotPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPasswordAdmin({ email: payload.email.trim() }),
    onSuccess: (_data, values) => {
      router.push(`/reset-password?email=${encodeURIComponent(values.email.trim())}`);
    },
  });
  return { requestReset: mutation.mutate, isPending: mutation.isPending, error: mutation.error ? getForgotPasswordErrorMessage(mutation.error) : null };
}

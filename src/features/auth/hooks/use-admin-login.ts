"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "../api";
import { getLoginErrorMessage } from "../helpers";
import { setAdminAuthToken } from "../helpers/session";
import type { AdminLoginFormValues } from "../types";
import { useAuthStore } from "@/store/auth-store";

export function useAdminLogin() {
  const router = useRouter();
  const setCurrentAdmin = useAuthStore((state) => state.setCurrentAdmin);
  const mutation = useMutation({
    mutationFn: ({ email, password }: AdminLoginFormValues) => loginAdmin({ email: email.trim(), password }),
    onSuccess: (data, values) => {
      setAdminAuthToken(data.token, values.rememberMe);
      setCurrentAdmin(data.admin);
      router.replace("/dashboard");
    },
  });
  return { login: mutation.mutate, isPending: mutation.isPending, error: mutation.error ? getLoginErrorMessage(mutation.error) : null };
}

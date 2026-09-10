"use client";

import { useCurrentAdmin } from "@/features/auth/hooks";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useCurrentAdmin();
  return children;
}

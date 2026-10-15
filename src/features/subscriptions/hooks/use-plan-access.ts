"use client";
import { useAuthStore } from "@/store/auth-store";
export function usePlanAccess() {
  const admin = useAuthStore((state) => state.currentAdmin);
  return (action: "view" | "create" | "update" | "activate" | "deactivate") => Boolean(admin?.isSuperAdmin || admin?.permissions.includes(`subscription_plans.${action}`));
}

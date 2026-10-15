"use client";
import { useAuthStore } from "@/store/auth-store";
import type { CategoryStatus } from "../types";
export function useCategoryAccess() {
  const admin = useAuthStore((state) => state.currentAdmin);
  const can = (action: string) => Boolean(admin?.isSuperAdmin || admin?.permissions.includes(`categories.${action}`));
  const canStatus = (status: CategoryStatus) => can({ active: "activate", inactive: "deactivate", archived: "archive", deleted: "delete" }[status]);
  return { can, canStatus };
}

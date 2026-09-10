"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminUser } from "../api";
import { mockAdmins, USE_ADMIN_USERS_MOCK } from "../constants";

export function useAdminUser(adminId: string) {
  return useQuery({ queryKey: ["admin-user", adminId], queryFn: async () => USE_ADMIN_USERS_MOCK ? mockAdmins.find((admin) => admin.id === adminId) ?? null : getAdminUser(adminId) });
}

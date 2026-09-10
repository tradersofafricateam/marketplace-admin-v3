"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminRoles } from "../api";
import { mockRoles, USE_ADMIN_USERS_MOCK } from "../constants";

export function useAdminRoles() {
  return useQuery({ queryKey: ["admin-roles"], queryFn: async () => USE_ADMIN_USERS_MOCK ? { success: true, data: mockRoles, pagination: { page: 1, limit: 100, total: mockRoles.length, totalPages: 1 } } : getAdminRoles() });
}

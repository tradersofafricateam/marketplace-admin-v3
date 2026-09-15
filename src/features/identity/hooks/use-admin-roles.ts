"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminRoles } from "../api";
import { mockRoles, USE_ADMIN_USERS_MOCK } from "../constants";

export function useAdminRoles(status: "active" | "" = "active") {
  return useQuery({
    queryKey: ["admin-roles", status],
    queryFn: async () => {
      if (!USE_ADMIN_USERS_MOCK) return getAdminRoles(status);
      const data = status === "active" ? mockRoles.filter((role) => role.status === "active") : mockRoles;
      return { success: true, data, pagination: { page: 1, limit: 100, total: data.length, totalPages: 1 } };
    },
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../api";
import { mockPermissionGroups, USE_ADMIN_USERS_MOCK } from "../constants";

export function usePermissions() {
  return useQuery({
    queryKey: ["admin-permissions"],
    queryFn: async () =>
      USE_ADMIN_USERS_MOCK
        ? { success: true, data: mockPermissionGroups }
        : getPermissions(),
  });
}

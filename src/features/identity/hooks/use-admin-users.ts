"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../api";
import { mockAdmins, USE_ADMIN_USERS_MOCK } from "../constants";
import type { AdminUsersQuery, AdminUsersResponse } from "../types";

function getMockAdminUsers(query: AdminUsersQuery): AdminUsersResponse {
  const search = query.search?.trim().toLowerCase();
  const filtered = mockAdmins.filter((admin) => {
    const matchesSearch = !search || `${admin.firstName} ${admin.lastName} ${admin.email}`.toLowerCase().includes(search);
    return matchesSearch && (!query.status || admin.status === query.status) && (!query.roleId || admin.role.id === query.roleId);
  });
  const start = (query.page - 1) * query.limit;
  return { success: true, data: filtered.slice(start, start + query.limit), pagination: { page: query.page, limit: query.limit, total: filtered.length, totalPages: Math.max(1, Math.ceil(filtered.length / query.limit)) } };
}

export function useAdminUsers(query: AdminUsersQuery) {
  return useQuery({ queryKey: ["admin-users", query], queryFn: () => USE_ADMIN_USERS_MOCK ? Promise.resolve(getMockAdminUsers(query)) : getAdminUsers(query), placeholderData: (previous) => previous });
}

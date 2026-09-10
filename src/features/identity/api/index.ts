import { apiClient } from "@/lib/api";
import { ADMIN_ROLES_ENDPOINT, ADMIN_USERS_ENDPOINT } from "../constants";
import type { AdminAccount, AdminUsersQuery, AdminUsersResponse, CreateAdminPayload, RolesResponse } from "../types";

export async function getAdminUsers(query: AdminUsersQuery) {
  const { data } = await apiClient.get<AdminUsersResponse>(ADMIN_USERS_ENDPOINT, { params: query });
  return data;
}

export async function getAdminUser(adminId: string) {
  const { data } = await apiClient.get<{ success: boolean; data: AdminAccount }>(`${ADMIN_USERS_ENDPOINT}/${adminId}`);
  return data.data;
}

export async function createAdminUser(payload: CreateAdminPayload) {
  const { data } = await apiClient.post<{ success: boolean; message: string; data: AdminAccount }>(ADMIN_USERS_ENDPOINT, payload);
  return data;
}

export async function getAdminRoles(page = 1, limit = 100) {
  const { data } = await apiClient.get<RolesResponse>(ADMIN_ROLES_ENDPOINT, { params: { status: "active", page, limit } });
  return data;
}

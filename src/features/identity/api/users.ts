import { apiClient } from "@/lib/api";
import type { MarketplaceUserDetail, UsersQuery, UsersResponse } from "../types/users";

const USERS_ENDPOINT = "/admin/users";

export async function getUsers(query: UsersQuery) {
  const { data } = await apiClient.get<UsersResponse>(USERS_ENDPOINT, {
    params: { ...query, search: query.search || undefined, userType: query.userType || undefined },
  });
  return data;
}

export async function getUser(userId: string) {
  const { data } = await apiClient.get<{ data: MarketplaceUserDetail | null }>(
    `${USERS_ENDPOINT}/${encodeURIComponent(userId)}`,
  );
  return data.data;
}

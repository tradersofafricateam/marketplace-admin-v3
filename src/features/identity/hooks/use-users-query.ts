"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { UsersQuery } from "../types/users";

export function useUsersQuery() {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page"));
  const limit = Number(params.get("limit"));
  const userType = params.get("userType");
  const query: UsersQuery = {
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    limit: [10, 20, 50].includes(limit) ? limit : 20,
    search: params.get("search") ?? "",
    userType: userType === "buyer" || userType === "seller" ? userType : "",
  };
  function updateQuery(updates: Partial<UsersQuery>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, String(value));
      else next.delete(key);
    });
    router.push(`/users?${next.toString()}`);
  }
  return { query, updateQuery };
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";
import type { UsersQuery } from "../types/users";

export function useUsers(query: UsersQuery) {
  return useQuery({ queryKey: ["users", query], queryFn: () => getUsers(query) });
}

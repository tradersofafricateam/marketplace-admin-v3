"use client";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionPlans } from "../api";
import type { PlansQuery } from "../types";
export function useSubscriptionPlans(query: PlansQuery, enabled = true) {
  return useQuery({ queryKey: ["subscription-plans", "admin", query], queryFn: () => getSubscriptionPlans(query), enabled });
}

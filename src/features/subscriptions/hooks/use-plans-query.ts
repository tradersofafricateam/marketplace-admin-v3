"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { PLAN_AUDIENCES, PLAN_STATUSES } from "../constants";
import type { PlanAudience, PlanStatus, PlansQuery } from "../types";
export function usePlansQuery() {
  const params = useSearchParams();
  const router = useRouter();
  const status = params.get("status") as PlanStatus;
  const audience = params.get("audience") as PlanAudience;
  const free = params.get("isFree");
  const query: PlansQuery = { status: PLAN_STATUSES.includes(status) ? status : "", audience: PLAN_AUDIENCES.includes(audience) ? audience : "", isFree: free === "true" || free === "false" ? free : "" };
  function update(updates: Partial<PlansQuery>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key));
    router.push(`/subscription-plans?${next}`);
  }
  return { query, update };
}

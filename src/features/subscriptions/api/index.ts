import { apiClient } from "@/lib/api";
import { PLANS_ENDPOINT } from "../constants";
import type { PlanActionResponse, PlanInput, PlansQuery, PlansResponse } from "../types";
export async function getSubscriptionPlans(query: PlansQuery) {
  const { data } = await apiClient.get<PlansResponse>(PLANS_ENDPOINT, {
    params: { status: query.status || undefined, audience: query.audience || undefined, isFree: query.isFree === "" ? undefined : query.isFree === "true" },
  });
  return data;
}
export async function createSubscriptionPlan(payload: PlanInput) {
  const { data } = await apiClient.post<PlanActionResponse>(PLANS_ENDPOINT, payload);
  return data;
}
export async function updateSubscriptionPlan(id: string, payload: Partial<PlanInput>) {
  const { data } = await apiClient.patch<PlanActionResponse>(`${PLANS_ENDPOINT}/${encodeURIComponent(id)}`, payload);
  return data;
}
export async function changeSubscriptionPlanStatus(id: string, status: "active" | "inactive") {
  const { data } = await apiClient.patch<PlanActionResponse>(`${PLANS_ENDPOINT}/${encodeURIComponent(id)}/status`, { status });
  return data;
}

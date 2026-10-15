"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscriptionPlan, updateSubscriptionPlan, changeSubscriptionPlanStatus } from "../api";
import { showToast } from "@/lib/toast";
import { getApiErrorMessage } from "@/lib/api";
import type { PlanInput } from "../types";
type Action = { kind: "create"; payload: PlanInput } | { kind: "edit"; id: string; payload: Partial<PlanInput> } | { kind: "status"; id: string; status: "active" | "inactive" };
export function usePlanMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (action: Action) => {
      const result = await (action.kind === "create" ? createSubscriptionPlan(action.payload) : action.kind === "edit" ? updateSubscriptionPlan(action.id, action.payload) : changeSubscriptionPlanStatus(action.id, action.status));
      if (!result.success) throw new Error(result.message || "Unable to save plan.");
      return result;
    },
    onSuccess: (result) => { void client.invalidateQueries({ queryKey: ["subscription-plans"] }); showToast(result.message || "Plan saved successfully."); },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to save subscription plan."), "error"),
  });
}

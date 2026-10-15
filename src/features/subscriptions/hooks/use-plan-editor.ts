"use client";
import { useState } from "react";
import type { PlanInput, SubscriptionPlan } from "../types";
import { entitlementRows, parseEntitlements } from "../helpers/entitlements";
import { planInput, changedPlanFields } from "../helpers/plan-input";
import { validatePlan } from "../helpers/validation";
import { usePlanMutation } from "./use-plan-mutation";
import { getApiErrorMessage } from "@/lib/api";
export function usePlanEditor(plan: SubscriptionPlan | undefined, onClose: () => void) {
  const [initial] = useState(() => planInput(plan));
  const [value, setValue] = useState(initial);
  const [rows, setRows] = useState(() => entitlementRows(initial.entitlements));
  const [error, setError] = useState("");
  const mutation = usePlanMutation();
  function update(change: Partial<PlanInput>) { setValue((previous) => ({ ...previous, ...change })); }
  function save() {
    setError("");
    try {
      const input: PlanInput = { ...value, name: value.name.trim(), description: value.description.trim(), entitlements: parseEntitlements(rows) };
      validatePlan(input);
      input.prices = input.prices.map((price) => ({ ...price, amount: Number(price.amount) }));
      const payload = changedPlanFields(input, initial);
      if (plan && !Object.keys(payload).length) { onClose(); return; }
      mutation.mutate(plan ? { kind: "edit", id: plan.id, payload } : { kind: "create", payload: input }, { onSuccess: onClose });
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Please check the plan configuration."); }
  }
  return { value, update, rows, setRows, save, pending: mutation.isPending, error: error || (mutation.error ? getApiErrorMessage(mutation.error, "Unable to save plan.") : "") };
}

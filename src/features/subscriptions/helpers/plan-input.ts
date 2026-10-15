import type { PlanInput, SubscriptionPlan } from "../types";
export function planInput(plan?: SubscriptionPlan): PlanInput {
  return plan ? { name: plan.name, description: plan.description ?? "", audience: plan.audience, isFree: plan.isFree, isDefault: plan.isDefault, displayOrder: plan.displayOrder ?? 0, prices: plan.prices.map((price) => ({ ...price })), entitlements: { ...plan.entitlements } } : { name: "", description: "", audience: "seller", isFree: false, isDefault: false, displayOrder: 0, prices: [], entitlements: {} };
}
export function changedPlanFields(input: PlanInput, previous: PlanInput): Partial<PlanInput> {
  return Object.fromEntries(Object.entries(input).filter(([key, value]) => JSON.stringify(value) !== JSON.stringify(previous[key as keyof PlanInput])));
}

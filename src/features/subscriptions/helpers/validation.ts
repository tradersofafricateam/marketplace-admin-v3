import type { PlanInput } from "../types";
import { ENTITLEMENT_DEFINITIONS } from "../constants/entitlements";
export function validatePlan(plan: PlanInput): void {
  if (!plan.name.trim()) throw new Error("Plan name is required.");
  if (!Number.isSafeInteger(plan.displayOrder) || plan.displayOrder < 0) throw new Error("Display order must be a non-negative integer.");
  if (!plan.prices.length) throw new Error("Add at least one price.");
  const seen = new Set<string>();
  for (const price of plan.prices) {
    if (!/^[A-Z]{3}$/.test(price.currency)) throw new Error("Use a three-letter currency code, such as NGN or USD.");
    if (!String(price.amount).trim() || !Number.isFinite(Number(price.amount)) || Number(price.amount) < 0) throw new Error("Prices must be valid non-negative amounts.");
    if (!price.billingPeriod.trim()) throw new Error("Choose a billing period.");
    if (price.billingPeriod === "free" && Number(price.amount) !== 0) throw new Error("Free billing periods must have a zero amount.");
    if (plan.isFree && Number(price.amount) !== 0) throw new Error("Free plans must have zero prices.");
    const key = `${price.currency}:${price.billingPeriod}`;
    if (seen.has(key)) throw new Error("Only one price per currency and billing period is allowed.");
    seen.add(key);
  }
  for (const definition of ENTITLEMENT_DEFINITIONS) {
    const value = plan.entitlements[definition.code];
    if (value === undefined) continue;
    const expected = definition.type === "integer" || definition.type === "decimal" ? "number" : definition.type;
    if (typeof value !== expected) throw new Error(`${definition.label} must be a ${expected}.`);
    if (typeof value === "number" && (!Number.isFinite(value) || value < 0 || (definition.type === "integer" && !Number.isSafeInteger(value)))) throw new Error(`${definition.label} must be a valid non-negative ${definition.type}.`);
  }
  const fee = plan.entitlements.transaction_fee_percentage;
  if ((plan.audience === "seller" || plan.audience === "all") && typeof fee !== "number") throw new Error("Seller plans require a transaction fee percentage.");
  if (fee !== undefined && (typeof fee !== "number" || !Number.isFinite(fee) || fee < 0 || fee > 100)) throw new Error("Transaction fee must be between 0 and 100 percent.");
}

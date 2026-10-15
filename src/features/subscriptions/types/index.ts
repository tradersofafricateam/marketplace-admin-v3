export type PlanStatus = "draft" | "active" | "inactive" | "archived";
export type PlanAudience = "seller" | "buyer" | "all";
export type EntitlementValue = string | number | boolean | null;
export type Entitlements = Record<string, EntitlementValue>;
export type PlanPrice = { id?: string; currency: string; amount: number | string; billingPeriod: string; status?: string };
export type PlanInput = {
  name: string; description: string; audience: PlanAudience; isFree: boolean;
  isDefault: boolean; displayOrder: number; prices: PlanPrice[]; entitlements: Entitlements;
};
export type SubscriptionPlan = PlanInput & {
  id: string; status: PlanStatus; createdBy?: string; createdAt?: string; updatedAt?: string;
};
export type PlansQuery = { status: PlanStatus | ""; audience: PlanAudience | ""; isFree: "" | "true" | "false" };
export type PlansResponse = { success: boolean; data: SubscriptionPlan[] };
export type PlanActionResponse = { success: boolean; message: string; data?: Partial<SubscriptionPlan> };
export type EntitlementDefinition = { code: string; label: string; group: string; type: "boolean" | "integer" | "decimal" | "string" };
export type EntitlementRow = { code: string; type: "boolean" | "integer" | "decimal" | "string" | "null"; value: string };

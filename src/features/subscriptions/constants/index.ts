export const PLANS_ENDPOINT = "/admin/subscription-plans";
export const PLAN_STATUSES = ["draft", "active", "inactive", "archived"] as const;
export const PLAN_AUDIENCES = ["seller", "buyer", "all"] as const;
export const BILLING_PERIODS = ["free", "monthly", "quarterly", "yearly"];
export const FINANCIAL_NOTICE = "Changes will apply to future eligible transactions. Existing transactions with locked financial terms will not be recalculated.";

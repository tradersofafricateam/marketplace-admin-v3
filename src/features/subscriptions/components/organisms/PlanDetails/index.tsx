import { CopyableId } from "@/components/atoms/CopyableId";
import type { SubscriptionPlan } from "../../../types";
import { ENTITLEMENT_DEFINITIONS } from "../../../constants/entitlements";
import { PlanDialog } from "../../molecules/PlanDialog";
import { PlanPrices } from "../../molecules/PlanPrices";
import { PlanBadge } from "../../atoms/PlanBadge";
export function PlanDetails({ plan, onClose }: { plan: SubscriptionPlan; onClose: () => void }) {
  const entries = Object.entries(plan.entitlements ?? {});
  const groups = [...new Set(entries.map(([code]) => ENTITLEMENT_DEFINITIONS.find((item) => item.code === code)?.group ?? "Additional benefits"))];
  return <PlanDialog title={plan.name} onClose={onClose}><div className="space-y-5">
    <div className="flex items-center justify-between"><CopyableId value={plan.id} label="Plan ID" /><PlanBadge status={plan.status} /></div>
    {plan.description && <p className="whitespace-pre-wrap text-sm text-slate-600">{plan.description}</p>}
    <dl className="grid gap-3 text-sm sm:grid-cols-2">{[["Audience", plan.audience], ["Pricing", plan.isFree ? "Free" : "Paid"], ["Default plan", plan.isDefault ? "Yes" : "No"], ["Display order", plan.displayOrder ?? 0]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="capitalize">{value}</dd></div>)}</dl>
    <section><h3 className="mb-2 font-semibold">Prices</h3><PlanPrices prices={plan.prices ?? []} /></section>
    {groups.map((group) => <section key={group}><h3 className="mb-2 font-semibold">{group}</h3><dl className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">{entries.filter(([code]) => (ENTITLEMENT_DEFINITIONS.find((item) => item.code === code)?.group ?? "Additional benefits") === group).map(([code, value]) => <div key={code}><dt title={code} className="text-xs text-slate-500">{ENTITLEMENT_DEFINITIONS.find((item) => item.code === code)?.label ?? code.replace(/_/g, " ")}</dt><dd className="mt-1 break-words text-sm font-medium">{typeof value === "boolean" ? value ? "Enabled" : "Disabled" : value === null ? "Not set" : `${value}${code === "transaction_fee_percentage" ? "%" : ""}`}</dd></div>)}</dl></section>)}
    {!entries.length && <p className="text-sm text-slate-500">No entitlements configured.</p>}
    {plan.createdBy && <p className="text-sm">Created by <CopyableId value={plan.createdBy} label="Admin ID" href={`/admin-users/${encodeURIComponent(plan.createdBy)}`} /></p>}
  </div></PlanDialog>;
}

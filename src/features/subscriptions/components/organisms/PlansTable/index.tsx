import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import type { SubscriptionPlan } from "../../../types";
import { usePlanAccess } from "../../../hooks/use-plan-access";
import { PlanBadge } from "../../atoms/PlanBadge";
import { PlanPrices } from "../../molecules/PlanPrices";
type Props = { plans: SubscriptionPlan[]; onView: (plan: SubscriptionPlan) => void; onEdit: (plan: SubscriptionPlan) => void; onStatus: (plan: SubscriptionPlan) => void };
export function PlansTable({ plans, onView, onEdit, onStatus }: Props) {
  const can = usePlanAccess();
  const columns: DataTableColumn<SubscriptionPlan>[] = [
    { key: "name", header: "Plan", render: (plan) => <div><button onClick={() => onView(plan)} className="whitespace-nowrap font-semibold text-sky-700 hover:underline">{plan.name}</button>{plan.isDefault && <p className="mt-1 text-xs text-slate-500">Default plan</p>}</div> },
    { key: "audience", header: "Audience", render: (plan) => <span className="capitalize">{plan.audience}</span> },
    { key: "status", header: "Status", render: (plan) => <PlanBadge status={plan.status} /> },
    { key: "type", header: "Type", render: (plan) => plan.isFree ? "Free" : "Paid" },
    { key: "prices", header: "Prices", render: (plan) => <PlanPrices prices={plan.prices ?? []} /> },
    { key: "fee", header: "Transaction fee", render: (plan) => plan.entitlements?.transaction_fee_percentage != null ? `${plan.entitlements.transaction_fee_percentage}%` : "Not configured" },
    { key: "order", header: "Order", render: (plan) => plan.displayOrder ?? 0 },
    { key: "actions", header: "Actions", render: (plan) => <div className="flex gap-3 text-xs font-semibold text-sky-700"><button onClick={() => onView(plan)}>View</button>{can("update") && Array.isArray(plan.prices) && plan.entitlements && <button onClick={() => onEdit(plan)}>Edit</button>}{plan.status !== "archived" && can(plan.status === "active" ? "deactivate" : "activate") && <button onClick={() => onStatus(plan)}>{plan.status === "active" ? "Deactivate" : "Activate"}</button>}</div> },
  ];
  return <DataTable columns={columns} data={plans} getRowKey={(plan) => plan.id} emptyMessage="No subscription plans match these filters." />;
}

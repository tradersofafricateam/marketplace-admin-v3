"use client";
import { useState } from "react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { QueryError } from "@/components/organisms/QueryError";
import { useSubscriptionPlans } from "../../../hooks/use-subscription-plans";
import { usePlansQuery } from "../../../hooks/use-plans-query";
import { usePlanAccess } from "../../../hooks/use-plan-access";
import type { SubscriptionPlan } from "../../../types";
import { PlansFilters } from "../../molecules/PlansFilters";
import { PlansTable } from "../../organisms/PlansTable";
import { PlanEditor } from "../../organisms/PlanEditor";
import { PlanDetails } from "../../organisms/PlanDetails";
import { PlanStatusDialog } from "../../organisms/PlanStatusDialog";
import { PlansSkeleton } from "../PlansSkeleton";
type Modal = { kind: "create" } | { kind: "edit" | "view" | "status"; plan: SubscriptionPlan };
export function SubscriptionPlansPage() {
  const can = usePlanAccess();
  const { query, update } = usePlansQuery();
  const plans = useSubscriptionPlans(query, can("view"));
  const [modal, setModal] = useState<Modal | null>(null);
  const close = () => setModal(null);
  if (!can("view")) return <p role="alert" className="rounded-2xl border border-slate-200 bg-white p-6">You do not have permission to view subscription plans.</p>;
  return <div className="space-y-7">
    <header className="flex flex-wrap items-end justify-between gap-4"><SectionTitle eyebrow="Subscriptions" title="Subscription plans" description="Configure pricing, benefits, and marketplace transaction fees." />{can("create") && <button onClick={() => setModal({ kind: "create" })} className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white">Create plan</button>}</header>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><PlansFilters query={query} onChange={update} />
      {plans.isPending ? <PlansSkeleton /> : plans.isError ? <QueryError resource="subscription plans" onRetry={() => { void plans.refetch(); }} /> : <PlansTable plans={[...plans.data.data].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0) || a.name.localeCompare(b.name))} onView={(plan) => setModal({ kind: "view", plan })} onEdit={(plan) => setModal({ kind: "edit", plan })} onStatus={(plan) => setModal({ kind: "status", plan })} />}
    </section>
    {modal?.kind === "create" && <PlanEditor onClose={close} />}
    {modal?.kind === "edit" && <PlanEditor key={modal.plan.id} plan={modal.plan} onClose={close} />}
    {modal?.kind === "view" && <PlanDetails plan={modal.plan} onClose={close} />}
    {modal?.kind === "status" && <PlanStatusDialog plan={modal.plan} onClose={close} />}
  </div>;
}

"use client";
import type { SubscriptionPlan } from "../../../types";
import { usePlanMutation } from "../../../hooks/use-plan-mutation";
import { getApiErrorMessage } from "@/lib/api";
import { PlanDialog } from "../../molecules/PlanDialog";
export function PlanStatusDialog({ plan, onClose }: { plan: SubscriptionPlan; onClose: () => void }) {
  const mutation = usePlanMutation();
  const status = plan.status === "active" ? "inactive" : "active";
  const label = status === "active" ? "Activate" : "Deactivate";
  return <PlanDialog title={`${label} ${plan.name}`} onClose={onClose} busy={mutation.isPending}>
    <p className="text-sm text-slate-600">{status === "active" ? "This plan will become available to eligible users." : "New users will no longer be able to select this plan. Existing subscription records and historical transactions are preserved."}</p>
    {mutation.error && <p role="alert" className="mt-4 text-sm text-red-600">{getApiErrorMessage(mutation.error, "Unable to update plan status.")}</p>}
    <footer className="mt-6 flex justify-end gap-3"><button disabled={mutation.isPending} onClick={onClose}>Cancel</button><button disabled={mutation.isPending} onClick={() => mutation.mutate({ kind: "status", id: plan.id, status }, { onSuccess: onClose })} className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{mutation.isPending ? "Saving…" : label}</button></footer>
  </PlanDialog>;
}

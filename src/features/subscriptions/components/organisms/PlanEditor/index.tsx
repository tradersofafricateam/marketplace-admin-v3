"use client";
import type { SubscriptionPlan } from "../../../types";
import { usePlanEditor } from "../../../hooks/use-plan-editor";
import { PlanDialog } from "../../molecules/PlanDialog";
import { FinancialNotice } from "../../molecules/FinancialNotice";
import { PlanBasicFields } from "../PlanBasicFields";
import { PlanPricesEditor } from "../PlanPricesEditor";
import { PlanEntitlementsEditor } from "../PlanEntitlementsEditor";
export function PlanEditor({ plan, onClose }: { plan?: SubscriptionPlan; onClose: () => void }) {
  const editor = usePlanEditor(plan, onClose);
  return <PlanDialog title={plan ? `Edit ${plan.name}` : "Create subscription plan"} onClose={onClose} busy={editor.pending}>
    <form onSubmit={(event) => { event.preventDefault(); editor.save(); }}><fieldset disabled={editor.pending} className="space-y-6">
      <PlanBasicFields value={editor.value} onChange={editor.update} />
      <PlanPricesEditor prices={editor.value.prices} onChange={(prices) => editor.update({ prices })} />
      <PlanEntitlementsEditor rows={editor.rows} onChange={editor.setRows} />
      {plan ? <FinancialNotice /> : <p className="text-sm text-slate-500">New plans are created as drafts. Activate a plan when it is ready for users.</p>}
      {editor.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{editor.error}</p>}
      <footer className="flex justify-end gap-3"><button type="button" onClick={onClose}>Cancel</button><button className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{editor.pending ? "Saving…" : "Save plan"}</button></footer>
    </fieldset></form>
  </PlanDialog>;
}

import type { PlanInput, PlanAudience } from "../../../types";
import { PLAN_AUDIENCES } from "../../../constants";
import { PlanField, planFieldClass } from "../../atoms/PlanField";
export function PlanBasicFields({ value, onChange }: { value: PlanInput; onChange: (updates: Partial<PlanInput>) => void }) {
  return <section className="space-y-4"><h3 className="font-bold">Basic information</h3>
    <PlanField label="Plan name" required value={value.name} onChange={(event) => onChange({ name: event.target.value })} />
    <label className="block space-y-2 text-sm font-medium">Description<textarea rows={3} value={value.description} onChange={(event) => onChange({ description: event.target.value })} className={planFieldClass} /></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Audience<select value={value.audience} onChange={(event) => onChange({ audience: event.target.value as PlanAudience })} className={planFieldClass}>{PLAN_AUDIENCES.map((audience) => <option key={audience}>{audience}</option>)}</select></label><PlanField label="Display order" type="number" min={0} step={1} required value={value.displayOrder} onChange={(event) => onChange({ displayOrder: Number(event.target.value) })} /></div>
    <div className="flex flex-wrap gap-5 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={value.isFree} onChange={(event) => onChange({ isFree: event.target.checked })} />Free plan</label><label className="flex items-center gap-2"><input type="checkbox" checked={value.isDefault} onChange={(event) => onChange({ isDefault: event.target.checked })} />Default plan</label></div>
  </section>;
}

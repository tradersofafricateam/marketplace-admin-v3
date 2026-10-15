import type { EntitlementRow } from "../../../types";
import { ENTITLEMENT_DEFINITIONS } from "../../../constants/entitlements";
import { EntitlementEditorRow } from "../../molecules/EntitlementEditorRow";
import { planFieldClass } from "../../atoms/PlanField";
export function PlanEntitlementsEditor({ rows, onChange }: { rows: EntitlementRow[]; onChange: (rows: EntitlementRow[]) => void }) {
  const groups = [...new Set(rows.map((row) => ENTITLEMENT_DEFINITIONS.find((item) => item.code === row.code)?.group ?? "Additional benefits"))];
  return <section className="space-y-4 border-t border-slate-200 pt-5"><h3 className="font-bold">Entitlements</h3><p className="text-sm text-slate-500">Configure benefits by code. Seller plans must include a transaction fee percentage.</p>
    {groups.map((group) => <section key={group} className="space-y-2"><h4 className="text-sm font-semibold text-sky-700">{group}</h4>{rows.map((row, index) => (ENTITLEMENT_DEFINITIONS.find((item) => item.code === row.code)?.group ?? "Additional benefits") === group && <EntitlementEditorRow key={index} row={row} onChange={(value) => onChange(rows.map((entry, i) => i === index ? value : entry))} onRemove={() => onChange(rows.filter((_, i) => i !== index))} />)}</section>)}
    <label className="block space-y-2 text-sm font-medium">Add benefit<select aria-label="Add entitlement" value="" onChange={(event) => { const definition = ENTITLEMENT_DEFINITIONS.find((item) => item.code === event.target.value); if (definition) onChange([...rows, { code: definition.code, type: definition.type, value: "" }]); }} className={planFieldClass}><option value="">Choose a benefit</option>{ENTITLEMENT_DEFINITIONS.filter((item) => !rows.some((row) => row.code === item.code)).map((item) => <option key={item.code} value={item.code}>{item.group} — {item.label}</option>)}</select></label>
    <button type="button" onClick={() => onChange([...rows, { code: "", type: "string", value: "" }])} className="text-sm font-semibold text-sky-700">Add custom entitlement</button>
  </section>;
}

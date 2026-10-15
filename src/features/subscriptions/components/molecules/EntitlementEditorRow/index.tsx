import type { EntitlementRow } from "../../../types";
import { ENTITLEMENT_DEFINITIONS } from "../../../constants/entitlements";
import { planFieldClass } from "../../atoms/PlanField";
export function EntitlementEditorRow({ row, onChange, onRemove }: { row: EntitlementRow; onChange: (row: EntitlementRow) => void; onRemove: () => void }) {
  const definition = ENTITLEMENT_DEFINITIONS.find((item) => item.code === row.code);
  return <div className="grid items-end gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
    <label className="space-y-1 text-xs font-semibold">{definition?.label || "Entitlement code"}<input aria-label="Entitlement code" readOnly={Boolean(definition)} required value={row.code} onChange={(event) => onChange({ ...row, code: event.target.value, type: ENTITLEMENT_DEFINITIONS.find((item) => item.code === event.target.value)?.type ?? row.type })} className={planFieldClass} /></label>
    <label className="space-y-1 text-xs font-semibold">Type<select disabled={Boolean(definition)} value={definition?.type ?? row.type} onChange={(event) => onChange({ ...row, type: event.target.value as EntitlementRow["type"], value: "" })} className={planFieldClass}>{["boolean", "integer", "decimal", "string", "null"].map((type) => <option key={type}>{type}</option>)}</select></label>
    <label className="space-y-1 text-xs font-semibold">Value{row.type === "boolean" ? <select aria-label={`${row.code} value`} value={row.value} onChange={(event) => onChange({ ...row, value: event.target.value })} required className={planFieldClass}><option value="">Choose</option><option value="true">Enabled</option><option value="false">Disabled</option></select> : <input aria-label={`${row.code} value`} disabled={row.type === "null"} required={row.type !== "null"} type={["integer", "decimal"].includes(row.type) ? "number" : "text"} step={row.type === "integer" ? 1 : "any"} min={definition && ["integer", "decimal"].includes(row.type) ? 0 : undefined} max={row.code === "transaction_fee_percentage" ? 100 : undefined} value={row.value} onChange={(event) => onChange({ ...row, value: event.target.value })} className={planFieldClass} />}</label>
    <button type="button" onClick={onRemove} aria-label={`Remove ${row.code || "entitlement"}`} className="py-2 text-xs text-red-600">Remove</button>
  </div>;
}

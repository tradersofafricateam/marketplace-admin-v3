import type { PlanPrice } from "../../../types";
import { BILLING_PERIODS } from "../../../constants";
import { PlanField, planFieldClass } from "../../atoms/PlanField";
export function PlanPricesEditor({ prices, onChange }: { prices: PlanPrice[]; onChange: (prices: PlanPrice[]) => void }) {
  const update = (index: number, change: Partial<PlanPrice>) => onChange(prices.map((price, i) => i === index ? { ...price, ...change } : price));
  return <section className="space-y-4 border-t border-slate-200 pt-5"><h3 className="font-bold">Pricing</h3>
    {prices.map((price, index) => <fieldset key={price.id ?? index} className="grid items-end gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"><legend className="px-1 text-xs text-slate-500">Price {index + 1}</legend>
      <PlanField label="Currency" required maxLength={3} pattern="[A-Za-z]{3}" value={price.currency} onChange={(event) => update(index, { currency: event.target.value.toUpperCase() })} />
      <PlanField label="Amount" required type="number" min={0} step="any" value={price.amount} onChange={(event) => update(index, { amount: event.target.value })} />
      <label className="space-y-2 text-sm font-medium">Billing period<select value={price.billingPeriod} onChange={(event) => update(index, { billingPeriod: event.target.value })} className={planFieldClass}>{!BILLING_PERIODS.includes(price.billingPeriod) && <option>{price.billingPeriod}</option>}{BILLING_PERIODS.map((period) => <option key={period}>{period}</option>)}</select></label>
      <button type="button" aria-label={`Remove price ${index + 1}`} onClick={() => onChange(prices.filter((_, i) => i !== index))} className="py-2 text-sm text-red-600">Remove</button>
    </fieldset>)}
    <button type="button" onClick={() => onChange([...prices, { currency: "", amount: "", billingPeriod: "monthly" }])} className="text-sm font-semibold text-sky-700">Add price</button>
  </section>;
}

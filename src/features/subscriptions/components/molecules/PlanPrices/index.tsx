import type { PlanPrice } from "../../../types";
export function PlanPrices({ prices }: { prices: PlanPrice[] }) {
  return prices.length ? <ul className="space-y-1 text-sm">{prices.map((price, index) => <li key={price.id ?? index} className="whitespace-nowrap">{price.currency} {Number(price.amount).toLocaleString(undefined, { maximumFractionDigits: 4 })}<span className="text-xs text-slate-500"> / {price.billingPeriod}{price.status && price.status !== "active" ? ` (${price.status})` : ""}</span></li>)}</ul> : <span className="text-sm text-slate-500">No prices configured</span>;
}

import { ENTITLEMENT_DEFINITIONS } from "../constants/entitlements";
import type { EntitlementRow, Entitlements } from "../types";
export function entitlementRows(values: Entitlements): EntitlementRow[] {
  return Object.entries(values).map(([code, value]) => ({ code, type: ENTITLEMENT_DEFINITIONS.find((item) => item.code === code)?.type ?? (value === null ? "null" : typeof value === "boolean" ? "boolean" : typeof value === "number" ? (Number.isInteger(value) ? "integer" : "decimal") : "string"), value: value === null ? "" : String(value) }));
}
export function parseEntitlements(rows: EntitlementRow[]): Entitlements {
  const values: Entitlements = Object.create(null);
  for (const row of rows) {
    const code = row.code.trim();
    if (!/^[a-z][a-z0-9_]*$/.test(code)) throw new Error("Entitlement codes must use lowercase letters, numbers and underscores.");
    if (Object.hasOwn(values, code)) throw new Error(`Duplicate entitlement: ${code}.`);
    if (row.type === "boolean" && !["true", "false"].includes(row.value)) throw new Error(`Select a value for ${code}.`);
    if (["integer", "decimal"].includes(row.type)) {
      const number = Number(row.value);
      if (!row.value.trim() || !Number.isFinite(number) || (row.type === "integer" && !Number.isSafeInteger(number))) throw new Error(`Enter a valid ${row.type} for ${code}.`);
      values[code] = number;
    } else values[code] = row.type === "null" ? null : row.type === "boolean" ? row.value === "true" : row.value;
  }
  return values;
}

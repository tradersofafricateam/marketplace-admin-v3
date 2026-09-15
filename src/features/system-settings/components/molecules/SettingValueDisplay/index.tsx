import { cn } from "@/lib/utils";
import type { SystemSetting } from "../../../types";

export function SettingValueDisplay({ setting }: { setting: SystemSetting }) {
  const { value, valueType } = setting;

  if (valueType === "boolean") {
    return (
      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", value ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600")}>
        {value ? "Enabled" : "Disabled"}
      </span>
    );
  }

  if (valueType === "array" && Array.isArray(value)) {
    return (
      <span className="flex flex-wrap gap-1">
        {value.length === 0 && <span className="text-slate-400">None</span>}
        {value.map((item) => (
          <span key={String(item)} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {String(item)}
          </span>
        ))}
      </span>
    );
  }

  if (valueType === "object" && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, number | boolean>);
    if (entries.length === 0) return <span className="text-slate-400">Not configured</span>;
    return (
      <span className="flex flex-wrap gap-1">
        {entries.map(([key, entryValue]) => (
          <span key={key} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {key}: {String(entryValue)}
          </span>
        ))}
      </span>
    );
  }

  return <span className="font-medium text-navy-deep">{String(value)}</span>;
}

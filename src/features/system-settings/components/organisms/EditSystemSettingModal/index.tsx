"use client";

import { useState } from "react";
import { AlertTriangle, LoaderCircle, X } from "lucide-react";
import { useUpdateSystemSetting } from "../../../hooks";
import { isHighRiskSetting, settingKeyLabel } from "../../../helpers";
import { getApiErrorMessage } from "@/lib/api";
import type { SettingValue, SystemSetting } from "../../../types";

function toEditableState(setting: SystemSetting): { text: string; entries: [string, string][] } {
  if (setting.valueType === "array" && Array.isArray(setting.value)) {
    return { text: setting.value.join(", "), entries: [] };
  }
  if (setting.valueType === "object" && typeof setting.value === "object" && setting.value !== null) {
    return { text: "", entries: Object.entries(setting.value as Record<string, number>).map(([key, value]) => [key, String(value)]) };
  }
  return { text: String(setting.value), entries: [] };
}

export function EditSystemSettingModal({ setting, onClose }: { setting: SystemSetting | null; onClose: () => void }) {
  const mutation = useUpdateSystemSetting();
  const initial = setting ? toEditableState(setting) : { text: "", entries: [] as [string, string][] };
  const [text, setText] = useState(initial.text);
  const [boolValue, setBoolValue] = useState(Boolean(setting?.value));
  const [entries, setEntries] = useState<[string, string][]>(initial.entries);
  const [confirming, setConfirming] = useState(false);

  if (!setting) return null;

  function buildValue(): SettingValue {
    if (!setting) return "";
    if (setting.valueType === "boolean") return boolValue;
    if (setting.valueType === "number") return Number(text);
    if (setting.valueType === "array") return text.split(",").map((item) => item.trim()).filter(Boolean);
    if (setting.valueType === "object") {
      return Object.fromEntries(entries.filter(([key]) => key.trim()).map(([key, value]) => [key.trim(), Number(value) || 0]));
    }
    return text;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isHighRiskSetting(setting!.key) && !confirming) {
      setConfirming(true);
      return;
    }
    mutation.mutate({ key: setting!.key, value: buildValue() }, { onSuccess: onClose });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="edit-setting-title" className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between">
          <div>
            <h2 id="edit-setting-title" className="text-xl font-bold text-navy-deep">{settingKeyLabel(setting.key)}</h2>
            <p className="mt-1 text-sm text-slate-500">{setting.description}</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>

        {confirming ? (
          <div className="mt-6 space-y-5">
            <div className="flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              <p>
                You are changing <strong>{settingKeyLabel(setting.key)}</strong> from{" "}
                <strong>{String(setting.value)}</strong> to <strong>{String(buildValue())}</strong>. This affects future
                eligibility and processing only — existing records are not recalculated. Continue?
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setConfirming(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
                Back
              </button>
              <button
                onClick={() => mutation.mutate({ key: setting.key, value: buildValue() }, { onSuccess: onClose })}
                disabled={mutation.isPending}
                className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {mutation.isPending && <LoaderCircle className="animate-spin" size={16} />}
                Confirm change
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {setting.valueType === "boolean" && (
              <label className="flex items-center gap-3 text-sm font-semibold text-navy-deep">
                <input type="checkbox" checked={boolValue} onChange={(event) => setBoolValue(event.target.checked)} className="size-4 rounded border-slate-300" />
                Enabled
              </label>
            )}
            {setting.valueType === "number" && (
              <label className="block space-y-2 text-sm font-semibold text-navy-deep">
                Value
                <input
                  type="number"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500"
                />
              </label>
            )}
            {setting.valueType === "string" && setting.key === "payoutApprovalMode" && (
              <label className="block space-y-2 text-sm font-semibold text-navy-deep">
                Approval mode
                <select value={text} onChange={(event) => setText(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal">
                  <option value="single_approval">Single approval</option>
                  <option value="maker_checker">Maker-checker</option>
                </select>
              </label>
            )}
            {setting.valueType === "string" && setting.key !== "payoutApprovalMode" && (
              <label className="block space-y-2 text-sm font-semibold text-navy-deep">
                Value
                <input
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-sky-500"
                />
              </label>
            )}
            {setting.valueType === "array" && (
              <label className="block space-y-2 text-sm font-semibold text-navy-deep">
                Values (comma separated)
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-sky-500"
                />
              </label>
            )}
            {setting.valueType === "object" && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-navy-deep">Per-currency values</p>
                {entries.map(([key, value], index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      placeholder="Currency code"
                      value={key}
                      onChange={(event) => setEntries(entries.map((entry, i) => (i === index ? [event.target.value.toUpperCase(), entry[1]] : entry)))}
                      className="h-10 w-28 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-500"
                    />
                    <input
                      placeholder="Amount"
                      type="number"
                      value={value}
                      onChange={(event) => setEntries(entries.map((entry, i) => (i === index ? [entry[0], event.target.value] : entry)))}
                      className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-500"
                    />
                    <button type="button" onClick={() => setEntries(entries.filter((_, i) => i !== index))} className="rounded-xl border border-slate-200 px-3 text-sm text-slate-500 hover:bg-slate-50">
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setEntries([...entries, ["", "0"]])} className="text-sm font-semibold text-sky-700">
                  + Add currency
                </button>
              </div>
            )}
            {mutation.error && <p className="text-sm text-red-600">{getApiErrorMessage(mutation.error)}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
                Cancel
              </button>
              <button disabled={mutation.isPending} className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                {mutation.isPending && <LoaderCircle className="animate-spin" size={16} />}
                {isHighRiskSetting(setting.key) ? "Review change" : "Save changes"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

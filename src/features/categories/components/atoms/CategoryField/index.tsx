import type { InputHTMLAttributes } from "react";
export const fieldClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500";
export function CategoryField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="block space-y-2 text-sm font-medium text-navy-deep">{label}<input {...props} className={fieldClass} /></label>;
}

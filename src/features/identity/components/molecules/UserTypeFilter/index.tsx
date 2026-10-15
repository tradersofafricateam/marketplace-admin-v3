import type { UserTypeFilter as FilterValue } from "../../../types/users";

export function UserTypeFilter({ value, onChange }: { value: FilterValue; onChange: (value: FilterValue) => void }) {
  return (
    <div role="group" aria-label="Filter users by type" className="flex flex-wrap gap-2 px-5 pb-5">
      {([["", "All users"], ["buyer", "Buyers"], ["seller", "Sellers"]] as const).map(([type, label]) => (
        <button key={type} type="button" aria-pressed={value === type} onClick={() => onChange(type)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${value === type ? "bg-navy text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

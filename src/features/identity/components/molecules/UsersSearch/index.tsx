import { Search } from "lucide-react";

export function UsersSearch({ search, onSearch }: { search: string; onSearch: (search: string) => void }) {
  return (
    <form className="flex gap-2 p-5" onSubmit={(event) => {
      event.preventDefault();
      onSearch(String(new FormData(event.currentTarget).get("search") ?? "").trim());
    }}>
      <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3">
        <Search size={17} className="shrink-0 text-slate-400" aria-hidden="true" />
        <input key={search} name="search" aria-label="Search users by name or email" defaultValue={search} placeholder="Search by name or email" className="h-11 w-full min-w-0 bg-transparent text-sm outline-none" />
      </label>
      <button className="rounded-xl bg-navy px-4 text-sm font-semibold text-white">Search</button>
      {search && <button type="button" onClick={() => onSearch("")} className="text-sm font-medium text-sky-700">Clear</button>}
    </form>
  );
}

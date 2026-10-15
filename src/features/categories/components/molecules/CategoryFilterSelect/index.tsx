"use client";
import { useCategoryTree } from "../../../hooks/use-categories";
import { categoryName } from "../../../helpers";
import type { CategoryNode } from "../../../types";

function options(nodes: CategoryNode[], prefix = ""): { id: string; label: string }[] {
  return nodes.flatMap((node) => {
    const label = `${prefix}${categoryName(node.name)}`;
    return [{ id: node.id, label }, ...options(node.children ?? [], `${label} / `)];
  });
}
export function CategoryFilterSelect({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const tree = useCategoryTree();
  const items = options(tree.data ?? []);
  return <div>
    <select aria-label="Filter products by category" value={value} onChange={(event) => onChange(event.target.value)} disabled={tree.isPending} className="h-11 max-w-64 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600">
      <option value="">{tree.isPending ? "Loading categories…" : "All categories"}</option>
      {value && !items.some((item) => item.id === value) && <option value={value}>Selected category ({value})</option>}
      {items.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
    </select>
    {tree.isError && <button type="button" onClick={() => { void tree.refetch(); }} className="block text-xs text-red-600">Unable to load categories. Retry</button>}
  </div>;
}

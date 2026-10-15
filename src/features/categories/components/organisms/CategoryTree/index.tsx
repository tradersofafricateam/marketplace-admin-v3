"use client";
import { useCategoryTree } from "../../../hooks/use-categories";
import { categoryName } from "../../../helpers";
import type { CategoryNode } from "../../../types";
import { QueryError } from "@/components/organisms/QueryError";
import { CategoriesSkeleton } from "../../templates/CategoriesSkeleton";
export function CategoryTree({ onSelect }: { onSelect: (id: string) => void }) {
  const tree = useCategoryTree();
  if (tree.isPending) return <CategoriesSkeleton />;
  if (tree.isError) return <QueryError resource="category hierarchy" onRetry={() => { void tree.refetch(); }} />;
  return <section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="mb-4 font-semibold">Active category hierarchy</h2>{tree.data.length ? <Branches nodes={tree.data} onSelect={onSelect} /> : <p className="text-sm text-slate-500">No active categories.</p>}</section>;
}
function Branches({ nodes, onSelect }: { nodes: CategoryNode[]; onSelect: (id: string) => void }) {
  return <ul className="space-y-3 border-l border-slate-200 pl-4">{nodes.map((node) => <li key={node.id}>{node.children?.length ? <details open><summary className="cursor-pointer text-sm font-semibold">{categoryName(node.name)} ({node.children.length})</summary><button className="my-2 text-xs text-sky-700 hover:underline" onClick={() => onSelect(node.id)}>View category</button><Branches nodes={node.children} onSelect={onSelect} /></details> : <button onClick={() => onSelect(node.id)} className="text-sm text-sky-700 hover:underline">{categoryName(node.name)}</button>}</li>)}</ul>;
}

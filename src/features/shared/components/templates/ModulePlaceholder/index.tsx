import { SectionTitle } from "@/components/atoms/SectionTitle";
import type { AdminModule } from "@/lib/types/navigation";

export function ModulePlaceholder({ module }: { module: AdminModule }) {
  const Icon = module.icon;
  return <div className="space-y-8"><SectionTitle eyebrow={module.group} title={module.title} description={module.description} /><section className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-sky-50 text-navy"><Icon size={26} /></span><h2 className="mt-4 font-bold text-navy-deep">{module.title} workspace</h2><p className="mt-2 max-w-md text-sm text-slate-500">The route and feature boundary are ready for its API, hooks, domain types, and atomic UI components.</p></div></section></div>;
}

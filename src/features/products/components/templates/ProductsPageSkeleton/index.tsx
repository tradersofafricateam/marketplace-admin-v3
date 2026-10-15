import { Skeleton } from "@/components/atoms/Skeleton";
import { ProductsTableSkeleton } from "../../organisms";

export function ProductsPageSkeleton() {
  return (
    <div className="space-y-7" role="status" aria-label="Loading products">
      <div className="space-y-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Skeleton className="size-11 rounded-xl" />
            <Skeleton className="mt-5 h-8 w-16" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        ))}
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex gap-3 border-b border-slate-200 p-5">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="hidden h-11 w-36 lg:block" />
        </div>
        <ProductsTableSkeleton />
        <div className="flex justify-between border-t border-slate-200 p-5">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-8 w-52" />
        </div>
      </section>
      <span className="sr-only">Loading products</span>
    </div>
  );
}

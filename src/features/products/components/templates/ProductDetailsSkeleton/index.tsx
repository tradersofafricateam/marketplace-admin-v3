import { Skeleton } from "@/components/atoms/Skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="space-y-7" role="status" aria-label="Loading product">
      <Skeleton className="h-4 w-32" />
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="hidden h-11 w-36 sm:block" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.4fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <Skeleton className="mt-4 h-6 w-32" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton className="h-5 w-40" />
          <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading product</span>
    </div>
  );
}

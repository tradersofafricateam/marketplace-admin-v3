import { Skeleton } from "@/components/atoms/Skeleton";

export function SellerVerificationDetailsSkeleton() {
  return (
    <div className="space-y-7" role="status" aria-label="Loading seller verification">
      <Skeleton className="h-4 w-40" />
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <div className="hidden gap-3 sm:flex">
          <Skeleton className="h-11 w-24 rounded-xl" />
          <Skeleton className="h-11 w-24 rounded-xl" />
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.4fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton className="mx-auto size-20 rounded-full" />
          <Skeleton className="mx-auto mt-4 h-6 w-40" />
          <Skeleton className="mx-auto mt-3 h-6 w-20 rounded-full" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <Skeleton className="h-5 w-40" />
            <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading seller verification</span>
    </div>
  );
}

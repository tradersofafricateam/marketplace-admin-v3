import { Skeleton } from "@/components/atoms/Skeleton";
import { SellerVerificationsTableSkeleton } from "../../organisms";

export function SellerVerificationsPageSkeleton() {
  return (
    <div className="space-y-7" role="status" aria-label="Loading seller verification requests">
      <div className="space-y-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex gap-2 border-b border-slate-200 p-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-20 rounded-xl" />
          ))}
        </div>
        <SellerVerificationsTableSkeleton />
        <div className="flex justify-between border-t border-slate-200 p-5">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-8 w-52" />
        </div>
      </section>
      <span className="sr-only">Loading seller verification requests</span>
    </div>
  );
}

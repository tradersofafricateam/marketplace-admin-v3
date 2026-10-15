import { Skeleton } from "@/components/atoms/Skeleton";

export function UserDetailsSkeleton() {
  return (
    <div role="status" aria-label="Loading user information" className="space-y-7">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-8 w-56" />
      <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton className="mx-auto size-20 rounded-full" />
          <Skeleton className="mx-auto h-5 w-40" />
          <Skeleton className="mx-auto h-6 w-24" />
        </div>
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-14 w-full" />)}
        </div>
      </div>
      <span className="sr-only">Loading user information</span>
    </div>
  );
}

import { Skeleton } from "@/components/atoms/Skeleton";
import { AdminUsersTableSkeleton } from "../../organisms";

export function AdminUsersPageSkeleton() {
  return (
    <div
      className="space-y-7"
      role="status"
      aria-label="Loading admin accounts"
    >
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="hidden h-11 w-44 sm:block" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
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
          <Skeleton className="hidden h-11 w-36 lg:block" />
        </div>
        <AdminUsersTableSkeleton />
        <div className="flex justify-between border-t border-slate-200 p-5">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-8 w-52" />
        </div>
      </section>
      <span className="sr-only">Loading admin accounts</span>
    </div>
  );
}

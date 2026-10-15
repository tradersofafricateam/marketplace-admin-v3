import { Skeleton } from "@/components/atoms/Skeleton";

export function UsersPageSkeleton() {
  return <div role="status" aria-label="Loading users" className="space-y-5"><Skeleton className="h-8 w-48" /><Skeleton className="h-11 w-full" />{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-16 w-full" />)}<span className="sr-only">Loading users</span></div>;
}

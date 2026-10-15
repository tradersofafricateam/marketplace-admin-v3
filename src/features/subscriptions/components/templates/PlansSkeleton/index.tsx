import { Skeleton } from "@/components/atoms/Skeleton";
export function PlansSkeleton() {
  return <div role="status" aria-label="Loading subscription plans" className="space-y-4 p-5">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-16 w-full" />)}<span className="sr-only">Loading subscription plans</span></div>;
}

import { Skeleton } from "@/components/atoms/Skeleton";
export function CategoriesSkeleton() {
  return <div role="status" aria-label="Loading categories" className="space-y-4 p-5">{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-12 w-full" />)}<span className="sr-only">Loading categories</span></div>;
}

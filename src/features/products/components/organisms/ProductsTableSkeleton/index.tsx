import { Skeleton } from "@/components/atoms/Skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProductsTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading products">
      <Table>
        <TableHeader>
          <TableRow>
            {["Product", "Price", "Stock", "Status", ""].map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index} className="hover:bg-transparent">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 shrink-0 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="size-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="sr-only">Loading products</span>
    </div>
  );
}

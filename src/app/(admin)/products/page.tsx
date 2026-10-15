import { Suspense } from "react";
import { ProductsPage } from "@/features/products/components/templates/ProductsPage";
import { ProductsPageSkeleton } from "@/features/products/components/templates/ProductsPageSkeleton";

export default function ProductsRoute() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPage />
    </Suspense>
  );
}

import { Suspense } from "react";
import { CategoriesPage } from "@/features/categories/components/templates/CategoriesPage";
import { CategoriesSkeleton } from "@/features/categories/components/templates/CategoriesSkeleton";
export default function CategoriesRoute() {
  return <Suspense fallback={<CategoriesSkeleton />}><CategoriesPage /></Suspense>;
}

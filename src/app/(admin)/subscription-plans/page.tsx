import { Suspense } from "react";
import { SubscriptionPlansPage } from "@/features/subscriptions/components/templates/SubscriptionPlansPage";
import { PlansSkeleton } from "@/features/subscriptions/components/templates/PlansSkeleton";
export default function SubscriptionPlansRoute() {
  return <Suspense fallback={<PlansSkeleton />}><SubscriptionPlansPage /></Suspense>;
}

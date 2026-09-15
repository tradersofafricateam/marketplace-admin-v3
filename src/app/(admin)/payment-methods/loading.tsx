import { EntityListPageSkeleton } from "@/features/system-settings/components/templates/EntityListPageSkeleton";

export default function PaymentMethodsLoading() {
  return <EntityListPageSkeleton columns={4} showAction={false} />;
}

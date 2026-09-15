import { EntityListPageSkeleton } from "@/features/system-settings/components/templates/EntityListPageSkeleton";

export default function LanguagesLoading() {
  return <EntityListPageSkeleton columns={5} showAction={false} />;
}

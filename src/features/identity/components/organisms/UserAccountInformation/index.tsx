import { CopyableId } from "@/components/atoms/CopyableId";
import type { MarketplaceUserDetail } from "../../../types/users";
import { formatAdminDate } from "../../../helpers";
import { ProfileSection, ProfileField as Field } from "../../molecules/ProfileSection";

export function UserAccountInformation({ user }: { user: MarketplaceUserDetail }) {
  return <>
    <ProfileSection title="User information">
      <Field label="User ID"><CopyableId value={user.id} label="User ID" /></Field>
      <Field label="Email"><a href={`mailto:${user.email}`} className="text-sky-700 hover:underline">{user.email}</a></Field>
      <Field label="Phone">{user.phoneNumber}</Field>
      <Field label="Language">{user.selectedLanguage}</Field>
      <Field label="Country">{user.country}</Field>
      <Field label="Delivery address">{user.deliveryAddress}</Field>
      <Field label="Joined">{formatAdminDate(user.createdAt)}</Field>
      <Field label="Last updated">{formatAdminDate(user.updatedAt)}</Field>
      <Field label="Terms of use">{user.termsOfUse ? "Accepted" : "Not accepted"}</Field>
      <Field label="Merchant terms">{user.merchantTerms ? "Accepted" : "Not accepted"}</Field>
    </ProfileSection>
    <ProfileSection title="Points & reviews">
      <Field label="Total points">{user.totalPoints.toLocaleString()}</Field>
      <Field label="Review count">{user.totalReviewCount.toLocaleString()}</Field>
      <Field label="Average rating">{user.totalAverageReviews}</Field>
      <Field label="Referral code">{user.referralCode ? <CopyableId value={user.referralCode} label="Referral code" /> : "—"}</Field>
    </ProfileSection>
    {(user.statusReason || user.disabledBy || user.disabledAt) && <ProfileSection title="Account status details">
      <Field label="Reason">{user.statusReason}</Field>
      <Field label="Disabled at">{user.disabledAt ? formatAdminDate(user.disabledAt) : "—"}</Field>
      <Field label="Disabled by">{user.disabledBy ? <CopyableId value={user.disabledBy} label="Admin ID" href={`/admin-users/${encodeURIComponent(user.disabledBy)}`} /> : "—"}</Field>
    </ProfileSection>}
  </>;
}

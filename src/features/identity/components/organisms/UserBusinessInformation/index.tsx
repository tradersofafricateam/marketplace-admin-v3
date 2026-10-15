import { RichText } from "@/components/atoms/RichText";
import type { MarketplaceUserDetail } from "../../../types/users";
import { ProfileSection, ProfileField as Field } from "../../molecules/ProfileSection";

export function UserBusinessInformation({ user }: { user: MarketplaceUserDetail }) {
  const values = [user.storeName, user.companyName, user.registrationNumber, user.businessType, user.yearsOfBusiness, user.companyAddress, user.pickupAddress, user.companyBio];
  if (user.userType !== "seller" && !values.some((value) => value !== null && value !== undefined && value !== "")) return null;
  return (
    <ProfileSection title="Business information">
      <Field label="Store name">{user.storeName}</Field>
      <Field label="Company name">{user.companyName}</Field>
      <Field label="Registration number">{user.registrationNumber}</Field>
      <Field label="Business type">{user.businessType}</Field>
      <Field label="Years in business">{user.yearsOfBusiness}</Field>
      <Field label="Company address">{user.companyAddress}</Field>
      <Field label="Pickup address">{user.pickupAddress}</Field>
      <div className="sm:col-span-2"><Field label="Company bio"><RichText value={user.companyBio} /></Field></div>
    </ProfileSection>
  );
}

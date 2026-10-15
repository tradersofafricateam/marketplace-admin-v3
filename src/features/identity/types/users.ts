import type { Pagination } from "./index";

export type MarketplaceUser = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userType: string;
  status: string;
  isEmailVerified: boolean;
  isCompanyVerified: boolean;
  totalPoints: number;
  createdAt: string;
};
export type UserTypeFilter = "" | "buyer" | "seller";
export type UsersQuery = { page: number; limit: number; search: string; userType: UserTypeFilter };
export type UsersResponse = { data: MarketplaceUser[]; meta: Pagination };

export type MarketplaceUserDetail = MarketplaceUser & {
  termsOfUse: boolean;
  merchantTerms: boolean;
  selectedLanguage: string | null;
  storeName: string | null;
  companyName: string | null;
  registrationNumber: string | null;
  businessType: string | null;
  yearsOfBusiness: number | null;
  companyAddress: string | null;
  pickupAddress: string | null;
  deliveryAddress: string | null;
  country: string | null;
  companyLogo: string | null;
  companyBio: string | null;
  totalReviewCount: number;
  totalAverageReviews: string;
  referral: unknown;
  referralCode: string | null;
  statusReason: string | null;
  disabledBy: string | null;
  disabledAt: string | null;
  updatedAt: string;
  verification: unknown;
};

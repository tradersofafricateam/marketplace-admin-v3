/** Users, seller/business verification, and admin role-based access control. */
export const identityCapabilities = ["users", "seller-verification", "admin-users", "roles-permissions"] as const;
export {
  AdminUserDetails,
  AdminUsersPage,
  RolesPermissionsPage,
  SellerVerificationDetails,
  SellerVerificationsPage,
} from "./components";
export {
  AdminUserDetailsSkeleton,
  AdminUsersPageSkeleton,
  RolesPermissionsPageSkeleton,
  SellerVerificationDetailsSkeleton,
  SellerVerificationsPageSkeleton,
} from "./components";

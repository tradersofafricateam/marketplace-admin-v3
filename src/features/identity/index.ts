/** Users, seller/business verification, and admin role-based access control. */
export const identityCapabilities = ["users", "seller-verification", "admin-users", "roles-permissions"] as const;
export { AdminUsersPage, AdminUserDetails } from "./components";
export { AdminUsersPageSkeleton, AdminUserDetailsSkeleton } from "./components";

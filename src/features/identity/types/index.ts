export type AdminAccountStatus = "pending" | "active" | "inactive";
export type AdminRoleStatus = "active" | "inactive";

export type RolePermissionSummary = { id: string; code: string; name: string };

export type AdminRole = {
  id: string;
  name: string;
  description?: string;
  status?: AdminRoleStatus;
  permissions?: RolePermissionSummary[];
};

export type Permission = {
  id: string;
  code: string;
  name: string;
  description: string;
  module: string;
  status: "active" | "inactive";
};

export type PermissionGroup = {
  module: string;
  permissions: Permission[];
};

export type AdminAccount = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: AdminAccountStatus;
  isSuperAdmin: boolean;
  role: AdminRole;
  permissions: string[];
  lastLoginAt: string | null;
  createdAt: string;
  deactivatedAt?: string | null;
  deactivationReason?: string | null;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export type AdminUsersResponse = {
  success: boolean;
  data: AdminAccount[];
  pagination: Pagination;
};
export type AdminUsersQuery = {
  search?: string;
  status?: AdminAccountStatus | "";
  roleId?: string;
  page: number;
  limit: number;
};
export type CreateAdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleId: string;
};
export type UpdateOwnProfilePayload = Partial<
  Pick<AdminAccount, "firstName" | "lastName" | "phoneNumber">
>;
export type UpdateAdminPayload = Partial<
  Pick<AdminAccount, "firstName" | "lastName" | "phoneNumber">
> & { roleId?: string };
export type DeactivateAdminPayload = { reason: string };
export type AdminActionResponse = { success: boolean; message: string };
export type RolesResponse = {
  success: boolean;
  data: AdminRole[];
  pagination: Pagination;
};
export type PermissionsResponse = { success: boolean; data: PermissionGroup[] };
export type CreateRolePayload = {
  name: string;
  description?: string;
  permissionIds: string[];
};
export type UpdateRolePayload = Partial<CreateRolePayload>;
export type RoleStatusPayload = { status: AdminRoleStatus };
export type RoleActionResponse = {
  success: boolean;
  message: string;
  data?: AdminRole;
};

export type SellerVerificationStatus = "pending" | "approved" | "rejected";

export type SellerVerificationSummary = {
  verificationId: string;
  companyName: string;
  userId: string;
  submittedAt: string;
  status?: SellerVerificationStatus;
};

export type SellerVerificationDetail = {
  verificationId?: string;
  userId?: string;
  status: SellerVerificationStatus;
  submittedAt: string;
  storeName: string;
  companyName: string;
  registrationNumber: string;
  businessType: string;
  yearsOfBusiness: number;
  companyAddress: string;
  pickupAddress: string;
  companyBio: string;
  country: string;
  companyLogo?: string;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  rejectionReason?: string | null;
};

export type SellerVerificationsQuery = {
  status?: SellerVerificationStatus | "";
  page: number;
  limit: number;
};

export type SellerVerificationsResponse = {
  success: boolean;
  data: SellerVerificationSummary[];
  pagination: Pagination;
};

export type ApproveSellerPayload = { notes?: string };
export type RejectSellerPayload = { reason: string };
export type SellerVerificationActionResponse = { success: boolean; message: string };

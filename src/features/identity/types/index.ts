export type AdminAccountStatus = "pending" | "active" | "inactive";

export type AdminRole = {
  id: string;
  name: string;
  status?: "active" | "inactive";
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
  lastLoginAt: string | null;
  createdAt: string;
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
export type RolesResponse = {
  success: boolean;
  data: AdminRole[];
  pagination: Pagination;
};

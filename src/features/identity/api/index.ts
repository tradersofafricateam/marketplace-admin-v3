import { apiClient } from "@/lib/api";
import {
  ADMIN_PERMISSIONS_ENDPOINT,
  ADMIN_ROLES_ENDPOINT,
  ADMIN_USERS_ENDPOINT,
  APPROVE_SELLER_ENDPOINT,
  REJECT_SELLER_ENDPOINT,
  SELLER_VERIFICATIONS_ENDPOINT,
} from "../constants";
import type {
  AdminAccount,
  AdminActionResponse,
  AdminUsersQuery,
  AdminUsersResponse,
  ApproveSellerPayload,
  CreateAdminPayload,
  CreateRolePayload,
  DeactivateAdminPayload,
  PermissionsResponse,
  RejectSellerPayload,
  RoleActionResponse,
  RoleStatusPayload,
  RolesResponse,
  SellerVerificationActionResponse,
  SellerVerificationDetail,
  SellerVerificationsQuery,
  SellerVerificationsResponse,
  UpdateAdminPayload,
  UpdateOwnProfilePayload,
  UpdateRolePayload,
} from "../types";

export async function getAdminUsers(query: AdminUsersQuery) {
  const { data } = await apiClient.get<AdminUsersResponse>(
    ADMIN_USERS_ENDPOINT,
    {
      params: {
        page: query.page,
        limit: query.limit,
        search: query.search || undefined,
        status: query.status || undefined,
        roleId: query.roleId || undefined,
      },
    },
  );
  return data;
}

export async function getAdminUser(adminId: string) {
  const { data } = await apiClient.get<{
    success: boolean;
    data: AdminAccount;
  }>(`${ADMIN_USERS_ENDPOINT}/${adminId}`);
  return data.data;
}

export async function createAdminUser(payload: CreateAdminPayload) {
  const { data } = await apiClient.post<{
    success: boolean;
    message: string;
    data: AdminAccount;
  }>(ADMIN_USERS_ENDPOINT, payload);
  return data;
}

export async function getAdminRoles(
  status: "active" | "" = "active",
  page = 1,
  limit = 100,
) {
  const { data } = await apiClient.get<RolesResponse>(ADMIN_ROLES_ENDPOINT, {
    params: { status: status || undefined, page, limit },
  });
  return data;
}

export async function updateOwnAdminProfile(payload: UpdateOwnProfilePayload) {
  const { data } = await apiClient.patch<AdminActionResponse>(
    "/admin/profile",
    payload,
  );
  return data;
}

export async function updateAdminUser(
  adminId: string,
  payload: UpdateAdminPayload,
) {
  const { data } = await apiClient.patch<AdminActionResponse>(
    `${ADMIN_USERS_ENDPOINT}/${adminId}`,
    payload,
  );
  return data;
}

export async function deactivateAdminUser(
  adminId: string,
  payload: DeactivateAdminPayload,
) {
  const { data } = await apiClient.patch<AdminActionResponse>(
    `${ADMIN_USERS_ENDPOINT}/${adminId}/deactivate`,
    payload,
  );
  return data;
}

export async function activateAdminUser(adminId: string) {
  const { data } = await apiClient.patch<AdminActionResponse>(
    `${ADMIN_USERS_ENDPOINT}/${adminId}/activate`,
  );
  return data;
}

export async function resendAdminInvitation(adminId: string) {
  const { data } = await apiClient.post<AdminActionResponse>(
    `${ADMIN_USERS_ENDPOINT}/${adminId}/resend-invitation`,
  );
  return data;
}

export async function getPermissions() {
  const { data } = await apiClient.get<PermissionsResponse>(
    ADMIN_PERMISSIONS_ENDPOINT,
  );
  return data;
}

export async function createRole(payload: CreateRolePayload) {
  const { data } = await apiClient.post<RoleActionResponse>(
    ADMIN_ROLES_ENDPOINT,
    payload,
  );
  return data;
}

export async function updateRole(roleId: string, payload: UpdateRolePayload) {
  const { data } = await apiClient.patch<RoleActionResponse>(
    `${ADMIN_ROLES_ENDPOINT}/${roleId}`,
    payload,
  );
  return data;
}

export async function changeRoleStatus(
  roleId: string,
  payload: RoleStatusPayload,
) {
  const { data } = await apiClient.patch<RoleActionResponse>(
    `${ADMIN_ROLES_ENDPOINT}/${roleId}/status`,
    payload,
  );
  return data;
}

export async function getSellerVerifications(query: SellerVerificationsQuery) {
  const { data } = await apiClient.get<SellerVerificationsResponse>(
    SELLER_VERIFICATIONS_ENDPOINT,
    { params: { status: query.status || undefined, page: query.page, limit: query.limit } },
  );
  return data;
}

export async function getSellerVerification(verificationId: string) {
  const { data } = await apiClient.get<{ success: boolean; data: SellerVerificationDetail } | SellerVerificationDetail>(
    `${SELLER_VERIFICATIONS_ENDPOINT}/${verificationId}`,
  );
  return "data" in data ? data.data : data;
}

export async function approveSeller(verificationId: string, payload: ApproveSellerPayload) {
  const { data } = await apiClient.patch<SellerVerificationActionResponse>(
    `${APPROVE_SELLER_ENDPOINT}/${verificationId}`,
    payload,
  );
  return data;
}

export async function rejectSeller(verificationId: string, payload: RejectSellerPayload) {
  const { data } = await apiClient.patch<SellerVerificationActionResponse>(
    `${REJECT_SELLER_ENDPOINT}/${verificationId}`,
    payload,
  );
  return data;
}

import { apiClient } from "@/lib/api";
import { ADMIN_FORGOT_PASSWORD_ENDPOINT, ADMIN_LOGIN_ENDPOINT, ADMIN_RESET_PASSWORD_ENDPOINT, CURRENT_ADMIN_ENDPOINT } from "../constants";
import type { AdminLoginCredentials, AdminLoginResponse, AdminUser, ApiResponse, CurrentAdminResponse, ForgotPasswordPayload, ResetPasswordPayload } from "../types";

export async function loginAdmin(credentials: AdminLoginCredentials) {
  const { data } = await apiClient.post<AdminLoginResponse>(ADMIN_LOGIN_ENDPOINT, credentials);
  return data.data;
}

export async function forgotPasswordAdmin(payload: ForgotPasswordPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(ADMIN_FORGOT_PASSWORD_ENDPOINT, payload);
  return data;
}

export async function resetPasswordAdmin(payload: ResetPasswordPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(ADMIN_RESET_PASSWORD_ENDPOINT, payload);
  return data;
}

export async function getCurrentAdmin() {
  const { data } = await apiClient.get<CurrentAdminResponse | AdminUser>(CURRENT_ADMIN_ENDPOINT);
  return "data" in data ? data.data : data;
}

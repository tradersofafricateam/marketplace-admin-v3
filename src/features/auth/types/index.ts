export type AdminLoginCredentials = {
  email: string;
  password: string;
};

export type AdminLoginFormValues = AdminLoginCredentials & {
  rememberMe: boolean;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  password: string;
};

export type AdminStatus = "pending" | "active" | "inactive" | "suspended";

export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  status: AdminStatus;
  isSuperAdmin: boolean;
  role: Record<string, unknown>;
  permissions: string[];
  lastLoginAt: string;
  createdAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type AdminLoginData = {
  token: string;
  admin: AdminUser;
};

export type AdminLoginResponse = ApiResponse<AdminLoginData>;
export type CurrentAdminResponse = ApiResponse<AdminUser>;

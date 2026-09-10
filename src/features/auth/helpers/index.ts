import axios from "axios";

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

export function getLoginErrorMessage(error: unknown) {
  return getAuthErrorMessage(error, "Unable to sign in. Check your credentials and try again.");
}

export function getForgotPasswordErrorMessage(error: unknown) {
  return getAuthErrorMessage(error, "Unable to send reset instructions. Please try again.");
}

export function getResetPasswordErrorMessage(error: unknown) {
  return getAuthErrorMessage(error, "Unable to reset your password. Check the code and try again.");
}

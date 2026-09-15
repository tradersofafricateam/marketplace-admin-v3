import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || fallback;
  }
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}

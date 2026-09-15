export const APP_TOAST_EVENT = "tofa-admin-toast";
export type AppToastDetail = { message: string; tone?: "success" | "error" };

export function showToast(message: string, tone: AppToastDetail["tone"] = "success") {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent<AppToastDetail>(APP_TOAST_EVENT, { detail: { message, tone } }));
}

export const AUTH_COOKIE_CHANGE_EVENT = "tofa-admin-auth-cookie-change";

function notifyAuthCookieChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(AUTH_COOKIE_CHANGE_EVENT));
}

export function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

export function writeCookie(name: string, value: string, maxAgeSeconds?: number) {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeSeconds === undefined ? "" : `; max-age=${maxAgeSeconds}`;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/${maxAge}; SameSite=Lax${secure}`;
  notifyAuthCookieChange();
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  notifyAuthCookieChange();
}

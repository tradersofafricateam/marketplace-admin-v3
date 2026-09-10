import { ADMIN_AUTH_COOKIE, REMEMBER_ME_MAX_AGE } from "../constants";
import { deleteCookie, writeCookie } from "@/lib/helpers/cookie";

export function setAdminAuthToken(token: string, rememberMe: boolean) {
  writeCookie(ADMIN_AUTH_COOKIE, token, rememberMe ? REMEMBER_ME_MAX_AGE : undefined);
}

export function clearAdminAuthToken() {
  deleteCookie(ADMIN_AUTH_COOKIE);
}

"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentAdmin } from "../api";
import { ADMIN_AUTH_COOKIE } from "../constants";
import { clearAdminAuthToken } from "../helpers/session";
import { AUTH_COOKIE_CHANGE_EVENT, readCookie } from "@/lib/helpers/cookie";
import { useAuthStore } from "@/store/auth-store";

export function useCurrentAdmin() {
  const setCurrentAdmin = useAuthStore((state) => state.setCurrentAdmin);
  const clearCurrentAdmin = useAuthStore((state) => state.clearCurrentAdmin);
  const setIsAuthInitialized = useAuthStore((state) => state.setIsAuthInitialized);
  const [token, setToken] = useState<string | undefined>(() => readCookie(ADMIN_AUTH_COOKIE));

  useEffect(() => {
    const handleCookieChange = () => setToken(readCookie(ADMIN_AUTH_COOKIE));
    window.addEventListener(AUTH_COOKIE_CHANGE_EVENT, handleCookieChange);
    return () => window.removeEventListener(AUTH_COOKIE_CHANGE_EVENT, handleCookieChange);
  }, []);

  const query = useQuery({ queryKey: ["currentAdmin"], queryFn: getCurrentAdmin, enabled: Boolean(token), staleTime: 5 * 60 * 1000, retry: 1 });

  useEffect(() => {
    if (!token) {
      clearCurrentAdmin();
      setIsAuthInitialized(true);
      return;
    }
    if (query.isSuccess) {
      setCurrentAdmin(query.data);
      return;
    }
    if (query.isError) {
      clearAdminAuthToken();
      clearCurrentAdmin();
      setIsAuthInitialized(true);
      return;
    }
    setIsAuthInitialized(false);
  }, [token, query.data, query.isError, query.isSuccess, clearCurrentAdmin, setCurrentAdmin, setIsAuthInitialized]);

  return query;
}

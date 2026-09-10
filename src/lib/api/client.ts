import axios from "axios";
import { ADMIN_AUTH_COOKIE } from "@/features/auth/constants";
import { readCookie } from "@/lib/helpers/cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

apiClient.interceptors.request.use((config) => {
  const token = readCookie(ADMIN_AUTH_COOKIE);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

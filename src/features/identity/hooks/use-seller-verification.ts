"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerVerification } from "../api";
import { mockSellerVerifications, USE_ADMIN_USERS_MOCK } from "../constants";

export function useSellerVerification(verificationId: string) {
  return useQuery({
    queryKey: ["seller-verification", verificationId],
    queryFn: async () =>
      USE_ADMIN_USERS_MOCK
        ? (mockSellerVerifications.find((verification) => verification.verificationId === verificationId) ?? null)
        : getSellerVerification(verificationId),
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerVerifications } from "../api";
import { mockSellerVerificationSummaries, USE_ADMIN_USERS_MOCK } from "../constants";
import type { SellerVerificationsQuery } from "../types";

export function useSellerVerifications(query: SellerVerificationsQuery) {
  return useQuery({
    queryKey: ["seller-verifications", query],
    queryFn: async () => {
      if (!USE_ADMIN_USERS_MOCK) return getSellerVerifications(query);
      const filtered = mockSellerVerificationSummaries().filter(
        (verification) => !query.status || verification.status === query.status,
      );
      const start = (query.page - 1) * query.limit;
      return {
        success: true,
        data: filtered.slice(start, start + query.limit),
        pagination: {
          page: query.page,
          limit: query.limit,
          total: filtered.length,
          totalPages: Math.max(1, Math.ceil(filtered.length / query.limit)),
        },
      };
    },
    placeholderData: (previous) => previous,
  });
}

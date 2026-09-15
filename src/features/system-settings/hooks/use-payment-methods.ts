"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "../api";
import { mockPaymentMethods, USE_SYSTEM_SETTINGS_MOCK } from "../constants";

export function usePaymentMethods() {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => (USE_SYSTEM_SETTINGS_MOCK ? mockPaymentMethods : getPaymentMethods()),
  });
}

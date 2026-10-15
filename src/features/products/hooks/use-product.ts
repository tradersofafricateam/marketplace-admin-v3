"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api";
import { mockProducts, USE_PRODUCTS_MOCK } from "../constants";

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () =>
      USE_PRODUCTS_MOCK
        ? (mockProducts.find((product) => product.id === productId) ?? null)
        : getProduct(productId),
  });
}

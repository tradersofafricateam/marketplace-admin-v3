"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import { mockProducts, USE_PRODUCTS_MOCK } from "../constants";
import { localizedText } from "../helpers";
import type { ProductsQuery } from "../types";

export function useProducts(query: ProductsQuery) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      if (!USE_PRODUCTS_MOCK) return getProducts(query);
      const search = query.search?.trim().toLowerCase();
      const filtered = mockProducts.filter((product) => {
        const matchesSearch = !search || localizedText(product.productName).toLowerCase().includes(search);
        return matchesSearch && (!query.status || product.status === query.status) && (!query.categoryId || product.categoryIds.includes(query.categoryId));
      });
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

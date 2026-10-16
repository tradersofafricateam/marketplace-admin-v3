import { apiClient } from "@/lib/api";
import { PRODUCTS_ENDPOINT } from "../constants";
import type { AdminProduct, ProductActionResponse, ProductsQuery, ProductsResponse } from "../types";

export async function getProducts(query: ProductsQuery) {
  const { data } = await apiClient.get<ProductsResponse>(PRODUCTS_ENDPOINT, {
    params: {
      page: query.page,
      limit: query.limit,
      search: query.search || undefined,
      status: query.status || undefined,
      categoryId: query.categoryId || undefined,
    },
  });
  return data;
}

export async function getProduct(productId: string) {
  const { data } = await apiClient.get<{ success: boolean; data: AdminProduct } | AdminProduct>(`${PRODUCTS_ENDPOINT}/${productId}`);
  return "data" in data ? data.data : data;
}

export async function approveProduct(productId: string) {
  const { data } = await apiClient.post<ProductActionResponse>(`${PRODUCTS_ENDPOINT}/${productId}/approve`);
  return data;
}

export async function rejectProduct(productId: string, reason: string) {
  const { data } = await apiClient.post<ProductActionResponse>(`${PRODUCTS_ENDPOINT}/${productId}/reject`, { reason });
  return data;
}

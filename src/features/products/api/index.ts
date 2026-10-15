import { apiClient } from "@/lib/api";
import { PRODUCTS_ENDPOINT, PRODUCT_STATUS_ENDPOINT } from "../constants";
import type { AdminProduct, ProductActionResponse, ProductsQuery, ProductsResponse, ProductStatusPayload } from "../types";

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

export async function changeProductStatus(productId: string, payload: ProductStatusPayload) {
  const { data } = await apiClient.patch<ProductActionResponse>(`${PRODUCT_STATUS_ENDPOINT}/${productId}/status`, payload);
  return data;
}

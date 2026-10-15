"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeProductStatus } from "../api";
import { mockProducts, USE_PRODUCTS_MOCK } from "../constants";
import type { ProductStatus } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

export function useChangeProductStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, status }: { productId: string; status: ProductStatus }) => {
      if (!USE_PRODUCTS_MOCK) return changeProductStatus(productId, { status });
      const product = mockProducts.find((item) => item.id === productId);
      if (!product) throw new Error("Product not found");
      product.status = status;
      return { success: true, message: `Product marked as ${status}.` };
    },
    onSuccess: (response, { productId }) => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["product", productId] });
      showToast(response.message);
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to update this product's status."), "error"),
  });
}

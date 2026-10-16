"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveProduct, rejectProduct } from "../api";
import { mockProducts, USE_PRODUCTS_MOCK } from "../constants";
import type { ProductStatus } from "../types";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";

type ProductAction = { productId: string; currentStatus: ProductStatus } & (
  | { action: "approve" }
  | { action: "reject"; reason: string }
);

export function useChangeProductStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ProductAction) => {
      const { productId } = input;
      if (input.action === "approve" && input.currentStatus !== "pending_approval") {
        throw new Error("Only products pending approval can be approved.");
      }
      if (input.action === "reject" && input.currentStatus === "rejected") {
        throw new Error("This product is already rejected.");
      }
      if (input.action === "reject" && !input.reason.trim()) {
        throw new Error("Enter a rejection reason.");
      }
      if (!USE_PRODUCTS_MOCK) {
        if (input.action === "approve") return approveProduct(productId);
        return rejectProduct(productId, input.reason.trim());
      }
      const product = mockProducts.find((item) => item.id === productId);
      if (!product) throw new Error("Product not found");
      if (input.action === "approve" && product.status !== "pending_approval") throw new Error("Only products pending approval can be approved.");
      if (input.action === "reject" && product.status === "rejected") throw new Error("This product is already rejected.");
      product.status = input.action === "approve" ? "active" : "rejected";
      return { success: true, message: input.action === "approve" ? "Product approved." : "Product rejected." };
    },
    onSuccess: (response, { productId }) => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["product", productId] });
      showToast(response.message);
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to update this product's status."), "error"),
  });
}

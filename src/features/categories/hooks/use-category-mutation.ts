"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, updateCategory, changeCategoryStatus } from "../api";
import { getApiErrorMessage } from "@/lib/api";
import { showToast } from "@/lib/toast";
import type { CreateCategoryInput, CategoryInput, StatusChange } from "../types";

type Action = { kind: "create"; payload: CreateCategoryInput } | { kind: "edit"; id: string; payload: Partial<CategoryInput> } | { kind: "status"; id: string; payload: StatusChange };
export function useCategoryMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (action: Action) => action.kind === "create" ? createCategory(action.payload) : action.kind === "edit" ? updateCategory(action.id, action.payload) : changeCategoryStatus(action.id, action.payload),
    onSuccess: (data) => {
      void client.invalidateQueries({ queryKey: ["categories"] });
      showToast(data.message || "Category updated successfully.");
    },
    onError: (error) => showToast(getApiErrorMessage(error, "Unable to save category."), "error"),
  });
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryTree, getPublicCategory } from "../api";
import type { CategoryQuery } from "../types";

export function useCategories(query: CategoryQuery, publicOnly = false) {
  return useQuery({ queryKey: ["categories", publicOnly ? "public" : "admin", query], queryFn: () => getCategories(query, publicOnly) });
}
export function useCategoryTree() {
  return useQuery({ queryKey: ["categories", "tree"], queryFn: getCategoryTree });
}
export function usePublicCategory(id: string) {
  return useQuery({ queryKey: ["categories", "public-detail", id], queryFn: () => getPublicCategory(id) });
}

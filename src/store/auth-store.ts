import { create } from "zustand";
import type { AdminUser } from "@/features/auth/types";

type AuthStoreState = {
  currentAdmin: AdminUser | null;
  isAuthInitialized: boolean;
  setCurrentAdmin: (admin: AdminUser) => void;
  clearCurrentAdmin: () => void;
  setIsAuthInitialized: (initialized: boolean) => void;
};

export const useAuthStore = create<AuthStoreState>()((set) => ({
  currentAdmin: null,
  isAuthInitialized: false,
  setCurrentAdmin: (currentAdmin) => set({ currentAdmin, isAuthInitialized: true }),
  clearCurrentAdmin: () => set({ currentAdmin: null }),
  setIsAuthInitialized: (isAuthInitialized) => set({ isAuthInitialized }),
}));

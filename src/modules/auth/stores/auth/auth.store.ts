import { create } from "zustand";

class AuthStore {
  publicKey: string | null = null;
  privateKey: string | null = null;
  hashedPassword: string | null = null;
  isSessionActive = false;
  isSessionChecked = false;
}

export const authStore = create<AuthStore>(() => new AuthStore());
export const useAuthStore = authStore;

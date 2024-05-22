import { Vault } from "modules/vault/services/vault-migrations/migrations/latest";
import { create } from "zustand";

export class VaultStore {
  vault: Vault | null = null;
}

export const vaultStore = create<VaultStore>(() => new VaultStore());

export const useVaultStore = vaultStore;

import { PUT_Vault } from "modules/api/requests";
import { authStore } from "modules/auth/stores";
import { AllVaults, Vault } from "modules/vault/services/vault-migrations/migrations/latest";
import { vaultStore } from "modules/vault/stores/vault";
import { VaultStore } from "modules/vault/stores/vault/vault.store";
import { cryptoService } from "shared/services/crypto";

import { vaultMigrationsService } from "../vault-migrations/vault-migrations.service";

class VaultService {
  getEncryptedVault() {
    const { vault } = vaultStore.getState();
    const { privateKey } = authStore.getState();

    if (privateKey && vault) {
      return JSON.stringify(cryptoService.encrypt(JSON.stringify(vault), privateKey));
    } else {
      throw new Error("Not authorized");
    }
  }

  decryptVault(encryptedVault: string, privateKey: string): Vault {
    const vault = JSON.parse(cryptoService.decrypt(JSON.parse(encryptedVault), privateKey)) as AllVaults;

    if (vault) {
      return vaultMigrationsService.migrate(vault);
    } else {
      throw new Error("Vault is invalid or corrupted");
    }
  }

  async saveVault(vault: Vault): Promise<void> {
    vaultStore.setState({ vault });
    try {
      const { publicKey, privateKey } = authStore.getState();

      if (privateKey && publicKey) {
        await PUT_Vault({ publicKey, encryptedVault: this.getEncryptedVault() });
      }
    } catch (e) {
      console.error(e);
    }
  }

  clear(): void {
    vaultStore.setState(new VaultStore());
  }
}

export const vaultService = new VaultService();

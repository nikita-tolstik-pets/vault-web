import { vaultService } from "modules/vault/services/vault/vault.service";
import { Vault } from "modules/vault/services/vault-migrations/migrations/latest";
import { vaultStore } from "modules/vault/stores/vault";
import { nanoid } from "nanoid";

class VaultKeysService {
  private get vault() {
    const vault = vaultStore.getState().vault;

    if (vault) {
      return vault;
    } else {
      throw new Error("Vault not found");
    }
  }

  async createKey(payload: { name: string; description: string; value: string; folderId?: string }): Promise<void> {
    const newKeys = [...this.vault.data.keys];
    newKeys.push({
      id: nanoid(32),
      type: "Key",
      name: payload.name,
      description: payload.description,
      value: payload.value,
    });
    await vaultService.saveVault({ ...this.vault, data: { keys: newKeys } });
  }

  async deleteKey(id: string): Promise<void> {
    const newKeys = [...this.vault.data.keys].filter((key) => key.id !== id);
    await vaultService.saveVault({ ...this.vault, data: { keys: newKeys } });
  }

  getKey(id: string): Vault["data"]["keys"][number] | undefined {
    return this.vault.data.keys.find((key) => key.id === id);
  }

  async updateKey(
    id: string,
    payload: { name?: string; description?: string; value?: string; folderId?: string | null },
  ) {
    const newKeys = [...this.vault.data.keys].map((key) => {
      if (key.id === id) {
        return Object.assign(key, payload);
      }

      return key;
    });

    await vaultService.saveVault({ ...this.vault, data: { keys: newKeys } });
  }
}

export const vaultKeysService = new VaultKeysService();

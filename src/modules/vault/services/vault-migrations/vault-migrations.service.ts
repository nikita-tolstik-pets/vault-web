import * as Latest from "./migrations/latest";
import * as V1 from "./migrations/v1";
import * as V2 from "./migrations/v2";

class VaultMigrationsService {
  private migrations = [
    {
      version: "v1",
      migrate: null,
    },
    {
      version: "v2",
      migrate: (vault: V1.Vault): V2.Vault => {
        return {
          data: vault.data,
          version: "v2",
        };
      },
    },
  ];

  create(): Latest.Vault {
    return {
      data: { keys: [] },
      version: "v2",
    };
  }

  migrate(vault: Latest.AllVaults): Latest.Vault {
    if (vault.version === Latest.version) {
      return vault;
    } else {
      const versionIndex = this.migrations.findIndex((v) => v.version === vault.version);
      let currentVault = vault;

      for (let i = versionIndex + 1; i < this.migrations.length; i++) {
        const v = this.migrations[i];

        if (v.migrate) {
          currentVault = v.migrate(currentVault as any) as any;
        }
      }

      return currentVault as unknown as Latest.Vault;
    }
  }
}

export const vaultMigrationsService = new VaultMigrationsService();

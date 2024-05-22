type Version = typeof version;

export type VaultKey = {
  type: "Key";
  id: string;
  name: string;
  description: string;
  value: string;
};

export type VaultData = {
  keys: VaultKey[];
};

export type Vault = {
  data: VaultData;
  version: Version;
};

export const version = "v2";

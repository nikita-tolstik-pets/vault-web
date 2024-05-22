import * as V1 from "./v1";
import { Vault, VaultData, VaultKey, version } from "./v2";

export type AllVaults = V1.Vault | Vault;

export type { Vault, VaultData, VaultKey };
export { version };

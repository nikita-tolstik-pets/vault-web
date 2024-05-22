import { AxiosResponse } from "axios";
import { apiClient } from "modules/api";

export type PUT_VaultVariables = {
  publicKey: string;
  encryptedVault: string;
};

export type PUT_VaultResponse = void;

export const PUT_Vault = ({
  publicKey,
  encryptedVault,
}: PUT_VaultVariables): Promise<AxiosResponse<PUT_VaultResponse>> => {
  return apiClient.put("/vault", { vault: encryptedVault }, { headers: { "X-Public-Key": publicKey } });
};

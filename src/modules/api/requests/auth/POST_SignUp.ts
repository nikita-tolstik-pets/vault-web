import { AxiosResponse } from "axios";
import { apiClient } from "modules/api";

export type POST_SignUpVariables = {
  publicKey: string;
  encryptedVault: string;
};

export type POST_SignUpResponse = void;

export const POST_SignUp = ({
  publicKey,
  encryptedVault,
}: POST_SignUpVariables): Promise<AxiosResponse<POST_SignUpResponse>> => {
  return apiClient.post("/auth/sign-up", { vault: encryptedVault }, { headers: { "X-Public-Key": publicKey } });
};

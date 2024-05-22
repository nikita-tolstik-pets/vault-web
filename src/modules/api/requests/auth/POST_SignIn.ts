import { AxiosResponse } from "axios";
import { apiClient } from "modules/api";

export type POST_SignInVariables = {
  publicKey: string;
};

export type POST_SignInResponse = {
  vault: string;
};

export const POST_SignIn = ({ publicKey }: POST_SignInVariables): Promise<AxiosResponse<POST_SignInResponse>> => {
  return apiClient.post("/auth/sign-in", null, { headers: { "X-Public-Key": publicKey } });
};

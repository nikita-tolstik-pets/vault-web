export const version = "v1";

export type Version = typeof version;

export type KeyModel = {
  type: "Key";
  id: string;
  name: string;
  description: string;
  value: string;
};

export type Data = {
  keys: KeyModel[];
};

export type Vault = {
  data: Data;
  version: Version;
};

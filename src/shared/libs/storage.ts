type LocalStorageKey = "privateKey" | "publicKey" | "hashedPassword";
type SessionStorageKey = "isSessionActive";

export const localStorageKeys = {
  PRIVATE_KEY: "privateKey",
  PUBLIC_KEY: "publicKey",
  HASHED_PASSWORD: "hashedPassword",
} satisfies Record<string, LocalStorageKey>;

export const sessionStorageKeys = {
  IS_SESSION_ACTIVE: "isSessionActive",
} satisfies Record<string, SessionStorageKey>;

type LocalStorage = {
  setItem: (key: LocalStorageKey, value: string) => Promise<void> | void;
  getItem: (key: LocalStorageKey) => Promise<string | null> | string | null;
  removeItem: (key: LocalStorageKey) => Promise<void> | void;
};

type SessionStorage = {
  setItem: (key: SessionStorageKey, value: string) => Promise<void> | void;
  getItem: (key: SessionStorageKey) => Promise<string | null> | string | null;
  removeItem: (key: SessionStorageKey) => Promise<void> | void;
};

type Storage = {
  local: LocalStorage;
  session: SessionStorage;
};

const storages: Record<"browser" | "extension", Storage> = {
  browser: {
    local: {
      setItem: (key, value) => localStorage.setItem(key, value),
      getItem: (key) => localStorage.getItem(key),
      removeItem: (key) => localStorage.removeItem(key),
    },
    session: {
      setItem: (key, value) => sessionStorage.setItem(key, value),
      getItem: (key) => sessionStorage.getItem(key),
      removeItem: (key) => sessionStorage.removeItem(key),
    },
  },
  extension: {
    local: {
      setItem: (key, value) => chrome.storage.local.set({ [key]: value }),
      getItem: (key) => chrome.storage.local.get(key).then((res) => res[key]),
      removeItem: (key) => chrome.storage.local.remove(key),
    },
    session: {
      setItem: (key, value) => chrome.storage.session.set({ [key]: value }),
      getItem: (key) => chrome.storage.session.get(key).then((res) => res[key]),
      removeItem: (key) => chrome.storage.session.remove(key),
    },
  },
};

export const storage = chrome.storage ? storages.extension : storages.browser;

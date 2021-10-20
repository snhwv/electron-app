import { createStorage as create, CreateStorageParams } from "./storageCache";

export type Options = Partial<CreateStorageParams>;

// 是否加密
const enableStorageEncryption = false;
const DEFAULT_CACHE_TIME = 24 * 60 * 60 * 1000;
const getStorageShortName = () => {
  return "ihow-";
};

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // No encryption in debug mode
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (
  storage: Storage = sessionStorage,
  options: Options = {}
) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export default WebStorage;

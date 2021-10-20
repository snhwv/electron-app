import { createLocalStorage, createSessionStorage } from "../cache";
import { Memory } from "./memory";
import { pick, omit } from "lodash";

const DEFAULT_CACHE_TIME = 24 * 60 * 60 * 1000;
// token key
export const TOKEN_KEY = "TOKEN__";

export const LOCALE_KEY = "LOCALE__";

// user info key
export const USER_INFO_KEY = "USER__INFO__";

// role info key
export const ROLES_KEY = "ROLES__KEY__";

// project config key
export const PROJ_CFG_KEY = "PROJ__CFG__KEY__";

// lock info
export const LOCK_INFO_KEY = "LOCK__INFO__KEY__";

export const MULTIPLE_TABS_KEY = "MULTIPLE_TABS__KEY__";

export const APP_DARK_MODE_KEY_ = "__APP__DARK__MODE__";

// base global local key
export const APP_LOCAL_CACHE_KEY = "COMMON__LOCAL__KEY__";

// base global session key
export const APP_SESSION_CACHE_KEY = "COMMON__SESSION__KEY__";
// base enum key
export const ENUM_KEY = "ENUM__KEY__";
// base tab key
export const TABS_KEY = "TABS_KEY__";
// base note key
export const NOTE = "NOTE__";

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: any;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: any;
  [PROJ_CFG_KEY]: any;
  [ENUM_KEY]: any;
  [MULTIPLE_TABS_KEY]: string[];
  [TABS_KEY]: any;
  [NOTE]: string;
}

type LocalStore = BasicStore;

type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {
  static getLocal(key: LocalKeys) {
    return localMemory.get(key)?.value;
  }

  static setLocal(
    key: LocalKeys,
    value: LocalStore[LocalKeys],
    immediate = false
  ): void {
    localMemory.set(key, value);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession(key: SessionKeys) {
    return sessionMemory.get(key)?.value;
  }

  static setSession(
    key: SessionKeys,
    value: SessionStore[SessionKeys],
    immediate = false
  ): void {
    sessionMemory.set(key, value);
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

window.addEventListener("beforeunload", function () {
  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...omit(localMemory.getCache, LOCK_INFO_KEY),
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [
      TOKEN_KEY,
      USER_INFO_KEY,
      LOCK_INFO_KEY,
    ]),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache, LOCK_INFO_KEY),
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [
      TOKEN_KEY,
      USER_INFO_KEY,
      LOCK_INFO_KEY,
    ]),
  });
});

function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener("storage", storageChange);

initPersistentMemory();

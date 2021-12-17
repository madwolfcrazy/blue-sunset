//import { env } from "./util.env";
function isNullOrUnDef(value) {
  return value == null;
}
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
/*
export interface CreateStorageParams {
  prefixKey: string;
  storage: Storage;
  timeout?: number;
}*/

/**
 *Cache class
 *Construction parameters can be passed into sessionStorage, localStorage,
 * @class Cache
 * @example
 */
export class WebStorage {
  /*
  let storage = {};
  let prefixKey = '';
  let timeout = 0;
  */
  /**
   *
   * @param option
   */
  constructor(option) {
    this.storage = option.storage ?? localStorage;
    this.prefixKey = option.prefixKey ?? getStorageShortName();
    this.timeout = option.timeout ?? DEFAULT_CACHE_TIME;
  }

  getKey(key) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  /**
   *
   *  Set cache
   * @param {string} key
   * @param {*} value
   * @param expire
   * @expire Expiration time in seconds
   * @memberof Cache
   */
  set(key, value, expire = this.timeout) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire != null ? new Date().getTime() + expire * 1000 : null
    });
    this.storage.setItem(this.getKey(key), stringData);
  }

  /**
   *Read cache
   * @param {string} key
   * @param def
   * @memberof Cache
   */
  get(key, def = null) {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;

    try {
      const data = JSON.parse(val);
      const { value, expire } = data;
      if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
        return value;
      }
      this.remove(key);
    } catch (e) {
      return def;
    }
  }

  /**
   * Delete cache based on key
   * @param {string} key
   * @memberof Cache
   */
  remove(key) {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * Delete all caches of this instance
   */
  clear() {
    this.storage.clear();
  }
}
export const createStorage = (option = {}) => {
  return new WebStorage(option);
};

function getStorageShortName() {
  //return env.MODE + "_" + env.get("STORAGE", "certd") + "_";
  return 'debug_LKJHLK'
}

export const createSessionStorage = (options = {}) => {
  return createStorage({ storage: sessionStorage, ...options });
};

export const createLocalStorage = (options = {}) => {
  return createStorage({ storage: localStorage, timeout: DEFAULT_CACHE_TIME, ...options });
};

export const SessionStorage = createSessionStorage();
export const LocalStorage = createLocalStorage();

export default WebStorage;

import { AxiosRequestConfig } from "axios";
import { excludeProps } from "./utils";
/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NODE_ENV == "production" ? "" : "/xapi",
  //10秒超时
  timeout: 60000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*"
  }
};

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig;
  }

  const { headers } = config;
  if (headers && typeof headers === "object") {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers
    };
  }
  return { ...excludeProps(config!, "headers"), ...defaultConfig };
}

export const METHODS = ["post", "get", "put", "delete", "option", "patch"];

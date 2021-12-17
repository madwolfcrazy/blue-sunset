import { http } from "../utils/http";

// gen license
export const genLicense = data => {
  const info = {
    ip: data.ip,
    user: data.user,
    pwd: data.pwd,
    port: data.port,
    sn: data.sn,
    rate: data.rate / 100,
    client: data.client,
    ver: data.ver,
    expire_time: data.expire_time
  }
  return http.request("post", "/api/v1/gen-license", info);
};

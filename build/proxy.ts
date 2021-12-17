type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

const regExps = (value: string, reg: string): string => {
  return value.replace(new RegExp(reg, "g"), "");
};

export function createProxy(list: ProxyList = []) {
  const ret: any = {};
  for (const [prefix, target] of list) {
    ret[prefix] = {
      target: target,
      secure: false, // 忽略 tls 证书问题
      changeOrigin: true,
      rewrite: (path: string) => regExps(path, prefix)
    };
  }
  return ret;
}

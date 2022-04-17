import { UserConfigExport, ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from "path";
import { warpperEnv } from "./build/utils";
import { createProxy } from "./build/proxy";
import vue from '@vitejs/plugin-vue'


const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const root = process.cwd()

export default ({ command, mode }) => {
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = warpperEnv(
    loadEnv(mode, root)
  );
  const prodMock = true;
  return {
    // 编译目标目录
    base: process.env.NODE_ENV === "production" ? "/html/" : VITE_PUBLIC_PATH,
    plugins: [
    vue({
    template: {
      compilerOptions: {
        isCustomElement:  tag => {
                            return /^Vnam\-/.test(tag)
                          }
      }
    }
  })
  ],
  // 服务端渲染
  server: {
    // 是否开启 https
    https: false,
    root,
    /**
     * 端口号
     * @default 3000
     */
    port: VITE_PORT,
    host: "0.0.0.0",
    // 本地跨域代理
    proxy: createProxy(VITE_PROXY)
  },
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  build: {
    chunkSizeWarningLimit: 2000
  }
}
}

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
const path = require("path");

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  optimizeDeps: {
    include: ["axios"],
  },
  build: {
    target: "modules",
    outDir: "gaoting666",
    assetsDir: "assets",
    minify: "terser", // 混淆器
  },
  server: {
    cors: true,
    open: true,
    host: "localhost",
    port: 9999,
    proxy: {
      "/api": {
        // target: "http://localhost:3006", //代理接口
        target: process.env.VUE_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

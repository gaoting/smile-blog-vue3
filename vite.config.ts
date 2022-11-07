import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
const path = require("path");
import prismjs from "vite-plugin-prismjs";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  plugins: [
    prismjs({
      languages: "all",
    }),
    vue(),
  ],
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
    outDir: "client",
    assetsDir: "assets",
    minify: "terser", // 混淆器
    terserOptions:{  // 去除生产环境的console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
    // cssCodeSplit: false,  // 控制css是否拆分
    // rollupOptions: {  // 控制js是否拆分
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes("smile-blog-vue3")) {
    //         // 把 smile-blog-vue3 文件里面的文件都打包到 src.js 中
    //         return "src";
    //       }
    //     },
    //   },
    // },
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

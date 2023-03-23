import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// import prismjs from "vite-plugin-prismjs";
import { prismjsPlugin } from 'vite-plugin-prismjs'
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import ViteImages from 'vite-plugin-vue-images'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import ViteRestart from 'vite-plugin-restart'

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  plugins: [
    prismjsPlugin({
      languages: "all",
      // 配置行号插件
			plugins: ['line-numbers'],
    }),
    vue(),
    //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: './auto-imports.d.ts'
    }),
    // 自动导入组件
    Components({
      dirs: ["src/components"], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [
        AntDesignVueResolver({ importStyle: false, resolveIcons: true }),
      ],
    }),
    // vite自动重启
    ViteRestart({
      restart: ["my.config.[jt]s"],
    }),
    // setup可添加name
    vueSetupExtend(),
    // 图片自动导入
    ViteImages({
      dirs: ['src/assets'], // 图像目录的相对路径
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // 有效的图像扩展
      customResolvers:[], // 覆盖名称->图像路径解析的默认行为
      customSearchRegex: '([a-zA-Z0-9]+)', // 重写搜索要替换的变量的Regex。
    }),
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
    terserOptions: {
      // 去除生产环境的console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
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
        changeOrigin: true
      },
    },
  },
});

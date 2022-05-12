import { defineConfig } from "vite"; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default () =>
  defineConfig({
    plugins: [
      //配置需要使用的插件列表
      vue(),
    ],
    // 强制预构建插件包
    optimizeDeps: {
      //检测需要预构建的依赖项
      entries: [],
      //默认情况下，不在 node_modules 中的，链接的包不会预构建
      include: ["axios"],
      exclude: ["your-package-name"], //排除在优化之外
    },
    base: "./",
    //控制台输出的级别 info 、warn、error、silent
    logLevel: "info",
    // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    clearScreen: true,
    resolve: {
      //配置别名
      alias: {
        '@': resolve(__dirname, 'src')
      },
      // 情景导出 package.json 配置中的exports字段
      conditions: [],
      // 导入时想要省略的扩展名列表
      // 不建议使用 .vue 影响IDE和类型支持
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".sass",
        ".scss",
      ],
    },

    json: {
      //是否支持从 .json 文件中进行按名导入
      namedExports: true,
      //若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
      stringify: false,
    },
    //继承自 esbuild 转换选项，最常见的用例是自定义 JSX
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import Vue from 'vue'`,
    },
    //本地运行配置，以及反向代理配置
    server: {
      host: "localhost",
      https: false, //是否启用 http 2
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      open: true, //服务启动时自动在浏览器中打开应用
      port: 9000,
      strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
      force: true, //是否强制依赖预构建
      hmr: true, //禁用或配置 HMR 连接
      // 传递给 chockidar 的文件系统监视器选项
      // watch: {
      //   ignored: ["!**/node_modules/your-package-name/**"],
      // },
      // 反向代理配置
      proxy: {
        "/api": {
          target: "http://localhost:3006", //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    }
  });

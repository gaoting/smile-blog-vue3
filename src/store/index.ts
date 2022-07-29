import { defineStore } from "pinia";

export const mainStore = defineStore("typeList", {
  state: () => {
    return {
      types: [
        "vue",
        "typescript",
        "JavaScript",
        "node.js",
        "nest.js",
        "es6+",
        "MySQL",
        "工具",
        "css",
        "vite",
        "webpack",
        "git",
        "软件",
        "rollup",
        "linux",
        "读书笔记",
        "壁纸",
        "日志",
      ],
    };
  },
  getters: {},
  actions: {},
});

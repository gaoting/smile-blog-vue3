import { defineStore } from "pinia";

export const mainStore = defineStore("typeList", {
  state: () => {
    return {
      types: [
        { id: 1, name: "vue" },
        { id: 2, name: "JavaScript" },
        { id: 3, name: "typescript" },
        { id: 4, name: "node.js" },
        { id: 5, name: "nest.js" },
        { id: 6, name: "ECMAScript 6" },
        { id: 7, name: "MySql" },
        { id: 8, name: "css" },
        { id: 9, name: "vite" },
        { id: 10, name: "webpack" },
        { id: 11, name: "git" },
        { id: 12, name: "rollup" },
        { id: 13, name: "linux" },
        { id: 14, name: "工具/软件" },
        { id: 15, name: "读书笔记" },
        { id: 16, name: "日志" },
        // {id:17,name:'linux'},
      ],
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    };
  },
  getters: {},
  actions: {
    changeToken(params: string) {
      this.token = params;
    },
  },
});

import { defineStore } from "pinia";

export const mainStore = defineStore("typeList", {
  state: () => {
    return {
      types: [
        { id: 1, name: "vue", desc: "vue2 / vue3的学习笔记" },
        { id: 2, name: "JavaScript", desc: "" },
        { id: 3, name: "typescript", desc: "" },
        { id: 4, name: "node.js", desc: "" },
        { id: 5, name: "nest.js", desc: "" },
        { id: 6, name: "ECMAScript 6", desc: "" },
        { id: 7, name: "MySql", desc: "" },
        { id: 8, name: "css", desc: "" },
        { id: 9, name: "vite", desc: "" },
        { id: 10, name: "webpack", desc: "" },
        { id: 11, name: "git", desc: "" },
        { id: 12, name: "rollup", desc: "" },
        { id: 13, name: "linux", desc: "" },
        { id: 14, name: "工具/软件", desc: "" },
        { id: 15, name: "go", desc: "" },
        { id: 16, name: "编译原理", desc: "" },
        { id: 17, name: "面试题", desc: "" },
        { id: 18, name: "笔试题", desc: "" },
      ],
      // typesObj: {},
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
      userInfo: localStorage.getItem("userName")
        ? localStorage.getItem("userName")
        : "",
    };
  },
  getters: {
    typesObj(state) {
      let obj = {};
      this.types.forEach((v) => {
        obj = { ...obj, [v.id]: v.name };
      });
      return obj;
    },
  },
  actions: {
    changeToken(params: string) {
      this.token = params;
    },
    getLoginInfo(user) {
      this.userInfo = user;
    },
  },
});

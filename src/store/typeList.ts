import { defineStore } from "pinia";

export const mainStore = defineStore({
  id: "typeList",
  state: () => {
    return {
      tags: [
        { id: 1, name: "vue", desc: "vue2 / vue3的学习笔记" },
        { id: 2, name: "JavaScript", desc: "" },
        { id: 3, name: "typescript", desc: "" },
        { id: 4, name: "node.js", desc: "" },
        { id: 5, name: "nest.js", desc: "" },
        { id: 6, name: "ECMAScript", desc: "" },
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
        { id: 19, name: "react (native)", desc: "" },
        { id: 20, name: "jest", desc: "" },
        { id: 21, name: "算法", desc: "" },

      ],
      types: [
        { id: 0, name: "全部" },
        { id: 1, name: "前端" },
        { id: 2, name: "后端" },
        { id: 3, name: "阅读" },
        { id: 4, name: "其他" },
      ],
      bannerList: Array.from({ length: 10 }, (v, i) => `a${i + 1}.jpg`),
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
      userInfo: localStorage.getItem("userInfo")
        ? localStorage.getItem("userInfo")
        : "",
    };
  },
  persist: {
    enabled: true,
  },
  getters: {
    tagsObj(state) {
      let obj = {};
      this.tags.forEach((v) => {
        obj = { ...obj, [v.id]: v.name };
      });
      return obj;
    },
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

import { createApp } from "vue";
import App from "./App.vue";
import router from "./common/router";

import Antd from "ant-design-vue";
import "./assets/css/antd.css";
import "./assets/css/public.scss";
import Utils from "./common/utils";
import moment from "moment";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
import Prism from "prismjs";
import hljs from "highlight.js";
import Socketio from "./plugins/Socket.io";

VMdEditor.use(vuepressTheme, {
  Prism,
});
VMdEditor.use(createLineNumbertPlugin())
  .use(createCopyCodePlugin())
  .use(createEmojiPlugin())
  .use(createTodoListPlugin());

VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
});

const app = createApp(App);

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const testFun = () => {
  console.log("ttttttttttttttt");
};

app.use(Socketio, {
  connection: "http://localhost:3300",
  options: {
    autoConnect: false, //关闭自动连接
    // ...其它选项
  },
});

// 获取原型
const prototype = app.config.globalProperties;

prototype.name = "jerry";

prototype.$moment = moment;
prototype.$utils = Utils;
prototype.$app = app;

app
  .use(router)
  .use(VMdEditor)
  .use(VMdPreview)
  .use(pinia)
  .use(Antd)
  .mount("#app");

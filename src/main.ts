import { createApp } from "vue";
import App from "./App.vue";
import router from "./common/router";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/css/public.scss";
import  Utils  from './common/utils'
import "md-editor-v3/lib/style.css";

const app = createApp(App)

app.config.globalProperties.$utils = Utils
app.use(router).use(Antd).mount("#app");

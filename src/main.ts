import { createApp } from "vue";
import App from "./App.vue";
import router from "./common/router";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/css/public.scss";
import  utils  from './common/utils'


const app = createApp(App)

app.config.globalProperties.$utils = utils
app.use(router).use(Antd).mount("#app");

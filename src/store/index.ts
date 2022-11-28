import type { App } from "vue";
import { createPinia } from "pinia";

import { createPersistedState } from "pinia-persistedstate-plugin";

const pinia = createPinia();
pinia.use(createPersistedState());

export function setupStore(app: App<Element>) {
  app.use(pinia);
}

export default pinia ;

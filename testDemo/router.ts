import { mainStore } from "./../store/typeList";
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { storeToRefs } from "pinia";

const routes = [];

const routerConfig = {
  history: createWebHistory(),
  routes,
};

const router = createRouter(routerConfig);

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean;
    requiresAuth: boolean;
  }
}

export default router;

import { createRouter, createWebHistory, RouterOptions } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/public/index.vue"),
  },
  {
    path: "/frondPage",
    name: "FrondPage",
    component: () => import("../views/public/frondPage.vue"),
  },
  
  {
    path: "/backstage",
    name: "Backstage",
    component: () => import("../views/public/backstage.vue"),
  },
  {
    path: "/content",
    name: "Content",
    component: () => import("../views/public/content.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/test/index.vue"),
  },
];

const routerConfig = {
  history: createWebHistory(),
  routes,
  // scrollBehavior(to: any, from: any) {
  //   if (to.path !== from.path) {
  //     return { top: 0 };
  //   }
  // },
};

const router = createRouter(routerConfig)

export default router

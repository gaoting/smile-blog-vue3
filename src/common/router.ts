import { createRouter, createWebHistory, RouterOptions } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/frondPage",
    name: "FrondPage",
    component: () => import("../views/home/frondPage.vue"),
  },
  
  {
    path: "/backstage",
    name: "Backstage",
    component: () => import("../views/home/backstage.vue"),
  },
  {
    path: "/content",
    name: "Content",
    component: () => import("../views/home/content.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/home/about.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/test/index.vue"),
  },
  {
    path: "/articleAdd",
    name: "AddArticle",
    component: () => import("../views/admin/addArticle.vue"),
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

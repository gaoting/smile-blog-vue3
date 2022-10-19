import { mainStore } from "./../store/typeList";
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { storeToRefs } from "pinia";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/frondPage",
    name: "FrondPage",
    component: () => import("../views/home/frondPage.vue"),
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/book",
    name: "Book",
    component: () => import("../views/home/book.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/content",
    name: "Content",
    component: () => import("../views/home/content.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/diary",
    name: "Diary",
    component: () => import("../views/home/diary.vue"),
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/about",
    name: "About",
    component: () => import("../views/home/about.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/test/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/test1",
    name: "Test1",
    component: () => import("../views/test1/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/articleAdd",
    name: "AddArticle",
    component: () => import("../views/admin/addArticle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/msglist",
    name: "Msglist",
    component: () => import("../views/admin/msglist.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/admin/login.vue"),
    meta: {
      requiresAuth: false,
    },
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

const router = createRouter(routerConfig);

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean;
    requiresAuth: boolean;
  }
}

export default router;

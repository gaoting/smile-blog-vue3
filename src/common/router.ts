import pinia from "../store/index";
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { mainStore } from "./../store/typeList";

const store = mainStore(pinia);
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
  scrollBehavior(to, from, savedPosition) {
    return {
      el: "#main",
      top: 0,
    };
  },
};

const router = createRouter(routerConfig);

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((item) => item.meta.requiresAuth)) {
    if (to.path === "/login") return next();

    if (!store.token) {
      return next({
        path: "/login",
        replace: true,
      });
    }
    next();
  } else {
    next();
  }
});

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean;
    requiresAuth: boolean;
  }
}

export default router;

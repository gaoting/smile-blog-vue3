import pinia from "../store/index";
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { mainStore } from "./../store/typeList";

const store = mainStore(pinia);
const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/frondPage",
    name: "FrondPage",
    component: () =>
      import(/* webpackChunkName: "frondPage" */ "../views/home/frondPage.vue"),
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/book",
    name: "Book",
    component: () =>
      import(/* webpackChunkName: "book" */ "../views/home/book.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/content",
    name: "Content",
    component: () =>
      import(/* webpackChunkName: "content" */ "../views/home/content.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/diary",
    name: "Diary",
    component: () =>
      import(/* webpackChunkName: "diary" */ "../views/home/diary.vue"),
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/about.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/test/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  // {
  //   path: "/test1",
  //   name: "Test1",
  //   component: () => import(/* webpackChunkName: "test1" */ "../views/test1/index.vue"),
  //   meta: {
  //     requiresAuth: false,
  //   },
  // },
  {
    path: "/articleAdd",
    name: "AddArticle",
    component: () =>
      import(
        /* webpackChunkName: "articleAdd" */ "../views/admin/addArticle.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/msglist",
    name: "Msglist",
    component: () =>
      import(/* webpackChunkName: "msglist" */ "../views/admin/msglist.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/chatRoom",
    name: "ChatRoom",
    component: () =>
      import(/* webpackChunkName: "chatRoom" */ "../views/admin/chatRoom.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/admin/login.vue"),
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

router.beforeEach(async (to, _from, next) => {
  const token = localStorage.getItem("token");
  
  if (to.meta.requiresAuth && !token) {
    next("/login");
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

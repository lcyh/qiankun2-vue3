/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import startQiankun from "../micro";
import { getToken } from "../utils/auth";
import apps from "../micro/apps";
import Home from "../views/HomeView.vue";
import Layout from "../components/Layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  const token = getToken("token"); //获取token
  console.log("父应用token", token);
  if (token) {
    store.commit("setUserToken", token);
    //token存在
    if (to.name === "Login") {
      //如果login直接跳转首页
      return next({ path: "/" });
    }
    if (!store.state.hasInited) {
      //防止反复addRoutes预设的值
      store.dispatch("addRouters").then((res) => {
        res.forEach((route) => {
          router.addRoute(route);
        });
        startQiankun(apps);
        store.state.hasInited = true;
        next({ ...to, replace: true });
      });
      return;
    }
    next();
  } else if (whiteList.includes(to?.path)) {
    //白名单直接放行
    next();
  } else {
    //token不存在
    next({ path: "/login", query: { redirect: to.fullPath } });
  }
});

export default router;

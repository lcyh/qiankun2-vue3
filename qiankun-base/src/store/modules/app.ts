import { defineStore } from "pinia";
import router from "../../router";
import { getCookie, removeCookie, setCookie } from "../../utils/auth";
import { routerList } from "../../utils";
import { TOKEN, USER_INFO } from "@/utils/constants";
import { store } from "..";

const asyncRoutes = [
  // 添加 主应用路由到右侧菜单
  {
    path: "/",
    icon: "AppstoreOutlined",
    type: "main",
    name: "Home",
    title: "父应用",
    children: [
      {
        path: "/home",
        icon: "app-store-outlined",
        type: "main",
        name: "Home",
        title: "home",
        meta: {
          isAuth: true,
          currentActiveMenu: "/home",
        },
      },
      {
        path: "/about",
        icon: "el-icon-location",
        type: "main",
        name: "About",
        title: "about",
        meta: {
          isAuth: true,
          currentActiveMenu: "/about",
        },
      },
    ],
  },
  {
    path: "/vue",
    icon: "TrademarkOutlined",
    type: "micro",
    name: "Vue",
    title: "vue",
    children: [
      {
        path: "/vue/",
        icon: "el-icon-location",
        type: "micro",
        name: "VueProject",
        title: "vue-project",
        meta: {
          isAuth: true,
          currentActiveMenu: "/vue",
        },
      },
      {
        path: "/vue/about",
        icon: "el-icon-location",
        type: "micro",
        name: "VueAbout",
        title: "vue-project-about",
        meta: {
          isAuth: true,
          currentActiveMenu: "/vue/about",
        },
      },
    ],
  },
  // {
  //   path: "/react",
  //   icon: "PieChartOutlined",
  //   type: "micro",
  //   name: "react",
  //   title: "react",
  //   children: [
  //     {
  //       path: "/react",
  //       icon: "el-icon-location",
  //       type: "micro",
  //       name: "react-project",
  //       title: "react-project",
  //       meta: {
  //         isAuth: true,
  //         currentActiveMenu: "/react",
  //       },
  //     },
  //     {
  //       path: "/react/about",
  //       icon: "el-icon-location",
  //       type: "micro",
  //       name: "react-project-about",

  //       title: "react-project-about",
  //       meta: {
  //         isAuth: true,
  //         currentActiveMenu: "/react/about",
  //       },
  //     },
  //   ],
  // },
];
export const useAppStore = defineStore({
  id: "app-user",
  state: () => ({
    token: getCookie(TOKEN) || "",
    userInfo: JSON.parse(getCookie(USER_INFO) || "{}") || {
      username: "",
      password: "",
    },
    routes: asyncRoutes,
    hasInited: false,
    isDynamicAddedRoute: false,
    menuStatus: false,
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setDynamicRoutes(routes) {
      this.routes = routes;
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setUserToken(token) {
      setCookie(TOKEN, token);
    },
    clearUserInfo() {
      this.token = "";
      this.userInfo = null;
      removeCookie(TOKEN);
      removeCookie(USER_INFO);
    },
    async logout() {
      return new Promise((resolve) => {
        this.clearUserInfo();
        router.push("/login");
        resolve("");
      });
    },
    async login(params) {
      this.token = params?.token;
      this.userInfo = params;
      setCookie(TOKEN, params.token);
      setCookie(USER_INFO, JSON.stringify(params));
    },
    addRouters() {
      return new Promise((resolve) => {
        console.log("routes-store-1", this.routes);
        const list = routerList(this.routes);
        this.setDynamicRoutes(list);
        console.log("routes-store-2", this.routes);
        resolve(list);
      });
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}

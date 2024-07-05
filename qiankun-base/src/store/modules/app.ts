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
    icon: "app-store-outlined",
    type: "main",
    key: "/",
    label: "父应用",
    title: "父应用",
    children: [
      {
        path: "/",
        icon: "app-store-outlined",
        type: "main",
        key: "home",
        label: "home",
        title: "home",
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/about",
        icon: "el-icon-location",
        type: "main",
        key: "about",
        label: "about",
        title: "about",
        meta: {
          isAuth: true,
        },
      },
    ],
  },
  {
    path: "/vue",
    icon: "el-icon-location",
    type: "micro",
    key: "vue",
    label: "vue",
    title: "vue",
    children: [
      {
        path: "/vue",
        icon: "el-icon-location",
        type: "micro",
        key: "vue-project",
        label: "vue-project",
        title: "vue-project",
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/vue/about",
        icon: "el-icon-location",
        type: "micro",
        key: "vue-about",
        label: "vue-project-about",
        title: "vue-project-about",
        meta: {
          isAuth: true,
        },
      },
    ],
  },
  {
    path: "/react",
    icon: "el-icon-location",
    type: "micro",
    key: "react",
    label: "react",
    title: "react",
    children: [
      {
        path: "/react",
        icon: "el-icon-location",
        type: "micro",
        key: "react-project",
        label: "react-project",
        title: "react-project",
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/react/about",
        icon: "el-icon-location",
        type: "micro",
        key: "react-project-about",
        label: "react-project-about",
        title: "react-project-about",
        meta: {
          isAuth: true,
        },
      },
    ],
  },
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
        console.log("routes-store", this.routes);
        const list = routerList(this.routes);
        resolve(list);
      });
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}

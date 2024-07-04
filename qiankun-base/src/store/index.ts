import { createStore } from "vuex";
import router from "../router";
import { removeToken, setToken } from "../utils/auth";
import { routerList } from "../utils";

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
export default createStore({
  state: {
    token: "",
    userInfo: "",
    routes: asyncRoutes,
    hasInited: false,
    menuStatus: false,
  },
  getters: {},
  mutations: {
    logout(state, params) {
      state.token = "";
      state.userInfo = "";
    },
    login(state, params) {
      state.token = params;
      setToken("token", params);
    },
    setUserToken(state, token) {
      setToken("token", token);
    },
  },
  actions: {
    logout({ commit }) {
      return new Promise((resolve) => {
        removeToken("token");
        commit("logout");
        resolve("");
      });
    },
    login({ commit }) {
      commit("login");
      router.push("/");
    },
    addRouters({ state }) {
      return new Promise((resolve) => {
        const { routes } = state;
        console.log("routes-store", routes);
        const list = routerList(routes);
        resolve(list);
      });
    },
  },
  modules: {},
});

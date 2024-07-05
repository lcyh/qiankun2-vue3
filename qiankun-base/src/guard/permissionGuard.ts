/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import { useAppStoreWithOut } from "../store/modules/app";
import { getCookie } from "../utils/auth";
import { TOKEN } from "@/utils/constants";

export const createPermissionGuard = (router) => {
  const userStore = useAppStoreWithOut();
  const whiteList = ["/login"];
  router.beforeEach((to, from, next) => {
    const token = getCookie(TOKEN); //获取token
    if (token) {
      userStore.setUserToken(token);
      //token存在
      if (to.name === "Login") {
        //如果login直接跳转首页
        return next({ path: "/" });
      }
      if (userStore.getIsDynamicAddedRoute) {
        next();
        return;
      }
      //防止反复addRoutes预设的值
      userStore.addRouters().then((res: any) => {
        (res || [])?.forEach((route) => {
          router.addRoute(route);
        });
        // startQiankun(apps);
        userStore.setDynamicAddedRoute(true);
        next({ ...to, replace: true });
      });
    } else if (whiteList.includes(to?.path)) {
      //白名单直接放行
      next();
    } else {
      //token不存在
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  });
};

/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import { h } from "vue";
const Layout = () => import("../components/Layout/index.vue");

let routerMap: any[] = [];
/**
 *
 * @param route
 * @param options
 */
export function fnc(route, options = { children: [] }) {
  route.forEach((element, index) => {
    if (element.children) {
      fnc(element.children, routerMap[index]);
      return;
    }
    options?.children?.push({
      key: element.key,
      path: element.path,
      name: element.key,
      component: { render: () => h("span") },
      meta: {
        type: element.type,
      },
    });
  });
}

/**
 *
 * @param route
 */
export function routerList(route) {
  routerMap = [];
  route.forEach((element) => {
    routerMap.push({
      key: element.key,
      path: element.path,
      name: element.key,
      component: Layout,
      meta: {
        type: element.type,
      },
      children: [],
    });
  });
  fnc(route);
  return routerMap;
}

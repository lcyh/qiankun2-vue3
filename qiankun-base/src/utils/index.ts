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
export function fnc(route, options = { children: [], name: "" }) {
  route.forEach((element, index) => {
    if (element?.children?.length) {
      fnc(element.children, routerMap[index]);
      return;
    }
    options?.children?.push({
      ...element,
      name: element.name?.toLocaleLowerCase(),
      meta: {
        ...element?.meta,
        type: element.type,
        parentName: options?.name,
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
      ...element,
      name: element.name?.toLocaleLowerCase(),
      component: Layout,
      meta: {
        type: element.type,
        name: element?.name,
      },
      children: [],
    });
  });
  fnc(route);
  return routerMap;
}

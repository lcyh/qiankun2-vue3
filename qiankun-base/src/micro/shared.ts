/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */

import { useAppStoreWithOut } from "@/store/modules/app";

const store = useAppStoreWithOut();
const model = {
  /**
   * 获取token
   */
  getToken: () => store.token,
  /**
   * 获取用户数据
   */
  getUserInfo: () => store.userInfo,
  /**
   * 获取浏览器window
   */
  getWindow: () => window,
  /**
   * 登出
   */
  logout() {
    store.logout();
  },
};

export default model;

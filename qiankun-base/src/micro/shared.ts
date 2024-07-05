/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import { useAppStore } from "../store/modules/app";

const store = useAppStore();
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

/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun";
import { message as Message } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ parent: ".layout-wrapper" });

export default function (apps) {
  registerMicroApps(apps, {
    // 注册应用
    beforeLoad: () => {
      // 加载微应用前，加载进度条
      NProgress.start();
      return Promise.resolve();
    },
    afterMount: () => {
      NProgress.done();
      return Promise.resolve();
    },
  });

  addGlobalUncaughtErrorHandler((event) => {
    console.log("addGlobalUncaughtErrorHandler", event);
    NProgress.done();
    // 加载失败时提示
    Message.error("微应用加载失败，请检查应用是否可运行");
  });
  start({ prefetch: true }); // 开启预加载
}

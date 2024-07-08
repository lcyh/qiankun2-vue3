/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupRouterGuard } from "./guard";
import { setupStore } from "./store";
import startQiankun from "./micro";
import microApps from "./micro/apps";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

async function bootstrap() {
  const app = createApp(App);
  // store
  await setupStore(app);
  // configure routing
  setupRouter(app);
  // permission
  setupRouterGuard(router);
  // micro-app
  startQiankun(microApps);
  app.use(Antd).mount("#app");
}

bootstrap();

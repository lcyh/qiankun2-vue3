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
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

async function bootstrap() {
  const app = createApp(App);

  await setupStore(app);
  // Configure routing
  setupRouter(app);
  setupRouterGuard(router);
  app.use(Antd).mount("#app");
}

bootstrap();

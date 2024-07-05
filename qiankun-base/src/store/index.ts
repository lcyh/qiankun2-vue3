/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export async function setupStore(app: App<Element>) {
  app.use(store);
}
export { store };

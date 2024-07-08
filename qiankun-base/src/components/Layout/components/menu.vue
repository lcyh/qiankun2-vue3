<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <a-menu
    class="a-menu-vertical"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    @openChange="handleOpenChange"
    mode="inline"
    theme="light"
  >
    <template v-for="item in routes" :key="item.key">
      <template v-if="!item.children?.length">
        <a-menu-item :key="item.key">
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import SubMenu from "./SubMenu.vue";
import { useAppStore } from "../../../store/modules/app";

const store = useAppStore();
const route = useRoute();
const routes = computed(() => {
  return store.routes.map((item) => {
    return { ...item };
  });
});
const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
});
const handleOpenChange = (val) => {
  console.log("handleOpenChange", { val, openKeys: state.openKeys });
};
watch(
  () => route,
  (val) => {
    console.log("watch", val);
    const routename = val?.name?.toLocaleLowerCase();
    state.openKeys = ["home"];
    state.selectedKeys = [routename];
  },
  { immediate: true, deep: true }
);
// console.log("菜单组件", {
//   store,
//   route,
//   routes,
//   selectedKeys: state.selectedKeys,
//   openKeys: state.openKeys,
// });
</script>
<style lang="less" scoped>
.menu-warpper {
  width: 200px;
}
.el-menu-vertical .el-menu-item {
  min-width: auto;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none;
}
</style>

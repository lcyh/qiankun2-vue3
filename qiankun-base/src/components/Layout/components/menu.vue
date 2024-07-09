<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <a-menu
    class="basic-menu"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    @openChange="handleOpenChange"
    @select="handleSelectChange"
    mode="inline"
    theme="light"
  >
    <template v-for="item in routes" :key="item.path">
      <template v-if="!item.children?.length">
        <a-menu-item :key="item.path">
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.path" :menu-info="item" />
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
  // console.log("handleOpenChange", { val, openKeys: state.openKeys });
};
const handleSelectChange = (val) => {
  // console.log("handleSelectChange", { val, selectedKeys: state.selectedKeys });
};

const handleGetCurrentRoute = (route, routeList) => {
  const routeName = route?.name?.toLocaleLowerCase();
  for (const item of routeList) {
    if (item.name === routeName) return item;
    if (item.children?.length) {
      for (const item2 of item.children) {
        if (item2.name === routeName) return item;
      }
    }
  }
  return null;
};
watch(
  () => route,
  (val) => {
    const routePath = val?.path;
    const parentRoute = handleGetCurrentRoute(val, store.routes);
    if (!state.openKeys?.includes(parentRoute?.path)) {
      state.openKeys = [...state.openKeys, parentRoute?.path];
    }
    state.selectedKeys = [routePath];
  },
  { immediate: true, deep: true }
);
console.log("菜单组件", {
  store,
  route,
  routes,
  selectedKeys: state.selectedKeys,
  openKeys: state.openKeys,
});
</script>
<style lang="less" scoped>
.menu-warpper {
  width: 200px;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none;
}
</style>

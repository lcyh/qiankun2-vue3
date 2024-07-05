<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <div class="menu-warpper">
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      :trigger="null"
      collapsible
    >
      <a-menu
        class="a-menu-vertical"
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        :items="routes"
        theme="light"
        mode="inline"
      >
        <MenuItem
          v-for="item in routes"
          :key="item.path"
          :route="item"
          :base-path="item.path"
        />
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import MenuItem from "./menu-item.vue";
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
  preOpenKeys: [],
});
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
console.log("菜单组件", {
  store,
  route,
  routes,
  selectedKeys: state.selectedKeys,
});
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

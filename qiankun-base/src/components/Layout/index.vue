<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <a-layout class="layout-wrapper">
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <Menu />
      <div class="toggle">
        <menu-unfold-outlined
          v-if="state.collapsed"
          class="trigger"
          @click="() => (state.collapsed = !state.collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (state.collapsed = !state.collapsed)"
        />
      </div>
    </a-layout-sider>
    <a-layout>
      <Header />
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <div class="layou-main">
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="route.name" />
          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <div id="app-qiankun"></div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import Menu from "./components/Menu.vue";
import Header from "./components/Header.vue";
import { useAppStore } from "@/store/modules/app";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useAppStore();
const state = reactive({
  collapsed: false,
});
</script>

<style lang="less" scoped>
#app-qiankun {
  position: relative;
}
.container-main {
  display: flex;
  width: 100%;
}

.ant-layout-sider {
  position: relative;
  background-color: #fff;
  min-height: 100vh;
}
.toggle {
  position: absolute;
  bottom: 20px;
  right: 0px;
}
.logo {
  height: 30px;
  background: url("https://nbp-activity-bucket.noahgroup.com/fed/20240510/gefei.png")
    center center;
  background-size: cover;
  margin: 16px;
  cursor: pointer;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
</style>

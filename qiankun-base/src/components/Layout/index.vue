<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <div id="main-app">
    <a-layout>
      <a-layout-sider
        v-model:collapsed="state.collapsed"
        :trigger="null"
        collapsible
      >
        <div class="logo" />
        <a-menu
          class="a-menu-vertical"
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
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
        <a-layout-header class="layout-header">
          <a-dropdown>
            <div class="user">
              <img class="avatar" src="../../assets/header.png" />
              <span class="userName"> {{ userInfo?.username }} </span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <span @click="handleLogout">退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <div class="layou-main">
            <router-view />
            <div id="app-qiankun"></div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import SubMenu from "./components/sub-menu.vue";
import { useAppStore } from "@/store/modules/app";

const store = useAppStore();
const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  preOpenKeys: [],
});
const userInfo = computed(() => {
  return store?.userInfo;
});
const routes = computed(() => {
  return store.routes.map((item) => {
    return { ...item };
  });
});
const handleLogout = () => {
  store.logout();
  console.log("handleLogout");
};
</script>

<style lang="less" scoped>
#app-qiankun {
  position: relative;
}
.container-main {
  display: flex;
  width: 100%;
}
.layout-header {
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
  background-color: #fff;
  .user {
    &:hover {
      background-color: #f6f6f6;
    }
    .avatar {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 5px;
      border-radius: 50%;
    }
    .userName {
      font-size: 14px;
      cursor: pointer;
    }
  }
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

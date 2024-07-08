<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <a-layout-header class="layout-header">
    <a-dropdown>
      <div class="user">
        <img class="avatar" src="../../../assets/header.png" />
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
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
const store = useAppStore();
const userInfo = computed(() => {
  return store?.userInfo;
});

const handleLogout = () => {
  store.logout();
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  background-color: #fff !important;
}
.layout-header {
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
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
</style>

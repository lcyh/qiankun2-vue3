<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <a-sub-menu class="sub-menu" :key="menuInfo.path">
    <template #icon><component :is="iconsMap[menuInfo?.icon]" /></template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <router-link :to="item.path">
          <a-menu-item :key="item.path">
            <!-- <template #icon>
              <PieChartOutlined />
            </template> -->
            {{ item.title }}
          </a-menu-item>
        </router-link>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="tsx" setup>
import { PieChartOutlined } from "@ant-design/icons-vue";
import { iconsMap } from "@/utils/constants";
const props = defineProps({
  menuInfo: {
    type: Object,
  },
});
</script>

<style lang="less">
.ant-menu {
  background-color: #fff !important;
}
.sub-menu {
  .ant-menu-submenu-title .ant-menu-title-content {
    flex: none !important;
  }
  .ant-menu-item {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:not(.ant-menu-item-selected):active,
    &:active {
      background-color: #fff !important;
    }
    &:not(.ant-menu-item-selected):hover {
      background-color: rgba(0, 132, 244, 0.15) !important;
      color: #0084f4 !important;
    }
    .ant-menu-title-content {
      text-align: left;
    }
  }
  .ant-menu-item-selected {
    background-color: #0084f4 !important;
    color: #fff;
  }
}
.ant-menu-submenu-popup {
  .router-link-active,
  a {
    color: #273352 !important;
    .ant-menu-item {
      &:hover {
        background-color: #e6f4ff !important;
        color: #0084f4 !important;
      }
    }
  }
}
</style>

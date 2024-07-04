<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <div class="menu-wrp">
    <template v-if="route.children && route.children.length">
      <a-sub-menu :index="basePath" :key="basePath">
        <template slot="title">
          <i :class="route.icon"></i>
          <span slot="title">{{ route.label }}</span>
        </template>
        <MenuItem
          v-for="item in route.children"
          :key="item.path"
          :route="item"
          :base-path="item.path"
        />
      </a-sub-menu>
    </template>
    <template v-else>
      <router-link :to="basePath">
        <a-menu-item :index="route.path">
          <i :class="route.icon"></i>
          <span slot="title">{{ route.label }}</span>
        </a-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts" name="MenuItem">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    route: {
      type: Object,
    },
    basePath: {
      type: String,
    },
  },
  setup(props) {
    return { route: props?.route, basePath: props?.basePath };
  },
});
</script>

<style scoped>
a {
  text-decoration: none;
}
.a-menu--collapse span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>

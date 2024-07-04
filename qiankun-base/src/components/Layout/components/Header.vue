<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <div class="header">
    <div @click="logout" class="logo-wrapper">
      <img
        class="picture"
        src="https://nbp-activity-bucket.noahgroup.com/fed/20240510/gefei.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$store.state.hasInited = false;
        this.$router.push({
          path: "/login",
          //   query: { redirect: this.$route.path },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 60px;
}
.picture {
  display: block;
  cursor: pointer;
  width: 120px;
  height: 40px;
}
.header {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  border: none;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;
}
</style>

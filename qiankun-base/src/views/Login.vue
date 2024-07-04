<!--
 * @Author: changluo
 * @Description: 
 * @LastEditors: luc19964 luochang@gopherasset.com
-->
<template>
  <div class="login">
    <div class="form">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: '请输入用户密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="login"> 登录 </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store";

const router = useRouter();
const route = useRoute();
const formState = reactive({
  username: "",
  password: "",
});
const login = () => {
  store.commit("login", "token");
  store.state.hasInited = false;
  router.replace(route.query.redirect || "/");
};
</script>
<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: url(../assets/login_bg.png) 50% no-repeat;
  background-size: 100% 100%;
}
.form {
  position: relative;
  width: 400px;
  max-width: 100%;
  overflow: hidden;
  padding: 28px;
  background: #fff;
  border-radius: 6px;
  opacity: 0.9;
}
</style>

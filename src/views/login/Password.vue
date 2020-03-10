<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-04 14:33:15
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-05 20:33:59
 -->
<template>
  <div>
    <tapback>输入密码</tapback>
    <div class="passwordBox bBShadow">
      <input class="input" type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="button1" @click="login">登录</div>
  </div>
</template>
<script>
import tapback from "@/components/common/topback/TopBack";

import { phoneLogin } from "@/network/login";
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  components: {
    tapback
  },
  created() {
    this.phone = this.$route.params.phone;
    console.log(this.phone);
  },
  methods: {
    login() {
      phoneLogin(this.phone, this.password).then(res => {
        console.log(res);
        if (res.msg === "密码错误") {
          this.$toastMessage({ message: res.message });
        }
        if (res.loginType === 1) {
          // 如果登录成功
          // 将用户数据放入vuex中管理
          // this.$store.commit("loginIn", { userinf: res.profile });
          // 将用户数据存入localstorage
          localStorage["userinf"] = JSON.stringify(res.profile);

          // 跳转到home页面
          this.$router.replace("/home");
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
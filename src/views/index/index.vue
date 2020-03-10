<!--
 * @Descripttion: 未登录-首页
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 18:16:41
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-03 18:58:14
 -->
<template>
  <div class="index">
    <div class="wyIcon">
      <i class="iconfont-big">&#xe602;</i>
    </div>
    <div class="footer">
      <div class="phoneLogin" @click="phoneLogin">手机号登录</div>
      <div class="quickStart">立即体验</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    phoneLogin() {
        this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.index {
  width: 100vw;
  height: 100vh;
  background-color: #eb3c3c;
}
.wyIcon {
  width: 100%;
  position: absolute;
  top: 20%;
  text-align: center;
}
.footer {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.phoneLogin,
.quickStart {
  width: 70%;
  border: 1px solid;
  margin-bottom: 10px;
  padding: 5px;
  text-align: center;
  border-radius: 20px;
}
.phoneLogin {
  background-color: #fff;
  color: #eb3c3c;
}
.quickStart {
  color: #fff;
}
</style>
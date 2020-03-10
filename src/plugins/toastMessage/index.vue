<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-04 13:36:17
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-09 23:51:22
 -->
<template>
  <div class="toastmessage" v-show="show">{{message}}</div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      show: false
    };
  }
};
</script>
<style scoped>
.toastmessage {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  text-align: center;
  z-index: 2000;
}
</style>
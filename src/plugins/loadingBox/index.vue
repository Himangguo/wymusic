<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-05-03 09:14:44
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-03 21:04:10
 -->
<template>
  <div class="loadingBox iconfont" v-show="show">{{message}}</div>
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
.loadingBox {
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
@keyframes rotateLoading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* 加载动画 */
.loadingBox::before {
  content: "\e646";
  display: block;
  transform-origin: center;
  text-align: center;
  animation: rotateLoading 1s linear infinite;
}
</style>
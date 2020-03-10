<!--
 * @Descripttion: 消息框
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 21:12:25
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-03 22:49:04
 -->
<template>
  <div class="toast">{{}}</div>
</template>
<script>
export default {
  props: {
    msg: {
      type: Array,
      default: null
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.toast {
  background-color: #fff;
  padding: 10px;
  position: fixed;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  box-shadow: 0 10px 10px rgba(196, 193, 193, 0.1);
  border-radius: 20px;
  width: fit-content;
  animation-name: toast;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  opacity: 0;
  visibility: hidden;
  z-index: 0;
}
@keyframes toast {
  0% {
    opacity: 0;
    visibility: hidden;
    z-index: 0;
    /* padding: 20px; */
  }

  10% {
    opacity: 1;
    visibility: visible;
    z-index: 10;
    padding: 10px;
  }

  100% {
    opacity: 0;
    visibility: hidden;
    z-index: 0;
    /* padding: 10px; */
  }
}
</style>
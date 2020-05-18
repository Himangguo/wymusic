<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 15:03:52
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-15 22:17:36
 -->
<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.nav-bar {
  display: flex;
  top: 0;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
  text-align: center;
  height: 100%;
}
.center {
  flex: 1;
  text-align: center;
  color: #000;
  display: flex;
  justify-content: space-between;
  
}
</style>

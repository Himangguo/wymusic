<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-05-18 12:02:43
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-18 12:02:56
--> 

<template>
  <div class="backtop">
    <img src="~assets/img/backtop/backtop.svg" alt />
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
.backtop {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
.backtop img {
  width: 45px;
  height: 45px;
}
</style>
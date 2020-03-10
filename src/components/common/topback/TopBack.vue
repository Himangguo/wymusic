<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 19:08:40
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-09 23:20:41
 -->
<template>
  <div class="topback">
    <div class="backIcon" @click="backing">
      <i class="iconfont">&#xe603;</i>
    </div>
    <!-- 当前页面title -->
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    flag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    backing() {
      /* 返回上一页 */
      if (this.flag) {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped>
.topback {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  position: relative;
}
.backIcon {
  margin-right: 15px;
}
</style>

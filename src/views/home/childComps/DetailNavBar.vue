<!--
 * @Descripttion: 上方导航栏
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 15:14:42
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-18 10:44:38
 -->
<template>
  <div class="detailNavBar">
    <nav-bar>
      <div
        slot="left"
        class="iconfont"
        :style="`color:${activeColor}`"
        @click="showSideBar"
      >&#xe601;</div>
      <div slot="center" class="centerTitle">
        <div
          :class="activeIndex === index?'title-item-active':'title-item'"
          :style="activeIndex === index?`color:${activeColor}`:`color:${color}`"
          v-for="(item,index) in navBarData"
          :key="item"
          @click="changeActive(index)"
        >{{item}}</div>
      </div>
      <div slot="right" class="iconfont" :style="`color:${activeColor}`" @click="search">&#xe662;</div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      activeIndex: 0,
      color: "#666666",
      activeColor: "#fff",
      navBarData: ["我的", "发现", "云村", "视频"],
      navPath: [
        "/home/mine",
        "/home/discover",
        "/home/cloudVillage",
        "/home/tVideo"
      ]
    };
  },
  components: {
    NavBar
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index;
      this.$router.replace(this.navPath[index]);
    },
    showSideBar() {
      this.$emit("showSideBar");
    },
    search() {
      this.$router.push("search");
    }
  }
};
</script>
<style scoped>
.detailNavBar {
  position: relative;
  z-index: 1;
}
.centerTitle {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.title-item,
.title-item-active {
  font-size: 14px;
}
.title-item-active {
  font-weight: bold;
  color: #000;
}
</style>

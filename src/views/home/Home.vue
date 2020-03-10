<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:38:18
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-09 20:14:12
 -->
<template>
  <div class="home" ref="home">
    <!-- 头部导航栏 -->
    <detail-nav-bar @showSideBar="showSideBar" @changeBgImg="changeBgImg"></detail-nav-bar>
    <!-- 侧边栏 -->
    <side-bar ref="sidebar"></side-bar>

    <scroll class="cnt" :probe-type="3" @scroll="contenScroll">
      <router-view></router-view>
    </scroll>
    <!-- 底部播放媒体  -->
    <footeraudio ref="footerRudio"></footeraudio>
  </div>
</template>

<script>
import detailNavBar from "./childComps/DetailNavBar";
import scroll from "@/components/common/scroll/Scroll";
import sideBar from "@/components/content/sidebar/SideBar";
import footeraudio from "@/components/content/footerAudio/FooterAudio";

export default {
  name: "Home",
  data() {
    return {
      userInf: {}, // 用户信息
      playList: [] // 播放列表
    };
  },
  components: {
    detailNavBar,
    sideBar,
    scroll,
    footeraudio
  },
  methods: {
    showSideBar() {
      console.log("接收到子组件的发射事件");
      this.$refs.sidebar.showSideBar();
    },
    changeBgImg(type) {
      if (type === 1) {
        this.$refs.home.style.background = `url(${this.userInf.backgroundUrl})`;
      } else if (type === 0) {
        this.$refs.home.style.background = "";
      }
    },
    contenScroll(position) {
      /*  this.flag_position = position.y < -300;
      this.ifTopFloat = position.y < -this.offsetTop; */
     /*  console.log(position); */
    }
  },
  created() {
    // this.userInf = this.$store.state.userinf;
    this.userInf = JSON.parse(localStorage.userinf);
    console.log(this.userInf);
  },
  mounted() {
    this.$refs.home.style.background = `url(${this.userInf.backgroundUrl})`;
  }
};
</script>
<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
}
.cnt {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>

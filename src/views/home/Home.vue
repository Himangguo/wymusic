<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:38:18
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-18 15:12:53
 -->
<template>
  <div class="home" ref="home">
    <!-- 头部导航栏 -->
    <detail-nav-bar @showSideBar="showSideBar"></detail-nav-bar>
    <!-- 侧边栏 -->
    <side-bar ref="sidebar"></side-bar>

    <scroll class="cnt" ref="scroll" :probe-type="3" @scroll="contenScroll">
      <router-view></router-view>
    </scroll>
    <backtop @click.native="backtop" v-show="flag_position"/>
    <!-- 底部播放媒体  -->
    <footeraudio ref="footerRudio"></footeraudio>
  </div>
</template>

<script>
import detailNavBar from "./childComps/DetailNavBar";
import scroll from "@/components/common/scroll/Scroll";
import backtop from "@/components/common/backtop/BackTop";
import sideBar from "@/components/content/sidebar/SideBar";
import footeraudio from "@/components/content/footerAudio/FooterAudio";

export default {
  name: "Home",
  data() {
    return {
      flag_position: false,
      userInf: {}, // 用户信息
      playList: [] // 播放列表
    };
  },
  components: {
    detailNavBar,
    sideBar,
    scroll,
    backtop,
    footeraudio
  },
  methods: {
    showSideBar() {
      console.log("接收到子组件的发射事件");
      this.$refs.sidebar.showSideBar();
    },
    /*     changeBgImg(type) {
      if (type === 1) {
        this.$refs.home.style.backgroundImage = `url(${this.userInf.backgroundUrl})`;
      } else if (type === 0) {
        this.$refs.home.style.background = "";
      }
    }, */
    contenScroll(position) {
      this.flag_position = position.y < -300;
    },
    backtop() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  },
  created() {
    this.userInf = JSON.parse(localStorage.userinf);
    console.log(this.userInf);
  },
  mounted() {
    /* this.$refs.home.style.backgroundImage = `url(${this.userInf.backgroundUrl})`; */
  }
};
</script>
<style scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background: #000;
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

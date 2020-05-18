<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 19:09:54
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-16 20:17:30
 -->
<template>
  <div :class="isShow?'sidebar-active':'sidebar'" @click.self="hideSideBar">
    <div class="content">
      <div class="member"></div>
      <div class="site">
        <div class="header">
          <div class="photo_name">
            <img :src="user.avatarUrl" />
            <div class="nickname">{{user.nickname}}</div>
          </div>
          <div class="iconfont sign">&#xe723; 签到</div>
        </div>
        <div class="navbar">
          <div class="myMessage">
            <i class="iconfont">&#xe626;</i>
            <p>我的消息</p>
          </div>
          <div class="myMessage">
            <i class="iconfont">&#xe60a;</i>
            <p>我的好友</p>
          </div>
          <div class="myMessage">
            <i class="iconfont">&#xe63b;</i>
            <p>个人主页</p>
          </div>
          <div class="myMessage">
            <i class="iconfont">&#xe67a;</i>
            <p>个人装扮</p>
          </div>
        </div>
        <div class="func">
          <div class="funcItem">
            <i class="iconfont">&#xe600;</i>
            <span class="funcName">定时停止播放</span>
          </div>
        </div>
        <div class="footer">
          <span class="iconfont">&#xe6dc; 夜间模式</span>
          <span class="iconfont">&#xe664; 设置</span>
          <span class="iconfont" @click="logout">&#xe67b; 退出</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { logout, checkStatus } from "@/network/login";
export default {
  data() {
    return {
      isShow: false,
      mode: 0, // 0:白天 1:黑夜
      user: {}
    };
  },
  created() {
    this.user = JSON.parse(localStorage.userinf);
  },
  methods: {
    hideSideBar() {
      this.isShow = false;
    },
    showSideBar() {
      this.isShow = true;
    },
    logout() {
      logout().then(res => {
        console.log(res);
        // 清除缓存
        localStorage.clear();
        // 切换到到登录界面
        this.$router.replace("/index");
      });
    }
  }
};
</script>
<style scoped>
.sidebar {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: -100vw;
  z-index: 1024;
  background-color: rgba(219, 219, 219, 0.1);
  transition: all 0.5s;
}
.sidebar-active {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1024;
  background-color: rgba(219, 219, 219, 0.1);
  transition: all 0.5s;
}
.content {
  width: 80vw;
  height: 100vh;
  position: relative;
  background-color: gray;
}
.member {
  height: 25%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #333333;
}
.site {
  height: 80%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.footer,
.header,
.navbar,
.func {
  width: 90%;
  position: absolute;
  left: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555555;
}
.footer {
  height: 40px;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
.header {
  height: 50px;
  top: 0;
}
.navbar {
  height: 70px;
  top: 50px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.func {
  top: 120px;
}
.sign {
  width: 50px;
  padding: 2px;
  background: red;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  font-size: 11px;
  letter-spacing: 2px;
}
.photo_name {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
}
.photo_name img {
  border-radius: 50%;
  margin-right: 10px;
  width: 25px;
}
.myMessage {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: red;
}
.myMessage p {
  font-size: 12px;
  color: #555555;
}
.funcItem {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.funcName {
  color: #333333;
  font-size: 13px;
  margin-left: 10px;
}
</style>
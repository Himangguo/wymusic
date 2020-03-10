<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 21:54:22
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-09 21:47:37
 -->
<template>
  <div class="mine">
    <div class="header">
      <div class="photo">
        <img :src="userInf.avatarUrl" alt />
      </div>
      <div class="nikname">{{userInf.nickname}}</div>
      <div class="hjVip" @click="hjVip">开通黑胶vip ></div>
    </div>
    <div class="navbar">
      <div class="navItem" v-for="item in navList" :key="item.id">
        <div class="icon-box">
          <i class="iconfont">{{item.iconCode}}</i>
        </div>
        <p>{{item.title}}</p>
      </div>
    </div>

    <div class="myMusic">
      <div class="cartTitle">我的音乐与歌单</div>
      <div class="mineMusicBox">
        <div
          class="songsItem"
          v-for="(item, index) in songList"
          :key="item.id"
          @click="chooseSongsItem(index)"
        >
          <div class="songsImg">
            <img :src="item.coverImgUrl" alt />
          </div>
          <div class="songBox">
            <div class="songsName">{{item.name}}</div>
            <div class="songsCount">{{item.trackCount}}首</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlayList } from "@/network/home";

import { getDetailsongList, checkMusic } from "@/network/mylike";
export default {
  components: {},
  data() {
    return {
      userInf: {},
      navList: [
        {
          id: 0,
          title: "本地音乐",
          iconCode: "\ue702"
        },
        {
          id: 1,
          title: "下载管理",
          iconCode: "\ue616"
        },
        {
          id: 2,
          title: "我的电台",
          iconCode: "\ue606"
        },
        {
          id: 3,
          title: "我的收藏",
          iconCode: "\ue636"
        },
        {
          id: 4,
          title: "关注新歌",
          iconCode: "\ue629"
        }
      ],
      songList: [],
      playList: {}
    };
  },
  created() {
    // 获取用户信息
    this.userInf = JSON.parse(localStorage.userinf);
    // 获取用户歌单
    let uid = this.userInf.userId;
    console.log(uid);
    getPlayList(uid).then(res => {
      console.log(res.playlist);
      this.songList = res.playlist;
      // 将我的所有歌单放入本地缓存
      localStorage["allSongList"] = JSON.stringify(res.playlist);
    });
  },
  methods: {
    hjVip() {
      this.$toastMessage({ message: "此功能暂不开放" });
    },
    chooseSongsItem(index) {
      /*  // 获取歌单详情
      getDetailsongList(id).then(res => {
        console.log(res);
        this.playList = res.playlist;
       
      }); */
      // 打开歌曲详情列表内容
      this.$router.push({
        path: "/home/myLike",
        query: { allSongListIndex: index }
      });
    }
  }
};
</script>
<style scoped>
.header {
  color: #fff;
  display: flex;
  position: relative;
  align-items: center;
  width: 90%;
  margin: 10px auto;
}
.photo img {
  border-radius: 50%;
  width: 40px;
  margin: 5px;
}
.nickname {
  font-size: 14px;
}
.hjVip {
  position: absolute;
  right: 0;
  color: #666666;
  font-size: 10px;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 10px auto;
}
.navItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.navItem p {
  font-size: 10px;
}
.myMusic {
  background-color: #fff;
  width: calc(100vw - 20px);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
}
.cartTitle {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 5px;
}

.mineMusicBox {
  width: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.songsItem {
  width: 45%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
}
.songsImg {
  width: 50%;
  height: 100%;
}
.songsImg img {
  height: 100%;
}
.songBox {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.songsName {
  font-size: 12px;
  line-height: 12px;
  height: 25px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出的字体用...代替 */
}
.songsCount {
  color: #666666;
  font-size: 10px;
}
</style>
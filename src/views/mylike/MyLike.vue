<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-05 20:03:21
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-16 19:39:01
 -->
<template>
  <div class="mylike" ref="mylike">
    <tapback>歌单</tapback>
    <div class="header">
      <div class="coverImgUrl">
        <img :src="songList.coverImgUrl" alt />
      </div>
      <div class="creator">
        <div class="title">我喜欢的音乐</div>
        <div class="inf-box">
          <div class="photo">
            <img :src="songList.creator.avatarUrl" alt />
          </div>
          <div class="nickname">{{songList.creator.nickname}} ></div>
        </div>
      </div>
    </div>
    <div class="navbar">
      <div class="navItem" v-for="item in navList" :key="item.id">
        <div class="navIcon">
          <i class="iconfont">{{item.icon}}</i>
        </div>
        <div class="navtitle innerColor">{{item.title}}</div>
      </div>
    </div>
    <song-list :playlist="playList" />
  </div>
</template>
<script>
import tapback from "@/components/common/topback/TopBack";
import SongList from "@/components/common/songList/SongList";
import { getDetailsongList } from "@/network/mylike";
export default {
  components: {
    tapback,
    SongList
  },
  data() {
    return {
      songList: {},
      playList: {},
      songUrlList: {},
      navList: [
        {
          id: 0,
          icon: "\ue611",
          title: "评论"
        },
        {
          id: 1,
          icon: "\ue60c",
          title: "分享"
        },
        {
          id: 2,
          icon: "\ue65e",
          title: "下载"
        },
        {
          id: 3,
          icon: "\ue60b",
          title: "多选"
        }
      ]
    };
  },
  created() {
    // 获取index
    let index = this.$route.query.allSongListIndex;
    this.songList = JSON.parse(localStorage.allSongList)[index];
    // 获取歌单详情
    getDetailsongList(this.songList.id).then(res => {
      console.log(res);
      this.playList = res.playlist;
    });
  },
  mounted() {
    // this.$refs.mylike.style.background = `url(${this.songList.creator.backgroundUrl})`;
    this.$refs.mylike.style.background = "";
  },
  methods: {}
};
</script>
<style scoped>
.mylike {
  color: #fff;
  width: 100vw;
  padding-bottom: 40px;
}
.header {
  display: flex;
  width: 90%;
  margin: 10px auto;
}
.cnt {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.coverImgUrl {
  margin-right: 20px;
}
.coverImgUrl img {
  width: 100px;
}
.creator {
  display: flex;
  flex-direction: column;
}
.inf-box {
  display: flex;
  align-items: center;
}
.title {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
}
.photo img {
  width: 25px;
  border-radius: 50%;
}
.nickname {
  font-size: 10px;
  margin-left: 10px;
  color: #dddddd;
}
.navbar {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px auto;
}
.navItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  color: #dddddd;
}
</style>
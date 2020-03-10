<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-05 20:03:21
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-10 12:06:31
 -->
<template>
  <div class="mylike" ref="mylike">
    <tapback>歌单</tapback>
    <!--  <scroll class="cnt" :probe-type="3" @scroll="contenScroll"> -->
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
    <div class="songList">
      <div class="playAll">
        <div class="playAllIcon">
          <i class="iconfont">&#xe6af;</i>
        </div>
        <div>
          播放全部
          <span class="innerFont">(共{{playList.trackCount}}首)</span>
        </div>
      </div>
      <div class="songListBox">
        <div
          class="songItem"
          v-for="(item,index) in playList.tracks"
          :key="item.id"
          @click="playSong(item.id,index)"
        >
          <div class="orderId">{{index+1}}</div>
          <div class="songbox">
            <div class="songname">{{item.name}}</div>
            <div class="songinf">
              <i class="iconfont innerSQ">&#xe608;</i>
              {{item.ar[0].name}} - {{item.al.name}}
            </div>
          </div>
          <div class="rightTool">
            <div class="vedio">
              <i class="iconfont innerColor">&#xe605;</i>
            </div>
            <div class="fun">
              <i class="iconfont innerColor">&#xe690;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--   </scroll> -->
  </div>
</template>
<script>
import tapback from "@/components/common/topback/TopBack";
// import scroll from "@/components/common/scroll/Scroll";
import { getDetailsongList, checkMusic } from "@/network/mylike";
export default {
  components: {
    tapback
    // scroll
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
    this.$refs.mylike.style.background = `url(${this.songList.creator.backgroundUrl})`;
  },
  methods: {
    contenScroll(position) {},
    playSong(id, index) {
      console.log(index);
      // 检查此音乐是否可用
      checkMusic(id).then(res => {
        console.log(res);
        // 如果可用
        if (res && res.success) {
          // 将歌单列表放入缓存中
          localStorage["songList"] = JSON.stringify(this.playList);
          localStorage["songId"] = id;
          localStorage["songIndex"] = "" + index;
          this.$bus.$emit("playSong");
        } else {
          this.$toastMessage({ message: "亲爱的，暂无版权" });
        }
      });
    }
  }
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
.songList {
  background-color: #fff;
  width: calc(100vw - 20px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
}
.songList {
  color: #000;
}
.playAll {
  display: flex;
  align-items: flex-start;
  font-size: 15px;
  margin-bottom: 10px;
}
.playAllIcon {
  margin-right: 15px;
}
.innerFont {
  font-size: 13px;
  color: #aaaaaa;
}
.innerColor {
  color: #aaaaaa;
}
.innerSQ {
  color: #ff6600;
  margin-right: 3px;
}
.songListBox {
  display: flex;
  flex-direction: column;
  position: relative;
}
.songItem {
  display: flex;
  margin: 10px 0;
  align-items: center;
}
.orderId {
  width: 20px;
  text-align: center;
  color: #aaaaaa;
  margin-right: 15px;
}
.songbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 60%;
}
.songname {
  font-size: 13px;
  margin-bottom: 5px;
}
.songinf {
  display: flex;
  align-items: center;
  color: #aaaaaa;
  font-size: 10px;
}
.rightTool {
  position: absolute;
  right: 0;
  display: flex;
}
.vedio {
  margin-right: 20px;
}
</style>
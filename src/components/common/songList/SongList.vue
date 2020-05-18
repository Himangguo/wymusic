<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-05-15 16:47:23
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-18 11:54:07
--> 
<template>
  <div class="songList">
    <div class="playAll">
      <div class="playAllIcon">
        <i class="iconfont">&#xe6af;</i>
      </div>
      <div>
        播放全部
        <span class="innerFont">(共{{playlist.trackCount}}首)</span>
      </div>
    </div>
    <div class="songListBox">
      <div
        class="songItem"
        v-for="(item,index) in playlist.tracks"
        :key="item.id"
        @click="playSong(item.id,index)"
      >
        <div class="iconfont-red orderIcon" v-if="songIndex == index">&#xe896;</div>
        <div class="orderId" v-else>{{index+1}}</div>
        <div class="songbox">
          <div class="songname">{{item.name}}</div>
          <!-- 歌单中的歌曲列表 -->
          <div class="songinf" v-if="item.ar">
            <i class="iconfont innerSQ">&#xe608;</i>
            {{item.ar[0].name}} - {{item.al.name}}
          </div>
          <!-- 搜索后的歌曲列表 -->
          <div class="songinf" v-else>
            <i class="iconfont innerSQ">&#xe608;</i>
            {{item.artists[0].name}} - {{item.album.name}}
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
</template>
<script>
import { checkMusic } from "@/network/mylike";
export default {
  props: {
    playlist: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      songIndex: -1
    };
  },
  watch: {
    playlist: function(newVal, oldVal) {
      console.log("发生改变");
      if (JSON.parse(localStorage.songList).id === this.playlist.id) {
        this.songIndex = Number(localStorage.songIndex);
      } else {
        this.songIndex = -1;
      }
    }
  },
  methods: {
    playSong(id, index) {
      console.log(index);
      // 检查此音乐是否可用
      checkMusic(id).then(res => {
        console.log(res);
        // 如果可用
        if (res && res.success) {
          // 将歌单列表放入缓存中
          localStorage["songList"] = JSON.stringify(this.playlist);
          localStorage["songId"] = id;
          localStorage["songIndex"] = "" + index;
          this.$bus.$emit("playSong");
        } else {
          this.$toastMessage({ message: "亲爱的，暂无版权" });
        }
      });
    }
  },
  created() {
    this.$bus.$on("changeSongIndex", index => {
      // 如果缓存里的歌单就是当前显示的歌单就更换当前播放的歌曲index
      if (JSON.parse(localStorage.songList).id === this.playlist.id) {
        this.songIndex = index;
      }
    });
  }
};
</script>
<style scoped>
.songList {
  background-color: #fff;
  width: calc(100vw - 20px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
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
.orderIcon {
  width: 20px;
  color: #eb3c3c;
  text-align: center;
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
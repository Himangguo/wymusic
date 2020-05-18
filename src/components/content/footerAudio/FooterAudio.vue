<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-08 20:42:04
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-16 20:13:03
 -->
<template>
  <div class="footbTShadow" :style="`height:${boxHeight}`" v-if="index!=-1">
    <!-- 底部播放 -->
    <div class="footSongPlay" v-show="!showScreen">
      <div :class="active?'creatorImg-active':'creatorImg'" @click="showAlbum">
        <img :src="playList.tracks[index].al.picUrl" v-if="playList.tracks[index].al" />
        <img :src="playList.tracks[index].album.artist.img1v1Url" v-else />
      </div>
      <div class="songBox">
        <div class="songName ellipsis">{{playList.tracks[index].name}}</div>
        <div
          class="creatorName ellipsis"
          v-if="playList.tracks[index].ar"
        >{{playList.tracks[index].ar[0].name}}</div>
        <div class="creatorName ellipsis" v-else>{{playList.tracks[index].artists[0].name}}</div>
      </div>
      <div v-show="active" class="iconfont playAudio" @click="playAudio">&#xe610;</div>
      <div v-show="!active" class="iconfont playAudio" @click="playAudio">&#xe6c1;</div>
    </div>
    <!-- 全屏播放 -->
    <play-song
      v-show="showScreen"
      ref="playSong"
      @changeStatus="changeStatus"
      @hideAlbum="hideAlbum"
    ></play-song>
  </div>
</template>
<script>
import playSong from "@/components/content/playSong/PlaySong";
export default {
  components: {
    playSong
  },
  created() {
    // 获取缓存中的正在播放歌单列表
    if (localStorage.songList) {
      this.id = Number(localStorage.songId);
      this.index = Number(localStorage.songIndex);
      this.playList = JSON.parse(localStorage.songList);
    }
  },
  mounted() {
    this.$bus.$on("playSong", () => {
      this.id = Number(localStorage.songId);
      this.index = Number(localStorage.songIndex);
      this.playList = JSON.parse(localStorage.songList);
      this.$bus.$emit("changeSongIndex", this.index);
      this.$nextTick(() => {
        this.$refs.playSong && this.$refs.playSong.playClickMusic();
      });
    });
  },
  data() {
    return {
      playList: {},
      id: null,
      index: -1,
      showScreen: false,
      active: true,
      boxHeight: "40px"
    };
  },
  methods: {
    playAudio() {
      this.$refs.playSong.playSong();
    },
    changeStatus(state) {
      this.active = state;
    },
    showAlbum() {
      this.showScreen = true;
      this.boxHeight = "100vh";
    },
    hideAlbum() {
      this.showScreen = false;
      this.boxHeight = "40px";
    }
  }
};
</script>
<style scoped>
.footbTShadow {
  display: flex;
  z-index: 900;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.footSongPlay {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}
.creatorImg,
.creatorImg-active {
  margin: 0 5px;
  line-height: 0;
}
.creatorImg img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.creatorImg-active img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: centerRotate 10s linear infinite;
}
@keyframes centerRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.songName {
  font-size: 12px;
  max-width: 50vw;
}
.creatorName {
  font-size: 10px;
  color: #666666;
}
.playAudio {
  position: absolute;
  right: 10px;
}
</style>
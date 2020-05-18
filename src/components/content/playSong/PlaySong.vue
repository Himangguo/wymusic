<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-06 13:40:54
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-16 20:20:06
 -->
<template>
  <div class="playsong" ref="playsong">
    <tapback :flag="false" @click.native="hideAlbum">
      <div class="songName ellipsis">{{currentMusic.name}}</div>
      <div class="creator ellipsis">{{currentMusic.creator}}></div>
    </tapback>
    <!-- 歌词区 -->
    <div class="wordsOfSong" v-show="showWords" ref="wordsOfSong">
      <scroll class="cnt" :probe-type="3" ref="scroll" @click.native="showWords=false">
        <!-- 空白区 防止better-scroll自动回弹-->
        <div :style="`height:${screenHeight/2}px`"></div>
        <!-- 歌词item -->
        <div
          class="wordItem"
          v-show="wordsTime.length>0"
          v-for="(item, index) in wordsTime"
          :key="index"
          ref="wordItem"
        >
          <span :class="wordIndex===index?'words-active':'words'">{{item[1]}}</span>
        </div>
        <!-- 无歌词区 -->

        <div class="nulllyric" v-show="wordsTime.length === 0">纯音乐，请欣赏</div>

        <!-- 空白区 -->
        <div :style="`height:${screenHeight/2}px`"></div>
      </scroll>
    </div>
    <div class="rotateImg" v-show="!showWords">
      <div
        class="ganggan"
        :style="active?'transform: rotate(-90deg) translateX(-30px)':'transform: rotate(-150deg) translateX(-30px)'"
      >
        <i class="iconfont ganIcon">&#xe660;</i>
      </div>
      <div :class="active?'centerImg-active':'centerImg'">
        <img :src="currentMusic.picUrl" alt @click="showWordsOfSong" />
      </div>
    </div>

    <div class="controller">
      <audio-controls
        :audioUrl="currentMusic.songUrl"
        :wordsTime="wordsTime"
        :copyright="copyright"
        @changeStatus="changeStatus"
        @frontPlay="frontPlay"
        @afterPlay="afterPlay"
        @wordScrollUp="wordScrollUp"
        ref="audioControls"
      ></audio-controls>
    </div>
  </div>
</template>
<script>
import tapback from "@/components/common/topback/TopBack";
import audioControls from "@/components/common/audioControls/AudioControls";
import scroll from "@/components/common/scroll/Scroll";

import { getSongUrl, checkMusic } from "@/network/mylike";
import { getWordsOfMusic } from "@/network/music";

export default {
  components: {
    tapback,
    audioControls,
    scroll
  },
  created() {
    // 如果缓存中有歌曲列表
    if (localStorage.songList) {
      this.id = Number(localStorage.songId);
      // 获取歌词
      this.getWords();
      this.index = Number(localStorage.songIndex);
      console.log(this.index);
      this.songList = JSON.parse(localStorage.songList);
      // 将歌单所有歌的id用逗号隔开形成字符串
      let trackchars = this.splitWithComma(this.songList.trackIds);
      console.log(trackchars);
      // 获取歌曲url
      getSongUrl(trackchars).then(res => {
        this.songUrlList = res.data;
        this.mergeCurrentInf();
      });
    }
  },
  mounted() {
    this.$refs.playsong.style.background = "black";
  },
  data() {
    return {
      id: "",
      index: "",
      songList: {},
      songUrlList: [],
      currentMusic: {
        id: "",
        name: "",
        creator: "",
        picUrl: "",
        songUrl: ""
      },
      showWords: false, // 是否显示歌词
      copyright: true, // 有无版权
      wordsTime: [],
      screenHeight: 0,
      currentNy: "",
      wordIndex: -1,
      active: true, // 是否处于播放状态
      transform_active: "rotate(-90deg)",
      transform: "rotate(-150deg) "
    };
  },
  methods: {
    hideAlbum() {
      this.$emit("hideAlbum");
    },
    splitWithComma(trackIds) {
      return trackIds
        .reduce((data, currentVal) => {
          return data + currentVal.id + ",";
        }, "")
        .replace(/\,$/, "");
    },
    mergeCurrentInf() {
      console.log("开始合并");
      this.currentMusic.id = this.id;
      this.songList.tracks.forEach(item => {
        if (item.id === this.id) {
          console.log("找到相等的啦");
          this.currentMusic.name = item.name;
          if (item.ar) {
            this.currentMusic.creator = item.ar[0].name;
            this.currentMusic.picUrl = item.al.picUrl;
          } else {
            this.currentMusic.creator = item.artists[0].name;
            this.currentMusic.picUrl = item.album.artist.img1v1Url;
          }

          // 遍历songUrlList找到对应的url
          this.currentMusic.songUrl = this.songUrlList.filter(inneritem => {
            return inneritem.id === this.id;
          })[0].url;
          // 将音乐存入本地缓存
          localStorage["currentSong"] = JSON.stringify(this.currentMusic);
        }
      });
    },
    playClickMusic() {
      this.id = Number(localStorage.songId);
      this.index = Number(localStorage.songIndex);
      console.log(this.index);
      this.songList = JSON.parse(localStorage.songList);
      this.getWords();
      let trackchars = this.splitWithComma(this.songList.trackIds);
      // 获取歌曲url
      getSongUrl(trackchars).then(res => {
        this.songUrlList = res.data;
        this.mergeCurrentInf();
        checkMusic(this.id).then(res => {
          // 清除歌词记录
          this.wordIndex = -1;
          if (res && res.success) {
            // 放入缓存
            localStorage["songId"] = this.id;
            localStorage["songIndex"] = "" + this.index;
            this.active = true;
            this.changeStatus(true);
            return;
          }
        });
      });
    },
    playSong() {
      this.$refs.audioControls.playAudio();
    },
    changeStatus(state) {
      console.log(state);
      this.active = state;
      this.$emit("changeStatus", state);
    },
    frontPlay() {
      if (this.index === 0) {
        this.$toastMessage({
          message: "没有更多啦"
        });
        return;
      }
      console.log(this.index);
      this.index--;
      this.id = this.songList.tracks[this.index].id;

      checkMusic(this.id).then(res => {
        // 清除歌词记录
        // 放入缓存
        localStorage["songId"] = this.id;
        localStorage["songIndex"] = "" + this.index;
        this.wordIndex = -1;
        if (res && res.success) {
          this.copyright = true;
          this.active = true;
          this.getWords();
          this.mergeCurrentInf();
          this.$bus.$emit("playSong");
        } else {
          this.copyright = false;
          this.active = false;
          this.$toastMessage({ message: "亲爱的，暂无版权，已帮您跳到上一首" });
          this.frontPlay();
        }
      });
    },
    afterPlay() {
      if (this.index === this.songUrlList.length - 1) {
        this.$toastMessage({
          message: "没有更多啦"
        });
        return;
      }
      this.index++;
      this.id = this.songList.tracks[this.index].id;
      this.getWords();
      this.mergeCurrentInf();
      checkMusic(this.id).then(res => {
        // 清除歌词记录
        // 放入缓存
        localStorage["songId"] = this.id;
        localStorage["songIndex"] = "" + this.index;
        this.wordIndex = -1;
        if (res && res.success) {
          this.copyright = true;
          this.active = true;
          this.getWords();
          this.mergeCurrentInf();
          this.$bus.$emit("playSong");
        } else {
          this.copyright = false;
          this.active = false;
          this.$toastMessage({ message: "亲爱的，暂无版权，已帮您跳到下一首" });
          this.afterPlay();
        }
      });
    },
    showWordsOfSong() {
      // 显示歌词
      this.showWords = true;
    },
    // 处理歌词
    splitWords(lyric) {
      let lyrics = lyric.split("\n").map(item => {
        return item.replace(/\[/g, "");
      });

      this.wordsTime = lyrics.map(item => {
        return item.split("]");
      });
      // 去除小数
      this.wordsTime.forEach(item => {
        for (let i = 0; i < item.length - 1; i++) {
          item[i] = item[i].split(".")[0];
        }
      });
      this.dealRepeat(); // 处理复句
      this.sortWords(); // 对歌词进行排序
      console.log("------");
      console.log(this.wordsTime);
      console.log("------");
    },
    // 拆分复句
    dealRepeat() {
      for (let i = 0; i < this.wordsTime.length; i++) {
        let item = this.wordsTime[i];
        let length = item.length;
        if (length === 1) {
          this.wordsTime.splice(i, 1); // 如果歌词格式出错就删除
        } else if (length > 2) {
          // 如果是复句，就进行拆分
          while (item.length > 2) {
            this.wordsTime.push([item[0], item[item.length - 1]]);
            item.splice(0, 1);
          }
        }
      }
    },
    // 对歌词进行排序
    sortWords() {
      this.wordsTime.sort(sortFun());
      function sortFun() {
        return function(a, b) {
          // 比较时间
          let time1 = [
            parseInt(a[0].split(":")[0]),
            parseInt(a[0].split(":")[1])
          ];
          let time2 = [
            parseInt(b[0].split(":")[0]),
            parseInt(b[0].split(":")[1])
          ];
          if (time1[0] === time2[0]) {
            return time1[1] - time2[1];
          } else {
            return time1[0] - time2[0];
          }
        };
      }
    },
    getWords() {
      // 获取歌词
      getWordsOfMusic(this.id).then(res => {
        console.log(res);
        if (res.nolyric) {
          // 如果没有歌词
          this.wordsTime = [];
          return;
        }
        this.splitWords(res.lrc.lyric);
        let scrolly = Number(
          window
            .getComputedStyle(this.$refs.wordsOfSong, null)
            .height.replace(/px$/, "")
        );
        console.log(scrolly / 2);
        this.$refs.scroll.scrollTo(0, 0);
        this.currentNy = 0;
        this.screenHeight = scrolly;
      });
    },
    // 歌词滚动
    wordScrollUp(index) {
      this.wordIndex = index;
      this.$refs.scroll.scrollTo(0, this.currentNy - 31 * this.wordIndex);
    }
  }
};
</script>
<style scoped>
.playsong {
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
}
.songName {
  max-width: 50vw;
}
.creator {
  color: #aaaaaa;
  font-size: 12px;
}
.centerImg,
.centerImg-active {
  width: 75vw;
  height: 75vw;
  margin: 80px auto;
  border: 2px solid #666666;
  border-radius: 50%;
  position: relative;
}
@keyframes centerRotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.centerImg img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  border-radius: 50%;
}
.centerImg-active img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  border-radius: 50%;
  transform-origin: center;
  animation: centerRotate 10s linear infinite;
}
.controller {
  position: absolute;
  bottom: 30px;
  left: 5px;
  right: 5px;
}
.ganggan {
  position: absolute;
  width: 100vw;
  text-align: center;
  margin: 0 auto;
  z-index: 15;
  transition: all 2s;
}
.ganIcon {
  font-size: 30px;
}
.wordsOfSong,
.rotateImg {
  height: calc(100vh - 143px);
  width: 90vw;
  margin: 0 auto;
  overflow: hidden;
}
.wordsOfSong {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.wordItem {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  height: 16px;
}
.nulllyric {
  text-align: center;
  color: #aaaaaa;
}
.words {
  color: #aaaaaa;
  font-size: 14px;
  text-align: center;
}
.words-active {
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.cnt {
  position: absolute;
  top: 1px;
  bottom: 1px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-06 15:57:40
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-10 12:52:01
 -->
<template>
  <keep-alive>
    <div class="dialogDetailAudio" onselectstart="return false">
      <div class="time">
        <span class="dialogAudioTime">{{time}}</span>
        <div
          class="dialogAudioProgress"
          ref="dialogAudioProgress"
          @mousedown="controlAudioProgress($event)"
        >
          <span class="progressDot" :style="dotStyle"></span>
          <span class="bar" :style="progressStyle"></span>
        </div>
        <span class="dialogAudioDuration">{{duration}}</span>
      </div>
      <div class="controls">
        <div class="frontSong" @click="frontSong">
          <i class="iconfont">&#xe673;</i>
        </div>
        <div class="dialogAudioPlay" title="播控" @click="playAudio">
          <i class="iconfont audioPlay">{{audioImg}}</i>
        </div>
        <div class="afterSong" @click="afterSong">
          <i class="iconfont">&#xe674;</i>
        </div>
      </div>

      <audio
        ref="recordAudio"
        class="recordAudio"
        type="audio/mpeg"
        @canplay="canPlay"
        @timeupdate="timeUpdate"
        @ended="onEnded"
        :src="audioUrl"
        autoplay="autoplay"
      ></audio>
    </div>
  </keep-alive>
</template>
<script>
export default {
  props: {
    audioUrl: {
      type: String,
      default: ""
    },
    wordsTime: {
      type: Array,
      default() {
        return [];
      }
    },
    copyright: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    time: function(newVal) {
      // 当前歌曲有歌词且有版权的情况下去滚动歌词
      if (this.wordsTime.length > 0 && this.copyright) {
        // 找到第一个大于或等于newVal的index值
        this.index = this.findOutFirstIndex(newVal);
        if (
          this.index >= 0 &&
          this.wordsTime &&
          newVal === this.wordsTime[this.index][0]
        ) {
          console.log("到达第" + (this.index + 1) + "句歌词时间点");
          this.$emit("wordScrollUp", this.index);
        }
      }
    }
  },
  data() {
    return {
      index: 1,
      time: "00:00",
      duration: "00:00",
      progressStyle: { width: "" },
      dotStyle: { left: "" },
      audioImg: "\ue610", // 暂停图标
      imgIndex: 0
    };
  },
  methods: {
    findOutFirstIndex(timeStr) {
      let key = this.wordsTime && this.wordsTime.length;
      for (let i = key - 1; i >= 0; i--) {
        if (
          timeStr === this.wordsTime[i][0] ||
          this.timeStrToSecond(timeStr) >
            this.timeStrToSecond(this.wordsTime[i][0])
        ) {
          return i;
        }
      }
      // 还不够第一句歌词的时间点
      return -1;
    },
    mounted() {
      let recordAudio = this.$refs.recordAudio && this.$refs.recordAudio; //获取audio元素
      recordAudio.play();
    },
    timeStrToSecond(timeStr) {
      let m, s;
      [m, s] = timeStr.split(":");
      return parseInt(m) * 60 + parseInt(s);
    },
    //播放暂停控制
    playAudio() {
      let recordAudio = this.$refs.recordAudio && this.$refs.recordAudio; //获取audio元素
      if (recordAudio.paused) {
        this.audioImg = "\ue610"; // 暂停图标
        recordAudio.play();
        this.$emit("changeStatus", true);
      } else {
        this.audioImg = "\ue6c1"; // 开始图标
        recordAudio.pause();
        this.$emit("changeStatus", false);
      }
    },
    //进度条更新
    timeUpdate() {
      if (this.$refs.recordAudio) {
        this.duration = this.transTime(this.$refs.recordAudio.duration);
        let timeStr = parseInt(this.$refs.recordAudio.currentTime);
        this.time = this.transTime(timeStr);
        let scales =
          this.$refs.recordAudio.currentTime / this.$refs.recordAudio.duration;
        this.progressStyle.width = scales * 100 + "%";
        this.dotStyle.left = scales * 100 + "%";
      }
    },

    //播放结束
    onEnded() {
      this.audioImg = "\ue6c1";
      this.time = "00:00";
      this.progressStyle.width = 0;
      this.dotStyle.left = 0;
      // 下一首走起
      this.afterSong();
    },

    //用户可以开始播放audio
    canPlay() {
      //获取audio音频文件总时长 并设置到界面并解决出现 NAN 的问题
      this.duration =
        this.$refs.recordAudio &&
        this.transTime(this.$refs.recordAudio.duration);
    },

    //鼠标点击移动播放进度
    controlAudioProgress(event) {
      console.log("鼠标点击移动播放进度");
      let audio = this.$refs.recordAudio && this.$refs.recordAudio;
      let dialogAudioProgress =
        this.$refs.dialogAudioProgress && this.$refs.dialogAudioProgress;
      if (!audio.paused || audio.currentTime != 0) {
        let pgsWidth = parseFloat(
          window
            .getComputedStyle(dialogAudioProgress, null)
            .width.replace("px", "")
        );
        let rate = event.offsetX / pgsWidth;
        audio.currentTime = audio.duration * rate;
        this.timeUpdate();
      }
    },

    //时间转换
    transTime(value) {
      let time = "";
      let h = parseInt(value / 3600);
      value %= 3600;
      let m = parseInt(value / 60);
      let s = parseInt(value % 60);
      if (h > 0) {
        time = this.formatTime(h + ":" + m + ":" + s);
      } else {
        time = this.formatTime(m + ":" + s);
      }
      return time;
    },

    //时间格式化
    formatTime(value) {
      let time = "";
      let s = value.split(":");
      let i = 0;
      for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? "0" + s[i] : s[i];
        time += ":";
      }
      time += s[i].length == 1 ? "0" + s[i] : s[i];
      return time;
    },
    // 上一首歌
    frontSong() {
      this.$emit("frontPlay");
      this.audioImg = "\ue610"; // 暂停图标
    },
    // 下一首歌
    afterSong() {
      this.$emit("afterPlay");
      this.audioImg = "\ue610"; // 暂停图标
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.dialogDetailAudio {
  width: 100%;
  height: 49px;
}
.time {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.audioPlay {
  font-size: 40px;
}
.dialogAudioTime {
  font-size: 11px;
  font-weight: 400;
  color: #fff;
}

.dialogAudioProgress {
  width: 70%;
  height: 2px;
  background: rgba(212, 249, 232, 1);
  border-radius: 1px;
  position: relative;
}

.progressDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  background-color: rgba(5, 180, 147, 1);
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -5px;
  margin-left: -5px;
}

.bar {
  height: 100%;
  background: rgba(5, 180, 147, 1);
  border-radius: 3px;
  position: absolute;
}

.dialogAudioDuration {
  font-size: 11px;
  font-weight: 400;
  color: #666666;
}
.controls {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  margin: 5px auto;
}
</style>
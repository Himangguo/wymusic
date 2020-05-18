<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-15 20:08:00
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-18 11:59:57
 -->
<template>
  <div class="searchPage">
    <main-search-bar @searchSong="searchSong" />
    <song-list :playlist="playList" v-show="returnSearch" />
    <div class="nullData" v-show="!returnSearch">搜索一下吧</div>
  </div>
</template>
<script>
import mainSearchBar from "./mainSearchBar/MainSearchBar";
import SongList from "@/components/common/songList/SongList";
export default {
  components: {
    mainSearchBar,
    SongList
  },
  data() {
    return {
      playList: {
        trackCount: 0,
        tracks: []
      },
      returnSearch: false
    };
  },
  methods: {
    searchSong(songList) {
      this.returnSearch = true;
      console.log(songList);
      let tempObj = {
        id: new Date().getTime(),
        trackCount: songList.result.songs.length,
        tracks: songList.result.songs,
        trackIds: songList.result.songs.map(val => {
          return { id: val.id };
        })
      };
      this.playList = tempObj;
    }
  }
};
</script>
<style scoped>
.searchPage {
  width: 100vw;
  padding-bottom: 40px;
}
.nullData {
  position: absolute;
  top: 40vh;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
}
</style>

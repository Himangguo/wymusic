<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-15 20:28:39
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-16 16:05:43
 -->
<template>
  <div class="searchBar">
    <nav-bar>
      <div class="left" slot="left" @click="backPath">
        <i class="iconfont">&#xe603;</i>
      </div>
      <div class="center" slot="center">
        <div class="searchInputBox">
          <input class="input inputSearch" type="text" placeholder="歌曲关键词" v-model="keywords" />
          <div class="clearInput" @click="clearInput" v-show="inputKey">
            <i class="iconfont">&#xe604;</i>
          </div>
        </div>
      </div>
      <div class="right" slot="right">
        <i class="iconfont">&#xe609;</i>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import { search } from "@/network/search";
export default {
  data() {
    return {
      keywords: "",
      canRun: true,
      time: null
    };
  },
  watch: {
    keywords(newVal, oldVal) {
      // 搜索防抖
      clearTimeout(this.time);
      if (newVal !== oldVal && newVal.length > 0) {
        this.canRun = false;
        this.time = setTimeout(() => {
          // 执行搜索操作
          console.log("搜索中", newVal);
          search(newVal).then(data => {
            this.$emit("searchSong", data);
          });
        }, 300);
      }
    }
  },
  computed: {
    inputKey() {
      return this.keywords.length ? true : false;
    }
  },
  components: {
    NavBar
  },
  methods: {
    backPath() {
      this.$router.go(-1);
    },
    clearInput() {
      this.keywords = "";
    }
  }
};
</script>
<style scoped>
.searchBar {
  position: relative;
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.searchInputBox {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
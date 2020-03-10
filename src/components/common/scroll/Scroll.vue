<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullingUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      probeType: this.probeType,
      pullUpLoad: this.pullingUpLoad,
      click: true,
    });

    // 监听滚动事件
    this.probeType === 2 ||
      (this.probeType === 3 &&
        this.scroll.on("scroll", position => {
          this.$emit("scroll", position);
        }));
    // 监听上拉加载事件
    this.pullingUpLoad &&
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingLoad");
      });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullingUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>
<style scoped>
</style>
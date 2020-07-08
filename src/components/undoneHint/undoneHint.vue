<template>
  <div class="undone-content">
    <div class="undone-img">
      <img class="undone-bg" :src="require('@/assets/undonePage/bg.png')" />
      <img class="undone-cilun" :src="require('@/assets/undonePage/cilun.png')" />
    </div>
    <div class="text">{{title}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      default: "程序猿正在玩命开发中..."
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped="scoped">
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.undone-content {
  width: 373px;
  height: 248px;
  .undone-img {
    width: 100%;
    height: 100%;
    position: relative;
    .undone-bg {
      width: 100%;
      height: 100%;
    }
    .undone-cilun {
      position: absolute;
      width: 18.77%;
      right: 30%;
      bottom: 25%;
      animation: circle 3s linear infinite;
    }
  }
  .text {
    text-align: center;
    padding: 5px 0;
    padding-top: 25px;
    color: #97a8be;
    height: 48px;
    // white-space: nowrap;
    overflow: hidden;
  }
}
</style>

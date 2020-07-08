<template>
  <div class="component">
    <div class="title">功能组件注入说明</div>
    <img class="zoom" @dblclick="closeImg()" id="zoom" :src="zoom" :class="{zoomBlock:iszoom}" />
    <div class="item" v-for="(d,$index) in data" :key="$index">
      <div class="name" @dblclick="toPage(d.url)">名称：{{d.name}}</div>
      <div class="description">描述：{{d.decripton}}</div>
      <!-- <img class="image" @dblclick="image(d.img)" :src="d.img" /> -->
      <img class="image" @dblclick="image(d.img)" :src="'./componentDescrptImg/' + d.imgName" />
    </div>
  </div>
</template>
activitySecurity/logo.png')
<script>
import { data } from "./componentDescription.js";

export default {
  name: "Layout",
  components: {},
  data() {
    return {
      zoom: "",
      iszoom: false,
      data: data
    };
  },
  computed: {},
  methods: {
    image(src) {
      this.zoom = src;
      this.iszoom = true;
    },
    closeImg() {
      this.iszoom = false;
    },
    toPage(path) {
      if (!this.isNull(path)) {
        let routeData = this.$router.resolve({
          path: path
        });
        window.open(routeData.href, "_blank");
        // this.$router.push({ path: path });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.component {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;
  font-family: "微软雅黑";
  div {
    padding: 5px 0px;
  }
  .name {
    cursor: pointer;
  }
  .item {
    width: 33.3%;
    float: left;
    margin-bottom: 20px;
  }

  .image {
    max-height: 300px;
    overflow: hidden;
    cursor: pointer;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .zoom {
    position: fixed;
    left: 50%;
    top: 50px;
    height: 60%;
    cursor: pointer;
    transform: translateX(-50%);
    display: none;
  }
  .zoomBlock {
    display: block;
  }
}
</style>

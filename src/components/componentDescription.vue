<template>
  <div class="component">
    <div class="title">功能组件注入说明</div>
    <div class="searchInput">
      <input
        v-model="searchVal"
        @change="searchChange(searchVal)"
        placeholder="请输入组件名称或者组件描述"
        type="text"
      />
    </div>
    <img class="zoom" @dblclick="closeImg()" id="zoom" :src="zoom" :class="{zoomBlock:iszoom}" />
    <div class="item" v-for="(d,$index) in data" :key="$index" v-bind:class="{active: d.active}">
      <div class="name" @dblclick="toPage(d.url)">名称：{{d.name}}</div>
      <div class="description">描述：{{d.decripton}}</div>
      <img class="image" @dblclick="image(d.img)" :src="d.img" />
    </div>

    <div class="title" style="margin-top: 25px;">全局组件信息</div>
    <div class="searchInput">
      <input
        v-model="GsearchVal"
        @change="GsearchChange(GsearchVal)"
        placeholder="请输入组件名称或者组件描述"
        type="text"
      />
    </div>
    <div class="item" v-for="(d,$index) in Gdata" :key="$index+10000" v-bind:class="{active: d.active}">
      <div class="name" @dblclick="toPage(d.url)">名称：{{d.name}}</div>
      <div class="description">描述：{{d.decripton}}</div>
      <img class="image" @dblclick="image(d.img)" :src="d.img" />
    </div>
  </div>
</template>
activitySecurity/logo.png')
<script>
import { data } from "./componentDescription.js";
import { data as Gdata } from "@/globalComponent/globalComponentDes.js";

export default {
  name: "Layout",
  components: {},
  data() {
    return {
      searchVal: null,
      GsearchVal: null,
      zoom: "",
      iszoom: false,
      data: data,
      Gdata: Gdata
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
    },
    searchChange(val) {
      this.data.forEach(el => {
        el.active =
          val !== "" &&
          val !== null &&
          (el.name.indexOf(val) > -1 || el.decripton.indexOf(val)) > -1
            ? true
            : false;
      });
    },
    GsearchChange(val) {
      this.Gdata.forEach(el => {
        el.active =
          val !== "" &&
          val !== null &&
          (el.name.indexOf(val) > -1 || el.decripton.indexOf(val)) > -1
            ? true
            : false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.component {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: "微软雅黑";
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  div {
    padding: 5px 0px;
  }
  .name {
    cursor: pointer;
  }
  .item {
    width: calc(33.3% - 3px);
    margin-bottom: 20px;
    &.active {
      border: solid 1px red;
    }
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

  .searchInput {
    width: 100%;
    padding: 0 10px;
    text-align: center;
    input {
      width: 30%;
      height: 28px;
      min-width: 400px;
      max-width: 600px;
      outline: none;
    }
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

<template>
  <div class="wrapper menuBox">
    <div class="menumain">
      <div
        v-for="(item, index) in menuDatas.data"
        :class="['ani menuitem menuitem' + item.classIndex + ' imgitem' + index]"
        :style="'width:' + menuDatas.width + 'px;'"
        :key="index"
        @click="getLocation(index)"
      >
        <a>
          <span
            :class="['img', item.classIndex == 2 ? 'active' : '']"
            :style="'width:' + menuDatas.width + 'px;height:' + menuDatas.height + 'px;'"
          ></span>
          <span class="name">{{ item.name }}</span>
        </a>
      </div>
    </div>

    <div class="children-menu">
      <div class="child-body" id="scroll-menu">
        <div
          class="child-item"
          v-for="(item, index) in levelData"
          :key="index"
          @click="itemClick(item)"
        >
          <div>
            <img :src="'image/mainEntry/menuItem/' + item.image + '.png'" v-if="item.image" />
          </div>
          <div>
            <span class="name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="BottomArea" v-bind:class="{ show: show }">
      <div class="item" v-for="(p, $index) in subMenu" :key="$index">
        <span @click="sunMenuLocation(p)">{{ p.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

import userSystemConfig from "@/mixins/userSystemConfig";
import defaultSettings from "@/settings";

import { setToken, getToken, removeCache, getStorage, toLogin } from "@utils";

import { menuDatas } from "./index.js";

export default {
  components: {},
  mixins: [], //userSystemConfig
  computed: {},
  data() {
    return {
      menuDatas: menuDatas,
      startNum: 6,
      levelData: [],
      show: false,
      subMenu: []
    };
  },
  methods: {
    getLocation(index, isPrev) {
      this.show = false;
      Message.closeAll();
      // var hasToken = getToken();
      // if (hasToken) {
      //   var userInfo = getStorage('userInfo');
      //   if (!userInfo) {
      //     this.$message({
      //       message: '未检测到用户信息!',
      //       type: 'warning'
      //     });
      //     return;
      //   }
      //   // this.toNext(index, isPrev);
      // } else {
      //   this.$message({
      //     message: '未登录,请先登陆!',
      //     type: 'warning'
      //   });

      //   removeCache(); //清除token local...  session...等

      //   var login = defaultSettings.login && defaultSettings.login.unadd;
      //   if (login) {
      //     this.$router.push('/login');
      //   } else {
      //     toLogin();
      //   }
      // }

      var data = this.menuDatas.data;
      var arr1 = [],
        arr2 = [];
      var urlarr = [],
        urlarr2 = [];
      data.map((ele, i) => {
        if (i === index) {
          ele.classIndex = 2;
          ele.width = 180;
          ele.height = 180;
          this.leveltitle = ele.name;
          if (ele.children && ele.children.length > 0) {
            this.urls = false;
            let tmpArr = [];
            this.levelData = [];
            ele.children.map((item, index) => {
              tmpArr.push(item);
            });
            this.levelData = tmpArr;
          }
        } else {
          ele.width = 136;
          ele.height = 136;
          if (i < index) {
            var key = 2 - (index - i);
            if (key < 0) {
              ele.classIndex = key + 5;
            } else {
              ele.classIndex = key;
            }
          } else if (i > index) {
            var key = 2 + (i - index);
            if (key > 4) {
              ele.classIndex = key - 5;
            } else {
              ele.classIndex = key;
            }
          }
        }
      });
    },
    toNext(index, isPrev) {
      var data = this.menuDatas.data;
      var minIndex = Math.floor(data.length / 2);
      var menuLen = data.length;
      data.map((ele, i) => {
        if (i === index) {
          ele.classIndex = minIndex; //取中心值
        } else {
          ele.width = this.menuDatas.width;
          ele.height = this.menuDatas.height;
          let key = i < index ? minIndex - (index - i) : minIndex + (i - index);
          ele.classIndex =
            i < index
              ? key < 0
                ? key + menuLen
                : key
              : key > menuLen - 1
              ? key - menuLen
              : key;
        }
      });
      let herf_data = data[index];
      const _this = this;
      switch (herf_data.typeUrl) {
        case "sub":
          setTimeout(function() {
            _this.$router.push({
              path: herf_data.url
            });
          }, 500);
          break;
        case "sub_blank":
          let routeData = this.$router.resolve({
            path: herf_data.url
          });
          setTimeout(function() {
            window.open(herf_data.url, "_blank");
          }, 500);
          break;
        case "url":
          setTimeout(function() {
            window.open(herf_data.url, "_blank");
          }, 500);
          break;
        case "children":
          this.subMenu = herf_data.children;
          this.show = true;
          break;
        case "none":
          break;
      }
    },
    changeMenu(isPrev) {
      if (isPrev === true) {
        var data = this.menuDatas.data;
        this.startNum--;
        this.getLocation(this.startNum, true);
        if (this.startNum < 0) {
          this.startNum = 14;
          this.getLocation(this.startNum, true);
        }
      } else {
        var data = this.menuDatas.data;
        this.startNum++;
        this.getLocation(this.startNum, false);
        if (this.startNum > 14) {
          this.startNum = 0;
          this.getLocation(this.startNum, false);
        }
      }
    },
    sunMenuLocation(p) {
      let { type, url } = p;
      switch (type) {
        case "sub":
          setTimeout(function() {
            _this.$router.push({
              path: herf_data.url
            });
          }, 500);
          break;
        case "sub_blank":
          let routeData = this.$router.resolve({
            path: herf_data.url
          });
          setTimeout(function() {
            window.open(herf_data.url, "_blank");
          }, 500);
          break;
        case "url":
          setTimeout(function() {
            window.open(herf_data.url, "_blank");
          }, 500);
          break;
        case "children":
          this.subMenu = herf_data.children;
          this.show = true;
          break;
        case "none":
          break;
      }
    },
    itemClick(item) {
      switch (item.typeUrl) {
        case "sub":
          _this.$router.push({
            path: item.url
          });
          break;
        case "sub_blank":
          let routeData = this.$router.resolve({
            path: item.url
          });
          window.open("#" + item.url, "_blank");
          break;
        case "url":
          window.open(item.url, "_blank");
          break;
        case "children":
          this.subMenu = item.children;
          this.show = true;
          break;
        case "none":
          break;
      }
    },
    initMouseWheelEvent() {
      let container = document.getElementById("scroll-menu");
      container.addEventListener(
        "mousewheel",
        function(e) {
          //计算鼠标滚轮滚动的距离
          let v = -e.wheelDelta / 2;
          container.scrollLeft += v;
          //阻止浏览器默认方法
          e.preventDefault();
        },
        false
      );
    }
  },
  mounted() {
    this.levelData = this.menuDatas.data[2].children;
    this.initMouseWheelEvent();
  }
};
</script>

<style lang="scss">
.swiper-pagination {
  .swiper-pagination-bullet {
    width: 32px;
    height: 32px;
    background: url("../../../assets/image/mainEntry/menu/xin_12.png")
      no-repeat 0 0;
    opacity: 1;
    text-indent: -9999px;
  }
  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    background: url("../../../assets/image/mainEntry/menu/xin_10.png")
      no-repeat 0 0;
  }
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0;
}
</style>

<style lang="scss" scoped="" type="text/css">
@import "../style/zafkIndex.scss";
</style>

<template>
  <div class="alert-wrap wh100">
    <div class="content clearfix">
      <div class="row-1 fl row">
        <div class="column-1 layout-column">
          <div class="title">时空关联分析</div>
          <bar3d ref="bar3d"></bar3d>
        </div>
      </div>
      <div class="row-2 fl row">
        <div class="column-1 layout-column">
          <div class="title">区域态势图</div>
          <alertRegionMap ref="alertRegionMap"></alertRegionMap>
        </div>
        <div class="column-2 layout-column">
          <div class="title">分布态势</div>
        </div>
      </div>
      <div class="row-3 fl row">
        <div class="column-1">
          <div class="title">自定义区域分布</div>
        </div>
        <div class="column-2">
          <div class="title">自定义类型态势</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bar3d from "@views/socialPatrol/direction/alertInfo/bar3d/bar3d.vue";
import alertRegionMap from "@views/socialPatrol/direction/alertInfo/alertRegionMap/alertRegionMap.vue";

export default {
  components: {
    bar3d,
    alertRegionMap,
  },
  data() {
    return {
      caseRegionCode: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      let index = 0;

      this.$refs["bar3d"].init();
      this.$refs["alertRegionMap"].init();
    },
    initCaseRegion(caseRegionCode) {
      this.caseRegionCode = caseRegionCode;
    }
  },
  created() {
    $(document).on("keydown", function(e) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 122) {
        //捕捉F11键盘动作
        e.preventDefault(); //阻止F11默认动作
        var el = document.documentElement;
        var rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullScreen; //定义不同浏览器的全屏API　　　　　　//执行全屏
        if (typeof rfs != "undefined" && rfs) {
          rfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        } //监听不同浏览器的全屏事件，并件执行相应的代码
        document.addEventListener(
          "webkitfullscreenchange",
          function() {
            //
            if (document.webkitIsFullScreen) {
              //全屏后要执行的代码
              console.log("全屏");
              $("#downmenu").hide();
            } else {
              //退出全屏后执行的代码
              console.log("退出全屏");
              $("#downmenu").show();
            }
          },
          false
        );
      }
    });
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.init, false);
  },
  destroyed() {
    $(document).off("keydown");
  }
};
</script>
<style lang='scss'>
.header {
  height: 100px !important;
}
#app .main-container {
  margin-left: 0px;
}
.app-main {
  height: 100% !important;
  background: transparent !important;
}
$path: "../../../../assets/image/socialPatrol/direction/";
.alert-wrap {
  box-sizing: border-box;
  padding-bottom: 10px;
  .switch-page {
    width: 452px;
    height: 27px;
    // background: url("../zaxfBoard/imgs/switchPage.gif");
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 15px;
    .switch-side {
      width: 160px;
      height: 27px;
      background: transparent;
      float: left;
      cursor: pointer;
    }
    .page-title {
      width: 132px;
      height: 27px;
      line-height: 27px;
      font-size: 24px;
      color: #baddff;
      text-align: center;
      float: left;
    }
  }
  .content {
    height: calc(100% - 61px);
    position: relative;
    .title {
      background-image: url($path+"alert/title.gif");
      background-size: 100% 100%;
      height: 56px;
      width: 413px;
      line-height: 56px;
      color: #fff;
      font-size: 14px;
      padding-left: 66px;
      position: relative;
    }
    .left1,
    .left2,
    .middle1,
    .middle2,
    .right1,
    .right2 {
      height: calc(100% - 56px);
    }
    & > .row {
      height: 100%;
      background-size: 100% 100%;
      background-image: url($path+"alert/bg.png");
    }
    & > .row-1 {
      width: 30%;
      padding: 30px 30px 20px 30px;
      .column-1 {
        height: 50%;
      }
      .column-2 {
        height: 50%;
      }
    }
    & > .row-2 {
      width: 40%;
      background-image: unset;
      .column-2 {
        height: 40%;
      }
      .column-1 {
        height: 60%;
      }
    }
    & > .row-3 {
      padding: 30px;
      width: 30%;
      .column-1 {
        height: 50%;
      }
      .column-2 {
        height: 50%;
        .right2 {
          height: calc(100% - 56px);
        }
      }
    }
    .arrow {
      width: 60px;
      height: 96px;
      background-size: 100% 100%;
      display: block;
      position: absolute;
      cursor: pointer;
      z-index: 10;
      display: none;
    }
    .right-arrow {
      background: url($path+"rightArrow.png");
      right: 0;
    }
    .left-arrow {
      background: url($path+"leftArrow.png");
      left: 0;
    }
  }
  .content:hover {
    .arrow {
      display: block;
    }
  }
}
</style>

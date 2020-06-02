<template>
  <div
    ref="node"
    :style="flowNodeContainer"
    @mouseenter="showDelete"
    @mouseleave="hideDelete"
    @contextmenu.prevent="rightClick"
    @mouseup="changeNodeSite"
    class="node"
  >
    <div class="flow-node-drag el-icon-goods"></div>
    <div class="node-start desc" v-if="start">开始节点</div>
    <div class="node-end desc" v-if="end">结束节点</div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object,
    fields: {
      name: {}
    }
  },
  data() {
    return {
      jsonStr: this.node.data,
      // 控制节点操作显示
      mouseEnter: false,
      showInfo: true,
      start: this.node.type == "start",
      end: this.node.type == "end"
    };
  },
  mounted() {},
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get() {
        return {
          position: "absolute",
          // width: "200px",
          top: this.node.top,
          left: this.node.left,
          boxShadow: this.mouseEnter
            ? "rgb(26, 192, 222) 0px 0px 12px 0px"
            : "rgb(39, 161, 183)  0px 0px 12px 0px",
          backgroundColor: "transparent"
        };
      }
    }
  },

  methods: {
    // 鼠标进入
    showDelete() {
      this.mouseEnter = true;
    },
    // 鼠标离开
    hideDelete() {
      this.mouseEnter = false;
    },
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (
        this.node.left == this.$refs.node.style.left &&
        this.node.top == this.$refs.node.style.top
      ) {
        return;
      }
      this.$emit("changeNodeSite", {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      });
    },
    rightClick(MouseEvent) {
      const _this = this;
      this.$emit("rightClick", {
        left:
          parseInt(_this.node.left) + MouseEvent.currentTarget.clientWidth + 10,
        top: parseInt(_this.node.top),
        node: _this.node
      });
    }
  }
};
</script>
<style >
.el-icon-goods:before {
  color: #fff;
}
</style>
<style scoped lang="scss">
@import "@/styles/variables.scss";
.node > .desc {
  line-height: 100px;
  width: 140px;
  height: 100px;
  border: 5px solid #0cd3f8;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: $t-color6;
}
.node-start {
}
.flow-node-drag {
  position: absolute;
  right: 0;
}
</style>

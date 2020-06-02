<template>
  <div
    ref="node"
    :style="flowNodeContainer"
    @mouseenter="showDelete"
    @mouseleave="hideDelete"
    @mouseup="changeNodeSite"
    @contextmenu.prevent="rightClick"
    class="node"
  >
    <div class="flow-node-header">
      <span>{{node.name}}</span>
      <!--左上角的那个图标样式-->
      <i :class="nodeClass"></i>
      <!--鼠标移入到节点中时右上角的【编辑】、【删除】 按钮-->
      <!-- <div class="operate" v-show="mouseEnter">
        <a @click="editNode">
          <img src="@planManagement/components/flow/assets/edit.png" />
        </a>&nbsp;
        <a @click="deleteNode">
          <img src="@planManagement/components/flow/assets/delete.png" />
        </a> &nbsp;
        <a @click="expandNode">展开</a> &nbsp;
      </div>-->
    </div>
    <!--节点的正文部分-->
    <div class="flow-node-body" v-if="getExpand">
      <div v-for="data in getResourceList">
        <div class="item">
          <span>资源类型：</span>
          <span :title="data.name">{{data.name}}</span>
        </div>
        <div class="item">
          <span>资源数量：</span>
          <span :title="data.num">{{data.num}}</span>
        </div>
      </div>
      <div class="item wordWrap">
        <span>资源描述：</span>
        <span :title="node.desc">{{node.desc}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    node: Object
  },
  data() {
    return {
      jsonStr: this.node,
      // 控制节点操作显示
      mouseEnter: false
    };
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get() {
        return {
          position: "absolute",
          width: "200px",
          top: this.node.top,
          left: this.node.left,
          boxShadow: this.mouseEnter
            ? "rgb(26, 192, 222) 0px 0px 12px 0px"
            : "rgb(39, 161, 183)  0px 0px 12px 0px",
          backgroundColor: "transparent"
        };
      }
    },
    nodeClass() {
      var nodeclass = {};
      nodeclass[this.node.ico] = true;
      nodeclass["flow-node-drag"] = true;
      return nodeclass;
    },
    getExpand() {
      return this.node.expand;
    },
    getResourceList() {
      if ("resourceList" in this.node) {
        return this.node.resourceList;
      } else {
        return [];
      }
    }
  },

  methods: {
    // 删除节点
    deleteNode() {
      this.$emit("deleteNode", this.node.id);
    },
    // 编辑节点
    editNode() {
      this.$emit("editNode", this.node.id);
    },
    // 鼠标进入
    showDelete() {
      this.mouseEnter = true;
    },
    // 鼠标离开
    hideDelete() {
      this.mouseEnter = false;
    },
    //详细 简要node信息切换
    expandNode() {
      if (this.node.expand == null) {
        this.node.expand = false;
      } else {
        this.node.expand = !this.node.expand;
      }
      this.$emit("expandNode", this.node.id);
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

<style scoped lang="scss">
@import "@/styles/variables.scss";
.wordWrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.node {
  font-size: 14px;
  .flow-node-drag {
    width: 25px;
    height: 25px;
  }
  .flow-node-header {
    background-color: #001f4e;
    padding-left: 6px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    .operate {
      position: absolute;
      top: 0px;
      right: 0px;
    }
    a {
      text-decoration: none;
      line-height: 25px;
      vertical-align: middle;
      img {
        line-height: 25px;
        vertical-align: middle;
        margin-bottom: 5px;
      }
    }
  }
  .flow-node-body {
    // background-color: white;
    color: #fff;
    text-align: center;
    cursor: pointer;
    line-height: 25px;
    // height: 132px;
    overflow: auto;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 6px;
    .item {
      text-align: left;
      height: 24px;
      line-height: 24px;
    }
  }
}
.flow-node-drag {
  position: absolute;
  line-height: 40px;
  right: 0;
}
</style>

<template>
  <div ref="tool" class="tool">
    <el-menu>
      <div draggable="true" @dragstart="drag" :data="startData" class="node-start item">开始节点</div>
      <div draggable="true" @dragstart="drag" class="node item" :data="processData">
        <div>流程</div>
      </div>
      <div draggable="true" @dragstart="drag" class="node-end item" :data="endData">结束节点</div>
    </el-menu>
  </div>
</template>
<script>
var mousePosition = {
  left: -1,
  top: -1
};
export default {
  data() {
    return {
      startData: JSON.stringify({
        type: "start",
        ico: "el-icon-goods",
        expand: true,
        id: "start"
      }),
      endData: JSON.stringify({
        type: "end",
        ico: "el-icon-goods",
        expand: true,
        id: "end"
      }),
      processData: JSON.stringify({
        type: "process",
        ico: "el-icon-goods",
        expand: true
      })
    };
  },
  components: {},
  created() {},
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("data", ev.target.getAttribute("data"));
      var moveTarget = {
        clientWidth: ev.currentTarget.clientWidth,
        clientHeight: ev.currentTarget.clientHeight
      };
      ev.dataTransfer.setData("moveTarget", JSON.stringify(moveTarget));
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/variables.scss";
.tool {
  & > .el-menu {
    background: transparent;;
    border-right-width: 0;
  }
  .flow-tool-menu {
    background-color: #eeeeee;
    cursor: pointer;
    padding-left: 5px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #979797;
  }

  .flow-tool-submenu {
    background-color: white;
    padding-left: 20px;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    border-bottom: 1px solid #d3d3d3;
  }
  .node-start,
  .node-end {
    line-height: 100px;
    width: 140px;
    height: 100px;
    border: 5px solid #0cd3f8;
    border-radius: 50%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .node {
    line-height: 100px;
    width: 140px;
    height: 100px;
    border: 5px solid #0cd3f8;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .item + .item {
    margin-left: 10px;
  }
  .item {
    float: left;
    color: $t-color6;
  }
  .draggable {
    height: 100px;
  }
}
</style>

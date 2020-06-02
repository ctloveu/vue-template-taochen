<template>
  <div v-if="easyFlowVisible" class="w100 h100">
    <el-row class="h100 layout-column">
      <el-row :span="3" ref="flowTool">
        <flowTool @addNode="addNode"></flowTool>
      </el-row>
      <el-row class="canvas flex">
        <el-col :span="24" class="h100">
          <!--画布-->
          <div
            @drop="drop"
            @dragover="dragover"
            id="flowContainer"
            class="container"
            style="height:100%;"
          >
            <nodeRightMenu
              v-if="showNodeRightMenu"
              ref="nodeRightMenu"
              id="nodeRightMenu"
              @confirm="confirmNodeRightMenu"
            ></nodeRightMenu>
            <lineRightMenu
              @confirm="confirmLineRightMenu"
              v-if="showLineRightMenu"
              ref="lineRightMenu"
              id="lineRightMenu"
            ></lineRightMenu>
            <template v-for="(node,index) in data.nodeList">
              <flow-node
                v-show="node.show"
                v-if="node.type=='process'"
                :id="node.id"
                :node="node"
                @deleteNode="deleteNode"
                @changeNodeSite="changeNodeSite"
                @editNode="editNode"
                @rightClick="nodeRightClick"
              ></flow-node>
              <flow-node-start
                v-show="node.show"
                v-if="node.type!='process'"
                :node="node"
                :id="node.id"
                @changeNodeSite="changeNodeSite"
                @rightClick="nodeRightClick"
              ></flow-node-start>
            </template>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <flow-node-form v-if="nodeFormVisible" @confirm="editNodeConfirm" ref="nodeForm"></flow-node-form>
    <flow-line-form v-if="lineFormVisible" @confirm="editLineConfirm" ref="lineForm"></flow-line-form>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb";
import flowNode from "./node";
import flowNodeStart from "./nodeStart";
import flowTool from "./tool";
import FlowNodeForm from "./node_form";
import FlowLineForm from "./line_form";
import lodash from "lodash";
import { getDataA } from "./data_A";
import nodeRightMenu from "./nodeRightMenu";
import lineRightMenu from "./lineRightMenu";

export default {
  name: "easyFlow",
  props: {
    dialogFormType: ""
  },
  data() {
    return {
      jsPlumb: null, // jsPlumb 实例
      easyFlowVisible: true,
      flowInfoVisible: false,
      nodeFormVisible: false,
      lineFormVisible: false,
      showNodeRightMenu: false,
      showLineRightMenu: false,
      index: 1,
      IndexKey: 0,
      // 默认设置参数
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: [
          "Top",
          "TopCenter",
          "TopRight",
          "TopLeft",
          "Right",
          "RightMiddle",
          "Bottom",
          "BottomCenter",
          "BottomRight",
          "BottomLeft",
          "Left",
          "LeftMiddle"
        ],
        Container: "flowContainer",
        // 连线的样式 StateMachine、Flowchart
        Connector: "Flowchart",
        // 鼠标不能拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的端点
        // Endpoint: ["Dot", {radius: 5}],
        Endpoint: ["Rectangle", { height: 10, width: 10 }],
        // 线端点的样式
        EndpointStyle: { fill: "rgba(12,211,248,0)", outlineWidth: 1 },
        LogEnabled: true, //是否打开jsPlumb的内部日志记录
        // 绘制线
        PaintStyle: { stroke: "#0cd3f8", strokeWidth: 3 },
        // 绘制箭头
        Overlays: [["Arrow", { width: 12, length: 12, location: 1 }]],
        ConnectionOverlays: [
          [
            "Label",
            {
              location: 0.5,
              id: "label",
              cssClass: "connection-label",
              events: {
                tap: function() {
                  alert("hey");
                }
              }
            }
          ]
        ],
        RenderMode: "svg"
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: "Continuous"
      },
      jsplumbSourceOptions: {
        filter:
          ".flow-node-drag" /*"span"表示标签，".className"表示类，"#id"表示元素id*/,
        filterExclude: false,
        anchor: "Continuous",
        allowLoopback: false,
        connectorHoverStyle: {
          strokeWidth: 6
        }
      },
      jsplumbTargetOptions: {
        filter:
          ".flow-node-drag" /*"span"表示标签，".className"表示类，"#id"表示元素id*/,
        filterExclude: false,
        anchor: "Continuous",
        allowLoopback: false,
        connectorHoverStyle: {
          strokeWidth: 6
        }
      },
      // 是否加载完毕
      loadEasyFlowFinish: false,
      // 数据
      data: {
        nodeList: []
      } 
    };
  },
  components: {
    flowNode,
    flowNodeStart,
    flowTool,
    // FlowInfo,
    FlowNodeForm,
    FlowLineForm,
    nodeRightMenu,
    lineRightMenu
  },
  mounted() {
    // this.jsPlumb = jsPlumb.getInstance();
    // this.$nextTick(() => {
    //   this.dataReloadA();
    // });

    //关闭右键菜单
    const _this = this;
    document.addEventListener("click", function() {
      _this.showNodeRightMenu = false;
      _this.showLineRightMenu = false;
    });
  },
  methods: {
    jsPlumbInit() {
      const _this = this;
      this.jsPlumb.ready(function() {
        // 导入默认配置
        _this.jsPlumb.importDefaults(_this.jsplumbSetting);
        // 会使整个jsPlumb立即重绘。
        _this.jsPlumb.setSuspendDrawing(false, true);

        // 单点击了连接线,
        _this.jsPlumb.bind("click", function(conn, originalEvent) {
          console.log("click", conn);

          _this
            .$confirm("确定删除所点击的线吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              customClass: "message-box-kj2"
            })
            .then(() => {
              _this.jsPlumb.deleteConnection(conn);
              _this.deleteLine(conn.sourceId, conn.targetId);
            })
            .catch(() => {});
        });
        // 连线
        _this.jsPlumb.bind("connection", function(evt) {
          console.log("connection", evt);
          let from = evt.source.id;
          let to = evt.target.id;
          if (_this.loadEasyFlowFinish) {
            _this.lineList.push({
              from: from,
              to: to
            });
          }
          // evt.connection.getOverlay("label").setLabel("123456");
        });

        // 删除连线
        _this.jsPlumb.bind("connectionDetached", function(evt) {
          console.log("connectionDetached", evt);
          _this.deleteLine(evt.sourceId, evt.targetId);
        });

        // 改变线的连接节点
        _this.jsPlumb.bind("connectionMoved", function(evt) {
          console.log("connectionMoved", evt);
          _this.changeLine(evt.originalSourceId, evt.originalTargetId);
        });

        // 单击endpoint
        // jsPlumb.bind("endpointClick", function (evt) {
        //   console.log('endpointClick', evt)
        // })
        //
        // // 双击endpoint
        // jsPlumb.bind("endpointDblClick", function (evt) {
        //   console.log('endpointDblClick', evt)
        // })

        // contextmenu
        _this.jsPlumb.bind("contextmenu", function(conn, originalEvent) {
          originalEvent.preventDefault();
          _this.showLineRightMenu = true;
          _this.$nextTick(function() {
            $("#lineRightMenu").css({
              left: originalEvent.screenX - 300,
              top: originalEvent.screenY - 500
            });
            _this.$refs["lineRightMenu"].setConn(conn);
          });
        });

        // beforeDrop
        _this.jsPlumb.bind("beforeDrop", function(evt) {
          console.log("beforeDrop", evt);
          let from = evt.sourceId;
          let to = evt.targetId;
          if (_this.getNode(to).type == "start") {
            _this.$message.error("开始节点不能设置为终点");
            return false;
          }
          if (_this.getNode(from).type == "end") {
            _this.$message.error("结束节点不能设置为起点");
            return false;
          }
          if (from === to) {
            _this.$message.error("不能连接自己");
            return false;
          }
          if (_this.hasLine(from, to)) {
            _this.$message.error("不能重复连线");
            return false;
          }
          if (_this.hashOppositeLine(from, to)) {
            _this.$message.error("不能回环哦");
            return false;
          }
          _this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
          //成功后，添加新的连线信息
          _this.data.lineList.push({
            from: from,
            to: to
          });
          return true;
        });

        // beforeDetach
        _this.jsPlumb.bind("beforeDetach", function(evt) {
          console.log("beforeDetach", evt);
        });
        // 初始化节点
        _this.loadEasyFlow();
      });
    },
    getNode(id) {
      var target = { type: null };
      this.data.nodeList.forEach(element => {
        if (element.id == id) {
          target = element;
          return;
        }
      });
      return target;
    },
    // 加载流程图
    loadEasyFlow() {
      // 初始化节点
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i];
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions);
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);
        // jsPlumb.addEndpoint(node.id)
        // 设置可拖拽
        // jsPlumb.draggable(node.id, {
        //     containment: 'parent',
        //     grid: [10, 10]
        // })
        if (this.dialogFormType != "view") {
          this.jsPlumb.draggable(node.id, {
            containment: "parent"
          });
        }

        // jsPlumb.draggable(node.id)
      }
      // 清除已经存在所有连线
      // const _this = this;
      // let connections = this.jsPlumb.getAllConnections();
      // connections.forEach(element => {
      //   _this.jsPlumb.detach(element);
      // });
      // 初始化连线
      for (var i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i];
        let jsPlumbLine = this.jsPlumb.connect({
          source: line.from,
          target: line.to
        });
        if (line.label) {
          jsPlumbLine.setLabel({
            label: line.label,
            cssClass: "labelClass a b"
          });
        }
      }
      this.$nextTick(function() {
        this.loadEasyFlowFinish = true;
      });
    },
    getNodes() {
      console.log(jsPlumb);
      console.log(jsPlumb.Defaults);
    },
    getLines() {
      console.log("线", jsPlumb.getConnections());
    },
    // 删除线
    deleteLine(from, to) {
      this.data.lineList = this.data.lineList.filter(function(line) {
        return line.from !== from && line.to !== to;
      });
    },
    // 改变连线
    changeLine(oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo);
    },
    // 改变节点的位置
    changeNodeSite(data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i];
        if (node.id === data.nodeId) {
          node.left = data.left;
          node.top = data.top;
        }
      }
    },
    // 添加新的节点
    addNode(evt, data, moveTarget) {
      console.log("添加节点", evt, data);
      let width = this.$refs.flowTool.$el.clientWidth;
      let height = this.$refs.flowTool.$el.clientHeight;
      const index = new Date().getTime() + "" + parseInt(Math.random() * 10000);
      let nodeId = "node" + index;
      var left = evt.layerX - moveTarget.clientWidth / 2;
      var top = evt.layerY - moveTarget.clientHeight / 2;
      var node = {
        id: nodeId,
        left: left + "px",
        top: top + "px",
        ico: data.ico,
        show: true,
        key: index,
        expand: data.expand,
        type: data.type,
        name: "节点" + index,
        desc: "",
        resourceList: []
      };
      this.data.nodeList.push(node);
      this.$nextTick(function() {
        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions);

        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions);

        this.jsPlumb.draggable(nodeId, {
          containment: "parent"
        });
      });
    },
    // 是否具有该线
    hasLine(from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        var line = this.data.lineList[i];
        if (line.from === from && line.to === to) {
          return true;
        }
      }
      return false;
    },
    // 是否含有相反的线
    hashOppositeLine(from, to) {
      return this.hasLine(to, from);
    },
    nodeRightMenu(nodeId, evt) {
      this.menu.show = true;
      this.menu.curNodeId = nodeId;
      this.menu.left = evt.x + "px";
      this.menu.top = evt.y + "px";
    },
    deleteNode(nodeId) {
      this.$confirm("确定要删除节点" + nodeId + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "message-box-kj2",
        closeOnClickModal: false
      })
        .then(() => {
          this.data.nodeList = this.data.nodeList.filter(function(node) {
            // return node.id !== nodeId
            if (node.id === nodeId) {
              node.show = false;
            }
            return true;
          });
          this.$nextTick(function() {
            console.log("删除" + nodeId);
            this.jsPlumb.removeAllEndpoints(nodeId);
          });
        })
        .catch(() => {});
      return true;
    },
    editNode(nodeId) {
      console.log("编辑节点", nodeId);
      this.nodeFormVisible = true;
      this.$nextTick(function() {
        this.$refs.nodeForm.init(this.getNode(nodeId));
      });
    },
    editLine(conn) {
      var lines = this.jsPlumb.getConnections({
        source: conn.source,
        target: conn.target
      });
      var label = lines[0].getLabel();
      this.lineFormVisible = true;
      this.$nextTick(function() {
        this.$refs.lineForm.init(conn, label);
      });
    },
    editNodeConfirm(node) {
      this.nodeFormVisible = false;
    },
    editLineConfirm(data) {
      let { conn, condition } = data;
      this.lineFormVisible = false;
      this.setLabel(conn, condition);
    },
    fresh() {
      const _this = this;
      this.jsPlumb.reset();
      this.$nextTick(function() {
        _this.loadEasyFlow();
      });
    },
    dataReload(data) {
      this.easyFlowVisible = false;
      // this.data.nodeList = [];
      // this.data.lineList = [];
      // this.$nextTick(() => {
      // 这里模拟后台获取数据、然后加载
      // data = lodash.cloneDeep(data);
      this.easyFlowVisible = true;
      this.data = data;
      this.$nextTick(() => {
        this.jsPlumb = jsPlumb.getInstance();
        this.$nextTick(() => {
          this.jsPlumbInit();
        });
      });
      // });
    },
    // 数据重新载入
    dataReloadA() {
      this.dataReload(getDataA());
    },
    drop(ev) {
      if(this.dialogFormType=="view"){
        return;
      }
      let data = JSON.parse(ev.dataTransfer.getData("data"));
      let moveTarget = JSON.parse(ev.dataTransfer.getData("moveTarget"));
      this.addNode(ev, data, moveTarget);
    },
    dragover(ev) {
      ev.preventDefault();
    },
    // 节点右击事件
    nodeRightClick(data) {
      this.showNodeRightMenu = true;
      const _this = this;
      this.$nextTick(function() {
        $("#nodeRightMenu").css({
          left: data.left,
          top: data.top
        });
        _this.$refs["nodeRightMenu"].setNode(data.node);
      });
    },

    //节点菜单确认事件
    confirmNodeRightMenu(data) {
      const _this = this;
      let { type, node } = data;
      switch (type) {
        case "del":
          _this.deleteNode(node.id);
          break;
        case "edit":
          _this.editNode(node.id);
          break;
        case "expand":
          node.expand = !node.expand;
          this.fresh();
          break;
      }
      this.showNodeRightMenu = false;
    },
    //连线菜单确认事件
    confirmLineRightMenu(data) {
      let { type, conn } = data;
      const _this = this;
      switch (type) {
        case "del":
          _this.jsPlumb.deleteConnection(conn);
          _this.deleteLine(conn.sourceId, conn.targetId);
          break;
        case "edit":
          _this.editLine(conn);
          break;
      }
      this.showLineRightMenu = false;
    },
    //将连线标签加入到数据中
    addLabelToData(conn, label) {
      let flag = false;
      this.data.lineList.forEach(element => {
        flag = element.from == conn.sourceId && element.to == conn.targetId;
        if (flag) {
          element.label = label;
        }
      });
    },
    setLabel(conn, label) {
      var lines = this.jsPlumb.getConnections({
        source: conn.source,
        target: conn.target
      });
      lines[0].setLabel({
        label: label,
        cssClass: "labelClass a b"
      });
      this.addLabelToData(conn, label);
    },
    getFlow() {
      return this.data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
#flowContainer {
  background-image: linear-gradient(
      90deg,
      rgba(12, 211, 248, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(255, 140, 140, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
  height: 500px;
  // background-color: rgb(251, 251, 251);
  /*background-color: #42b983;*/
  position: relative;
}

.labelClass {
  background-color: white;
  padding: 5px;
  opacity: 0.7;
  border: 1px solid #346789;
  /*border-radius: 10px;*/
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.connection-label {
  background-color: #fff;
}
.canvas {
  background: rgba(0, 31, 75, 0.3);
}
</style>

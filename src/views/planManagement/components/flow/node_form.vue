<template>
  <el-dialog
    title="节点信息"
    :close-on-click-modal="false"
    custom-class="el-dialog-sty2 node-form"
    v-dialog-drag="{drag:'.el-dialog__header'}"
    :visible.sync="visible"
    :modal="modal"
  >
    <div class="node-form-wrap">
      <el-form ref="dataForm" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="jsonStr.name"></el-input>
      </el-form-item>
      <el-form-item label="left">
        <el-input v-model="jsonStr.left"></el-input>
      </el-form-item>
      <el-form-item label="top">
        <el-input v-model="jsonStr.top"></el-input>
      </el-form-item>
      <ul class="resource-wrap">
        <li class="resource clearfix" v-for="(data,index) in jsonStr.resourceList">
          <div class="item clearfix">
            <label class="fl" for>资源类型</label>
            <select class="fl" v-model="data.name">
              <option value>请选择----</option>
              <option
                :value="data.value"
                v-for="data in codeTable.listAllResourceType"
              >{{data.value}}</option>
            </select>
          </div>
          <div class="item clearfix">
            <label class="fl" for>资源数量</label>
            <input class="fl" type="text" v-model="data.num" />
          </div>
          <div class="fr btn btn-del" @click="delResource(data.id)">删除资源组</div>
        </li>
        <div class="btn" @click="addResource">添加资源组</div>
      </ul>
      <el-form-item label="资源描述">
        <el-input type="textarea" v-model="jsonStr.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="confirm" size="small" class="theme-btn-kj">取消</el-button>
      <el-button @click="confirm('ok')" size="small" type="primary" class="theme-btn-kj">确定</el-button>
    </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      currentNode: {},
      jsonStr: {
        left: "",
        top: "",
        name: "",
        resourceList: [],
        desc: ""
      },
      codeTable: JSON.parse(localStorage.getItem("planCodeTable")),
      modal: false
    };
  },
  methods: {
    init(data, id) {
      this.visible = true;
      this.currentNode = data;
      this.currentNode["expand"] = true;
      // 赋值
      this.jsonStr.left = this.currentNode.left;
      this.jsonStr.top = this.currentNode.top;
      this.jsonStr.name = this.currentNode.name;
      this.jsonStr.desc = this.currentNode.desc;
      this.jsonStr.resourceList = this.currentNode.resourceList
        ? this.currentNode.resourceList
        : [];
    },
    getIndexOfNodeById(nodeList, id) {
      var target = "";
      for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i]["id"] == id) {
          target = i;
        }
      }
      return target;
    },
    addResource() {
      let temp = {
        id: new Date().getTime() + parseInt(Math.random() * 1000),
        name: "",
        num: ""
      };
      this.jsonStr.resourceList.push(temp);
      this.$forceUpdate();
    },
    delResource(id) {
      this.jsonStr.resourceList.forEach((element, index) => {
        if (element.id == id) {
          this.jsonStr.resourceList.splice(index, 1);
          return;
        }
      });
    },
    confirm(type) {
      this.visible = false;
      if (type != "ok") {
        return;
      }

      // 赋值
      this.currentNode.left = this.jsonStr.left;
      this.currentNode.top = this.jsonStr.top;
      this.currentNode.name = this.jsonStr.name;
      this.currentNode.desc = this.jsonStr.desc;
      this.currentNode.resourceList = this.jsonStr.resourceList;
      this.currentNode.key =
        new Date().getTime() + "" + parseInt(Math.random() * 10000);

      this.$emit("confirm");

      // this.$set(this.currentNode, "data", { desc: this.jsonStr.desc });
    }
  }
};
</script>

<style scoped lang="scss">
.node-form-wrap{
  padding: 20px;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  $height: 32px;
  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }
  .resource-wrap {
    list-style: none;
    padding-left: 0;
    .btn {
      cursor: pointer;
      width: 80px;
      text-align: center;
      margin: 0 auto;
      margin-top: 18px;
      line-height: $height;
    }
    .btn-del {
      margin-top: 0;
    }
    .resource + .resource {
      margin-top: 18px;
    }
    .resource {
      list-style: none;
      .item {
        width: calc(40%);
        float: left;
        label {
          display: block;
          width: 80px;
          padding-right: 12px;
          line-height: $height;
          height: $height;
          text-align: right;
          box-sizing: border-box;
        }
        input,
        select {
          height: $height;
          line-height: $height;
          box-sizing: border-box;
          // border-color: #c0c4cc;
          // color: #606266;
          border-radius: 4px;
          outline: none;
          border-width: 1px;
          padding: 0 15px;
        }
        textarea {
          color: #606266;
        }
      }
    }
  }
}
</style>

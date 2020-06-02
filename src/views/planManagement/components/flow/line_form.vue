<template>
  <el-dialog
    title="判断条件"
    :close-on-click-modal="false"
    :visible.sync="visible"
    custom-class="el-dialog-sty2 line-form"
    v-dialog-drag="{drag:'.el-dialog__header'}"
    :modal="false"
  >
    <div class="line-form-wrap">
      <el-form ref="lineForm" label-width="80px">
      <el-form-item label="条件">
        <el-input v-model="condition"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="confirm" type="primary" size="small" class="theme-btn-kj">取消</el-button>
      <el-button @click="confirm('ok')" type="primary" size="small" class="theme-btn-kj">确定</el-button>
    </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "line_form",
  data() {
    return {
      visible: false,
      condition: "",
      conn: ""
    };
  },
  methods: {
    init(conn, label) {
      this.visible = true;
      this.conn = conn;
      this.condition = label;
    },
    confirm(type) {
      const _this = this;
      this.visible = false;
      if (type != "ok") {
        return;
      }
      this.$emit("confirm", {
        conn: _this.conn,
        condition: _this.condition
      });
    }
  }
};
</script>

<style  lang="scss">
.line-form-wrap {
  padding: 20px;
}
</style>

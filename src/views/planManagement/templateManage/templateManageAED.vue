<template>
  <form
    class="application-wrap wh100 planManageAED"
    ref="form"
    v-view-mode
    :class="{'add':dialogFormType=='add','edit':dialogFormType=='edit','view':dialogFormType=='view'}"
  >
    <div class="w100 content layout-column">
      <div class="column column-2 pr">
        <el-form label-width="120px" class="wh100 clearfix">
          <div class="flow-wrap">
            <flow ref="flow" :dialogFormType="dialogFormType"></flow>
          </div>
        </el-form>
      </div>
    </div>
  </form>
</template>

<script>
import flow from "@views/planManagement/components/flow/flow";
export default {
  components: {
    flow
  },
  mixins: [],
  data() {
    return {
      dialogFormType: "add"
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs["flow"].dataReload({ nodeList: [], lineList: [] });
    }
  }
};
</script>
<style lang="scss">
.planManageAED {
  .flow-wrap {
    height: 800px;
    width: calc(100% - 140px);
    padding-top: 10px;
  }
}
</style>
<style lang="scss" scoped="scoped">
@import "@/styles/variables.scss";
.application-wrap {
  padding: 0 50px;
  padding-top: 40px;
  overflow: auto;
  font-size: 14px;
  .content {
    padding-top: 30px;
    padding-left: 160px;
    min-height: 100%;
    .sub-title {
      left: -176px;
    }
    .condition {
      padding-top: 10px;
      position: relative;
      box-sizing: border-box;
      &:before {
        content: "";
        width: calc(90% - 20px);
        position: absolute;
        left: 20px;
        top: 0;
        border-bottom: 1px dashed #00f8ff;
      }
    }
  }
}
</style>

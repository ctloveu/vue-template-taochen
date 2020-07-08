<template>
  <div class="app-wrapper">
    <div
      class="main-container"
    >
      <AppMain />
    </div>
  </div>
</template>

<script>
import AppMain from "./components/AppMain.vue";

import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    AppMain
  },
  data() {
    return {
      showSideBar: false,
      containerClose: true,
      showNavBar: false
    };
  },
  mixins: [ResizeMixin],
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
$path: "../../../../assets/image/";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: url($path+"login/login_background.jpg") no-repeat;
  background-size: 100% 100%;
  .main-container{
    height: 100%;
  }
}
</style>
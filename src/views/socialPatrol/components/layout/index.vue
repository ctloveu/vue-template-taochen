<template>
  <div class="app-wrapper">
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain } from "./components";

import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    AppMain
  },
  data() {
    return {};
  },
  mixins: [ResizeMixin],
  methods: {},
  mounted() {
    this.setNavBar();
  },
  watch: {
    $route(to, from) {
      this.setNavBar();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
$path: "../../../../../public/image/";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: url($path+"login/login_background.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .main-container {
    height: 100%;
  }
}
</style>

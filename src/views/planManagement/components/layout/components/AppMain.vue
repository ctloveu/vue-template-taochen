<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
	@import "~@/styles/mixin.scss";
 /*fix css style bug in open el-dialog*/

.app-main{
	 height: calc(100% - 50px);
   width: 100%;
   position: relative;
   overflow: hidden;
}

.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

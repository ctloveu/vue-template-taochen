<template>
  <div class="region-map" id="regionMap"></div>
</template>
<script>
import { getOptionMiddle1 } from "./option";

export default {
  props: {
    type: {
      default: "normal"
    }
  },
  components: {},
  data() {
    return {
      typeLevel: {
        一级: 1,
        二级: 2,
        三级: 3,
        四级: 4
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      this.drawMiddle1([])
    },
    drawMiddle1(data) {
      getOptionMiddle1({
        id: "regionMap",
        type: "normal",
        data: data
      });
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>
<style lang='scss'>
.region-map {
  height: calc(100% - 56px);
}
</style>

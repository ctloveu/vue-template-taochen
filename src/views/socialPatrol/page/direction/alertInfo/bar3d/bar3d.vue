<template>
  <div class="bar3d left1" id="left1"></div>
</template>
<script>
import { getOption3d } from './bar3d';
import { parseTime } from '@/utils';

export default {
  name: 'bar3d',
  props: {
    type: {
      default: 'normal'
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {
  },
  methods: {
    getNDays(time, n, flag) {
      (n = n || 7), (flag = flag || 1);
      let dataArray = [];

      let nowDay = new Date(time);
      nowDay.setDate(nowDay.getDate());
      let dateTemp;
      for (let i = 0; i < n; i++) {
        dateTemp = nowDay.getMonth() + 1 + '-' + nowDay.getDate();
        dataArray.push(dateTemp);
        nowDay.setDate(nowDay.getDate() + flag);
      }
      return dataArray;
    },
    init() {
      this.drawBar3d();
    },
    drawBar3d() {
      if (this.left1) {
        this.left1.dispose();
      }
      const _this = this;
      let left1 = (this.left1 = this.$echarts.init(document.getElementById('left1')));
      let promise = new Promise(function(resolve, reject) {
        resolve(getOption3d({ type: _this.type }));
      });
      promise.then(function(option) {
        left1.setOption(option);
      });
    }
  },
  mounted() {},
  watch: {},
  destroyed() {}
};
</script>
<style lang="scss">
.column-1 {
  height: 50%;
}
</style>

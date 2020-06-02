<template>
  <ul class="right-menu">
    <li class="menu_item" @click="operate('edit')">编辑</li>
    <li class="menu_item" @click="operate('del')">删除</li>
  </ul>
</template>
<script>
export default {
  name:"lineRightMenu",
  data() {
    return {
      conn:""
    };
  },
  components: {},
  created() {},
  methods: {
    operate(type) {
      const _this = this;
      this.$emit('confirm',{type:type,conn:_this.conn});
    },
    setConn(conn){
      this.conn = conn;
    }
  }
};
</script>
<style lang="scss" scoped>
.right-menu {
  position: absolute;
  z-index: 1;
  background: #4aafe3;
  color: #fff;
  width: 100px;
  padding: 8px;

  li {
    display: block;
    line-height: 30px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background: #4ae3c9;
    }
  }
}
</style>

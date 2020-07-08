<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    var aaa = window.__gatewayUrl__
    console.log(`网关地址${aaa}`);
  },
  methods: {}
};
</script>

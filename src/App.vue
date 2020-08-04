<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mTable } from "@/mixins"
export default {
  name: "App",
  mixins: [mTable],
  mounted() {
    var aaa = window.__gatewayUrl__
    console.log(`网关地址${aaa}`);
  },
  methods: {}
};
</script>

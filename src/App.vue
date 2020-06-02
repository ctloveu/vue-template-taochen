<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
import {
    upmsApi
} from "@login/api/loginApi.js";
export default {
    name: 'App',
    mounted() {
      this.init();
    },
    methods: {
        init(){
          if(timer){
            clearInterval(timer);
          }
          let timer = setInterval(function(){
            
          },1000)
        },
        async sendHeartBeat(params) {
            let res = await upmsApi.sendHeartBeat(params);
            if (res.code != 0) {
                this.$message.error(res.message);
                return;
            }
        },
    },
}
</script>

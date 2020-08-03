<template>
  <div class="login">
    <div id="particles-js" style="display: flex;align-items: center;justify-content: center"></div>
    <form class="h-center">
      <div class="title">登录</div>
      <div class="clearfix item">
        <label class="fl" for>用户名:</label>
        <input v-model.trim="userName" placeholder="请输入用户名" />
      </div>
      <div class="clearfix item">
        <label class="fl" for>密码:</label>
        <input type="password" v-model.trim="password" placeholder="请输入密码" />
      </div>
      <button class="login-btn" @click.prevent="goLogin">登录</button>
    </form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { setToken } from "@utils";

import "@/assets/js/login/particles";
import { initParticlesJS } from "@/assets/js/login/initParticlesJS";

import { getUserInfo, toMainEntry } from "@/utils"; //获取用户信息等
import { upmsApi as API } from "@views/login/api/loginApi.js";

export default {
  name: "Home",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    goLogin() {
      Message.closeAll();
      // if (!this.userName || !this.password) {
      //   this.$message.error("用户名和密码不能为空！");
      //   return;
      // }
      this.ajaxLogin({
        userName: this.userName,
        password: this.password
      });
    },
    async ajaxLogin(params) {
      // let res = await API.ajaxLogin();
      // if(res.code == 0){}
      getUserInfo(); //userId 根据用户id或者token获取用户信息等
      toMainEntry(this);  //此处必须传入this
    }
  },
  mounted: () => {
    initParticlesJS();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.login {
  position: relative;
  height: 100%;
  width: 100%;
  font-family: "Microsoft Yahei";

  .logo {
    top: 15%;
  }

  canvas {
    display: block;
  }

  #particles-js {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/image/login/login_background.jpg");
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .h-center {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    margin: 0 auto;
  }

  form {
    top: 30%;
    color: #fff;
    background-image: url("../../assets/image/login/form.png");
    background-size: 100%;
    width: 604px;
    height: 389px;
    font-size: 24px;
    padding: 20px;

    .title {
      text-align: center;
      line-height: 70px;
      font-size: 26px;
    }

    label {
      width: 25%;
      text-align: center;
      display: inline-block;
    }

    input {
      width: 60%;
      height: 40px;
      touch-action: manipulation;
      appearance: none;
      -webkit-appearance: none;
      font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont,
        "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
        "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
      font-variant: tabular-nums;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;
      display: inline-block;
      padding: 4px 11px;
      font-size: 14px;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      -webkit-box-shadow: 0 0 15px 15px rgba(80, 172, 248, 0.4) inset;
      box-shadow: 0 0 15px 15px rgba(80, 172, 248, 0.4) inset;
    }

    input::-webkit-input-placeholder {
      color: #000 !important;
    }

    .item {
      margin-top: 30px;
      padding: 0 50px;
    }

    .login-btn {
      width: 140px;
      height: 40px;
      font-size: 16px;
      margin-top: 50px;
      background-image: url("../../assets/image/login//login-btn.png");
      background-size: 100% 100%;
      opacity: 0.91;
      margin: 0 auto;
      display: block;
      outline: 0;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      border: unset;
      margin-top: 50px;
      border-radius: 4px;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>

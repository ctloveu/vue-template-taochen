import { getApiData, allApi, postApiData } from '@/axios/api';
import { login, signInLogin } from '@/settings'
import auth from './auth.js'

function toSignInLogin() {
    const urls = window.btoa(window.location.host + '/#/')
    window.location.href = signInLogin + '?callBackUrl=' + urls
}

export default {
    // 获取用户信息并设置token等
    getUserInfo: (userId, token) => {
        if (token) {
            auth.setToken(token);
        }
        let params = {} // new Object()
        allApi([
            getApiData('url', params),
            postApiData('url', params)
        ]).then(res => {

        }).catch(err => {

        })
    },

    //去单点登录登陆页面(也是退出登录)
    toSignInLogin: toSignInLogin,

    //去登录登陆页面(也是退出登录)
    toLoginPage: function (_this) {   //_this必须手动传入进来,且_this为该项目Vue的实例
        auth.removeCache();  //清楚session等缓存
        if (login && login.unadd) {
            let router = require('@views/' + login.name + '/router/index.js')
            router = router.default || router
            _this.$router.push({
                //跳转到首页
                path: router.path
            });
        } else {
            toSignInLogin()
        }
    },
    // 根据内置模块登录去首页
    toMainEntry: function (_this) {  //_this必须手动传入进来,且_this为该项目Vue的实例
        //跳转到首页
        _this.$router.push({
            path: '/'
        });
    }
}
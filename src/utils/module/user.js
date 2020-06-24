import { getApiData, allApi, postApiData } from '@/axios/api';
import { login, subproject, signInLogin, signInLogout } from '@/settings'
import { setToken, removeCache } from './auth.js'
import { hasPermission } from '../globalFun/groceries.js'

function getFirstHasPermissionRouter(router) {
    // 代表该模块无权限
    if (router.permission && !hasPermission(router.permission)) {
        return ''
    }
    // 递归获取第一个有权限的路由
    let defaultRouter = router.path
    if (router.children && router.children.length > 0) {
        for (let i = 0; i < router.children.length; i++) {
            const element = router.children[i];
            let _defaultRouter = getFirstHasPermissionRouter(element)
            if (_defaultRouter !== '') {
                defaultRouter += _defaultRouter.indexOf('/') === 0 ? _defaultRouter : ('/' + _defaultRouter)
                break
            }
        }
    }
    return defaultRouter
}

// 获取主入口模块的路由
function getEntryRouter() {
    let defaultRouter = ''
    for (let i = 0; i < subproject.length; i++) {
        const element = subproject[i];
        if (element.entry) {
            let router = require('@views/' + element.name + '/router/index.js')
            router = router.default || router
            if (getFirstHasPermissionRouter(router) !== '') {
                defaultRouter = getFirstHasPermissionRouter(router)
                break
            }
        }
    }

    if (defaultRouter === '') {
        for (let i = 0; i < subproject.length; i++) {
            const element = subproject[i];
            if (element.unadd && defaultRouter === '') {
                let router = require('@views/' + element.name + '/router/index.js')
                router = router.default || router
                if (getFirstHasPermissionRouter(router) !== '') {
                    defaultRouter = getFirstHasPermissionRouter(router)
                    break
                }
            }
        }
    }

    return defaultRouter
}

function toSignInLogin() {
    const path = getEntryRouter()
    const _url = path === '' ? '/' : path
    const urls = window.btoa(window.location.host + '/#' + _url)
    window.location.href = signInLogin + '?callBackUrl=' + urls
}

module.exports = {
    // 获取用户信息并设置token等
    getUserInfo: (userId, token) => {
        if (token) setToken(token);
        let params = {} // new Object()
        allApi([
            getApiData('url', params),
            postApiData('url', params)
        ]).then(res => {

        }).catch(err => {

        })
    },
    // 获取首页路fun由
    getEntryRouter: getEntryRouter,

    //去单点登录登陆页面(也是退出登录)
    toSignInLogin: toSignInLogin,

    //去登录登陆页面(也是退出登录)
    toLoginPage: function (_this) {   //_this必须手动传入进来,且_this为该项目Vue的实例
        removeCache();  //清楚session等缓存
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
        const path = getEntryRouter()
        if (path === '') {
            let router = require('@views/' + login.name + '/router/index.js')
            router = router.default || router
            _this.$router.push({
                //跳转到首页
                path: router.path
            });
        }
        _this.$router.push({
            //跳转到首页
            path: path
        });
    }
}
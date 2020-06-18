// 跳转前事件操作
import router from './router'

import { getToken, getPageTitle, getStorage, toLogin, removeCache, setToken } from '@utils'

import { whiteList, login, isProduction } from '@/settings'

import getUserInfo from './getUserInfo.js';  //获取用户信息等

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// 获取登录页面路由
const loginRouter = require('@views/' + login.name + '/router/index.js')
let loginPath = loginRouter.path

router.beforeEach(async (to, from, next) => {
  //进度条开始
  NProgress.start()

  //设置网页title
  document.title = getPageTitle(to.name)

  const hasToken = getToken()
  const userInfo = getStorage('userInfo')

  function endTo() {
    next()
    NProgress.done()
  }

  // if (!isProduction) {  //判断当前环境
  //   endTo()
  //   return
  // }

  if (whiteList.indexOf(to.path) > -1) { //在免登录白名单中，直接进入
    endTo()
    return
  }

  // 判断是否从单点登录跳转过来
  if (!(login && login.unadd)) {
    let userInfoUrl = window.location.href;
    let tokenIndex = userInfoUrl.lastIndexOf('?token=');
    let userIndex = userInfoUrl.lastIndexOf('&userId=');
    if (userIndex > -1) {
      let userId = userInfoUrl.substring(userIndex + 8, userInfoUrl.length);
      let token = userInfoUrl.substring(tokenIndex + 7, userIndex)
      setToken(token);

      getUserInfo(userId, token)  //根据用户id或者token获取用户信息等

      endTo()
      return
    }
  }

  if (!(hasToken && userInfo)) {  //判断是否登录  判断用户信息是否存在  然后跳转到对应登录
    removeCache()   //清除localstorage、cookie和sessionstorage
    if (login && login.unadd) {
      if (to.path !== loginPath) {  //判断用户是否进入的为登录页
        next(`${loginPath}`)
        NProgress.done()
      } else {
        endTo()
      }
      return
    } else {
      toLogin()
    }
  }

  // 使用项目本身登陆  start
  if (login && login.unadd) {
    if (to.path === loginPath) {  //判断用户是否进入的为登录页
      removeCache()  //清除localstorage、cookie和sessionstorage
    }
    endTo()
    return
  }
  // 使用项目本身登陆  end

  // 使用单点登陆跳转 start
  if (to.path !== '/') {
    endTo()
    return
  }
  toLogin();
  // 使用单点登陆跳转 end

})

router.afterEach(() => {
  //完成进度条
  NProgress.done()
})

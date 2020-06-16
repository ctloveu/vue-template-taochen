// 跳转前事件操作
import router from './router'

import {
  getToken,
  getPageTitle,
  getStorage,
  toLogin,
} from '@utils'

import {
  whiteList,
  login,
  isProduction
} from '@/settings'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

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

  if (!isProduction) {  //判断当前环境
    endTo()
    return
  }

  if (whiteList.indexOf(to.path) !== -1) { //在免费登录白名单中，直接进入
    endTo()
    return
  }

  if (!hasToken || !userInfo) {  //判断是否登录  判断用户信息是否存在
    toLogin()
  }

  // 使用项目本身登陆  start
  if (login && login.unadd) {
    if (to.path === '/login') {  //判断用户是否进入的为登录页
      toLogin()
    }
    endTo()
    return
  }  // 使用项目本身登陆  end

  // 使用单点登陆跳转 start
  /* if(to.path === '/mainEntry') {
    let tokenIndex = window.location.href.lastIndexOf('?token=')
    //判断是否成功从单点登陆返回首页
    if(tokenIndex !== -1) {
      next()
    } else {
      if(hasToken) {
        if(userInfo) {
          next()
        } else {
          removeCache();
          toLogin()
        }
      } else {
        toLogin()
      }
    }
  } else { */

  if (to.path !== '/' && userInfo) {
    endTo()
    return
  }

  toLogin();
  /*}*/
  // 使用单点登陆跳转 end
})

router.afterEach(() => {
  //完成进度条
  NProgress.done()
})

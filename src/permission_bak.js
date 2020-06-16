// 跳转前事件操作
import router from './router'

import {
  getToken,
  removeCache,
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

function endDone() {
  return () => {
    next()
    NProgress.done()
  }
}

router.beforeEach(async (to, from, next) => {
  //进度条开始
  NProgress.start()

  //设置网页title
  document.title = getPageTitle(to.name)

  const hasToken = getToken()
  const userInfo = getStorage('userInfo')

  if (!isProduction) {
    endDone()
  }

  if (whiteList.indexOf(to.path) !== -1) { //在免费登录白名单中，直接进入
    endDone()
  }
  //判断用的是哪一个登陆
  if (login && login.unadd) {
    // 使用项目本身登陆  start
    if (hasToken) {
      if (to.path === '/login') {
        next()
      } else {
        if (userInfo) {
          next()
        } else {
          removeCache();
          try {
            next(`/login`)
          } catch (error) {
            next(`/login`)
          }
        }
      }
    } else {
      next()
    }
    // 使用项目本身登陆  end
  } else {
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
    if (hasToken) {
      if (to.path === '/') {
        toLogin()
      } else {
        if (userInfo) {
          next()
        } else {
          removeCache();
          toLogin()
        }
      }
    } else {
      toLogin()
    }
    /*}*/
    // 使用单点登陆跳转 end
  }

  NProgress.done()

})

router.afterEach(() => {
  //完成进度条
  NProgress.done()
})

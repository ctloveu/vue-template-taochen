/**
 * @description 权限控制,根据用户动态添加路由
 * @author 陈涛
 */
import router from './router';

import { getToken, getPageTitle, getStorage, toSignInLogin, removeCache, hasPermission } from '@utils';
import { whiteList, login, mainEntry, getUserInfo } from '@/settings';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

// 判断内部登录模块是否存在
const _loginUnAdd = login && login != '';
var loginPath = '';
if (_loginUnAdd) {
  let loginRouter = require('@views/' + login + '/router.js');
  loginPath = (loginRouter.default || loginRouter).path;
}

let asyncRouter;

go();  //初始化路由一次,避免默认进入路由不为默认页面

router.beforeEach(async (to, from, next) => {
  //进度条开始
  NProgress.start();

  //设置网页title
  document.title = getPageTitle(to.name);

  const hasToken = getToken();
  const userInfo = getStorage('userInfo');
  const hasPermissionList = getStorage('permissions');

  function endTo() {
    next();
    NProgress.done();
  }

  // if (!isProduction) {  //判断当前环境
  //   endTo()
  //   return
  // }

  if (hasPermissionList) {
    if (!asyncRouter) {
      go(to, next);
    }
  }

  if (whiteList.indexOf(to.path) > -1) { //在免登录白名单中，直接进入
    endTo();
    return
  }

  // 判断是否从单点登录跳转过来
  if (!_loginUnAdd) {
    let userInfoUrl = window.location.href;
    let tokenIndex = userInfoUrl.lastIndexOf('?token=');
    let userIndex = userInfoUrl.lastIndexOf('&userId=');
    if (userIndex > -1) {
      let userId = userInfoUrl.substring(userIndex + 8, userInfoUrl.length);
      let token = userInfoUrl.substring(tokenIndex + 7, userIndex);

      getUserInfo(userId, token);  //根据用户id或者token获取用户信息等
      go(to, next);

      endTo();
      return
    }
  }

  if (!(hasToken && userInfo)) {  //判断是否登录  判断用户信息是否存在  然后跳转到对应登录
    removeCache();   //清除localstorage、cookie和sessionstorage
    if (_loginUnAdd) {
      if (to.path !== loginPath) {  //判断用户是否进入的为登录页
        next(`${loginPath}`);
        NProgress.done();
      } else {
        endTo();
      }
      return
    } else {
      toSignInLogin();
    }
  }

  // 使用项目本身登陆  start
  if (_loginUnAdd) {
    if (to.path === loginPath) {  //判断用户是否进入的为登录页
      removeCache();  //清除localstorage、cookie和sessionstorage
    }
    endTo();
    return
  }
  // 使用项目本身登陆  end

  // 使用单点登陆跳转 start
  if (to.path !== '/') {
    endTo();
    return
  }
  toSignInLogin();
  // 使用单点登陆跳转 end

})

router.afterEach(() => {
  //完成进度条
  NProgress.done();
})

function go(to, next) {
  let asyncRouters = filterAsyncRouter();
  router.addRoutes(asyncRouters);
  asyncRouter = true;
  // next({ ...to, replace: true })
}

/**
 * @description 根据权限注入各个模块的路由
 * @returns {arr}
 */
function filterAsyncRouter() {
  const _routes = require.context('./views', true, /\/router\.(js)$/)
  let asyncRouters = addRedirect(_routes.keys().reduce((arr, _dirname) => {
    if (!_loginUnAdd && _dirname.indexOf(login.name) > -1) {
      return arr
    }
    const _config = _routes(_dirname)
    arr.push(_config.default || _config)
    return arr
  }, []), 0);
  if (mainEntry && mainEntry != '') {
    let mainRoute = require('@views/' + mainEntry + '/router.js');
    mainRoute = mainRoute.default || mainRoute
    asyncRouters.push({
      path: '',
      redirect: mainRoute.path
    })
  } else {
    asyncRouters.push({
      path: '',
      redirect: asyncRouters[0].path
    })
  }
  return asyncRouters
}

/**
 * @description 添加模块的路由默认界面 若涉及到权限 permission中可动态更改路由
 * @param {arr} router 
 * @param {num} level 
 * @returns {arr}
 */
function addRedirect(router, level) {
  let _arr = router.reduce((arr, element) => {
    let _permission = !element.permission || hasPermission(element.permission)  //判断是否存在权限值和是否有该权限
    if (!_permission) {
      return arr;
    }
    if (element.children && element.children.length > 0) {  //当存在下级路由 进行递归
      let children = addRedirect(element.children, 1);
      if (children.length > 0) {  //判断下级是否存在有权限的路由
        element.children = children;
        arr.push(element);
      }
      return arr;
    }
    arr.push(element);
    return arr;
  }, []);

  if (_arr.length > 0 && level > 0) { //判断是否为顶层路由,顶层路由不添加默认路径
    _arr.push({
      path: '',
      redirect: _arr[0].path
    });
  }
  return _arr;
}
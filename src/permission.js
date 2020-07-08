// 跳转前事件操作
import router from './router';

import { getToken, getPageTitle, getStorage, toSignInLogin, removeCache, hasPermission } from '@utils';
import { whiteList, login, subproject, isProduction, getUserInfo } from '@/settings';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

// 判断内部登录模块是否存在
const _loginUnAdd = login && login.unadd;
var loginRouter = {}, loginPath = '';
if (_loginUnAdd) {
  loginRouter = require('@views/' + login.name + '/router/index.js');
  loginRouter = loginRouter.default || loginRouter;
}
if (loginRouter && loginRouter.path) {
  loginPath = loginRouter.path;
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
  let asyncRouter = filterAsyncRouter();
  router.addRoutes(asyncRouter);
  asyncRouter = true;
  // next({ ...to, replace: true })
}

function filterAsyncRouter() {
  /* 根据权限注入各个模块的路由 */
  return addRedirect(subproject.reduce((arr, item) => {
    if (item.entry || item.unadd) {
      let router = require('@views/' + item.name + '/router/index.js');
      arr.push(router.default || router);
    }
    return arr
  }, []));
}

// 添加模块的路由默认界面 若涉及到权限 permission中可动态更改路由
function addRedirect(router) {
  if (router.children && router.children.length > 0) {
    return arr; //判断是否存在下级路由
  }
  let _arr = router.reduce((arr, element) => {
    let _permission = !element.permission || hasPermission(element.permission)  //判断是否存在权限值和是否有该权限
    if (!_permission) {
      return arr;
    }
    if (element.children && element.children.length > 0) {  //当存在下级路由 进行递归
      let children = addRedirect(element.children);
      if (children.length > 0) {  //判断下级是否存在有权限的路由
        element.children = children;
        arr.push(element);
        return arr;
      }
    }
    arr.push(element);
    return arr;
  }, []);

  if (_arr.length > 0) {
    _arr.push({
      path: '',
      redirect: _arr[0].path
    }); //添加默认进入路由
  }
  return _arr;
}
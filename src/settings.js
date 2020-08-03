module.exports = {
  /* 项目title			---require* */
  title: 'vue-taochen',

  /*
   * @type {boolean} true | false
   * @description Whether fix the header  //暂时没有用到
   */
  fixedHeader: false,

  /* 端口号       ---unrequire* */
  devPort: 9528,

  /* 调试ip       ---unrequire*  */
  devIp: 'localhost', //

  /* 获取项目环境 */
  isProduction: process.env.NODE_ENV === 'production',

  /* 接口代理    ---require*  */
  proxy: {
    '^/api': {
      target: 'http://10.2.104.157:26350/',
      ws: true,
      // changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
  },

  /* 免登陆白名单页面,免登陆白名单路由不能设置权限 */
  whiteList: ['/mainEntry', '/components'],

  /*  登陆模块(和单点登陆存一)  */
  login:  'login',

  // 主项目项目名称
  mainEntry: 'mainEntry',

  /* 单点登陆(和单点登陆存一)--服务器 */
  signInLogin: 'https://cn.vuejs.org/v2/guide/reactivity.html',

  /* 单点登出--服务器 */
  signInLogout: ''
}

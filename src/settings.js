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

  /* 免登陆白名单页面 */
  whiteList: ['/mainEntry'],

  /*
   * 项目配置
   * @name 	 @description子项目名       命名和项目文件夹名字必须保持一致     --require*
   * @unadd	 @description是否添加路由	    --require*
   */

  /* 入口模块  name的值和入口项目路由值保持一致  */
  entry: {
    name: 'mainEntry',
  },

  /*  登陆模块(和单点登陆存一)  */
  login: {
    name: 'login',
    unadd: true
  },

  /* 单点登陆(和单点登陆存一)--服务器 */
  fhzzLogin: '',

  /* 单点登出--服务器 */
  fhzzLogout: '',

  /* 子模块  */
  subproject: [
    {
      name: 'planManagement', //简单流程
      unadd: true,
    },
    {
      name: 'socialPatrol', //可视化
      unadd: true
    }
  ],
}

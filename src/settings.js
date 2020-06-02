module.exports = {

  /*
   * 项目title			---require*
   */
  title: 'vue-taochen',

  /*
   * @type {boolean} true | false
   * @description Whether fix the header  //暂时没有用到
   */
  fixedHeader: false,

  /*
   * 免登陆白名单页面
   */
  whiteList: ['/chat',
    '/mainEntry',
    '/planManagement/planManage',
    '/njtjDutyDemo/patrolManage/dutyManage/duty',
    '/njtjDutyDemo/patrolVisualization',
  ],  //

  /*
   * 接口    ---require*
   */
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

  /*
   * 端口号       ---unrequire*
   */
  devPort: 9528,

  /*
   * 调试ip       ---unrequire*
   */
  devIp: 'localhost', //

  /*
   * 项目配置
   * @name 	@description子项目名       命名和项目文件夹名字必须保持一致     --require*
   * @router	@description子项目路由配置文件夹名称  默认 router
   * @unadd	@description是否添加到主项目中	    --require*
   */

  /*
   * 入口项目  name的值和入口项目路由值保持一致
   */
  entry: {
    name: 'mainEntry',
    router: '',
  },

  /*
   * 登陆子项目(和单点登陆存一)
   */
  login: {
    name: 'login',
    router: '',
    unadd: true
  },

  /*
   * 单点登陆(和单点登陆存一)--服务器
   */
  fhzzLogin: '',
  /*
   * 单点登出--服务器
   */
  fhzzLogout: '',

  /*
   * 子项目
   */
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

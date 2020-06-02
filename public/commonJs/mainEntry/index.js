/*
 * menuDatas的长度建议为单数个
 *
 * @typeUrl 链接类型
 * 	1. sub子项目路由
 * 	2. sub_blank子项目路由(新开窗口)
 *  3. url外部链接
 *  4. children  存在子模块,不做跳转,显示子模块
 * 		@children--@typeUrl的类型
 * 			4.1 sub子项目路由
 * 			4.2 sub_blank子项目路由(新开窗口)
 * 			4.3 url外部链接
 */

export const menuDatas = {
  width: 100,
  height: 100,
  data: [{
    name: '模块1',
    x: 320,
    y: 30,
    defaultx: 320,
    defaulty: 30,
    classIndex: 0,
    typeUrl: 'sub',
    children: [{
      name: '百度',
      image: 'menuItem2',
      typeUrl: 'url',
      url: 'https://www.baidu.com/',
    }, {
      name: '专题库',
      image: 'menuItem7',
      typeUrl: 'sub_blank',
      url: '/dashboardProject/thematicLibrary'
    }]
  },
  {
    name: '简单流程',
    x: 170,
    y: 420,
    defaultx: 170,
    defaulty: 420,
    classIndex: 1,
    typeUrl: 'sub',
    children: [{
      name: '简单流程',
      image: 'menuItem5',
      typeUrl: 'sub_blank',
      url: '/planManagement'
    }, {
      name: '斗鱼',
      image: 'menuItem3',
      typeUrl: 'url',
      url: 'https://www.douyu.com/'
    }]
  },
  {
    name: '模块3',
    x: 592,
    y: 550,
    defaultx: 592,
    defaulty: 550,
    classIndex: 2,
    typeUrl: 'sub',
    children: []
  },
  {
    name: '模块4',
    x: 864,
    y: 60,
    defaultx: 864,
    defaulty: 60,
    classIndex: 3,
    typeUrl: 'sub',
    children: [{
      name: '淘宝',
      image: 'menuItem0',
      typeUrl: 'none'
    }]
  },
  {
    name: 'app',
    x: 864,
    y: 30,
    defaultx: 864,
    defaulty: 60,
    classIndex: 4,
    typeUrl: 'sub',
    children: []
  },
  ]
}

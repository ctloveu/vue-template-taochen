import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _routes = require.context('../views', true, /\[index].(js)$/)  //[router]\/[index]
console.log(_routes.keys())

/*
 * 所有页面路由建议使用懒加载,除首页外
 * 懒加载会使页面加载的时候出现短暂空白，页面内容过多时不建议懒加载
 */
var constantRoutes = [{
	path: '/404',
	component: (resolve) => require(['@views/404'], resolve),
},
// 全局组件描述页面路由
{
	path: '/components',
	component: (resolve) => require(['@/components/componentDescription.vue'], resolve),
	name: '全局组件',
},
	/*{   //勿删
	  path: '/',
	  component: Layout,
	  redirect: '/' + tradeRoutes[0].path,
	  children: [
	  	...tradeRoutes,
	  ]
	},*/
]

//导入模块路由
import { login, entry, subproject } from '@/settings'

/*
 *登录
 */
if (login && login.unadd) {
	let login_obj = require('@views/' + login.name + '/router/index.js');
	constantRoutes.push(login_obj)

	constantRoutes.push({
		path: '',
		redirect: login_obj.path,
	})
}

/*
 *注入首页
 */
if (entry) {
	let entry_obj = require('@views/' + entry.name + '/router/index.js');
	constantRoutes.push(entry_obj)
}

/*
 *注入各个模块的路由
 */
for (var i = 0; i < subproject.length; i++) {
	if (subproject[i].unadd) {
		let obj = require('@views/' + subproject[i].name + '/router/index.js');
		constantRoutes.push(obj)
	}
}

/*
 * 404 page must be placed at the end !!!
 */
const errPage = {
	path: '*',
	redirect: '/404'
}
//  constantRoutes.push(errPage)

const createRouter = () => new Router({
	//  mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
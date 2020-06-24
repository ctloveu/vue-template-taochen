/*
 *	路由规定和标准
 *  禁止子模块路由添加 redirect  --- 会导致控制权限困难
 *  例：
 *  {   
        path: '',
        redirect: 'templateManage-AED',
	}
	统一在以下和动态添加路由处添加，方便权限控制

 *	子模块导出方式需为以下两种
 *  export default {}  module.exports = {}
 * 
 */



import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const _routes = require.context('../views', true, /\[index].(js)$/)  //[router]\/[index]
// console.log(_routes.keys())

/*
 * 所有页面路由建议使用懒加载,除首页外
 * 懒加载会使页面加载的时候出现短暂空白，页面内容过多时不建议懒加载
 */
var globalRoutes = [
	// 	{
	// 	path: '/404',
	// 	component: (resolve) => require(['@views/404'], resolve),
	// },
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
import { login, subproject } from '@/settings'

/*
 *登录
 */
if (login && login.unadd) {
	let router = require('@views/' + login.name + '/router/index.js');
	router = router.default || router
	globalRoutes.push(router)

	globalRoutes.push({
		path: '',
		redirect: router.path,
	})
}

// 添加模块的路由默认界面 若涉及到权限 permission中可动态更改路由
function addRedirect(router) {
	if (router.children && router.children.length > 0) {
		router.children.push({
			path: '',
			redirect: router.children[0].path,
		})
		for (let i = 0; i < router.children.length; i++) {
			let element = router.children[i];
			if (element.children && element.children.length > 0) addRedirect(router.children[i])
		}
	}
	return router
}

/*
 *注入各个模块的路由
 */
for (var i = 0; i < subproject.length; i++) {
	if (subproject[i].entry || subproject[i].unadd) {
		let router = require('@views/' + subproject[i].name + '/router/index.js');
		router = router.default || router
		globalRoutes.push(addRedirect(router))
		// if (subproject.entry){}
	}
}

/*
 * 404 page must be placed at the end !!!
 */
const errPage = {
	path: '*',
	redirect: '/404'
}
//  globalRoutes.push(errPage)

const createRouter = () => new Router({
	//  mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: globalRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
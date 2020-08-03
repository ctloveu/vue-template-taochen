/**
 *	@description 
 *	路由规定和标准
 *  禁止子模块路由添加 redirect  --- 会导致控制权限困难
 *  例：{   
 *       path: '',
 *       redirect: 'templateManage-AED',
 *	    }
 *	统一在以下和动态添加路由处添加，方便权限控制
 *
 * @author 陈涛
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
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
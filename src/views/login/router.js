// const router = {
// 	path: '/login',
// 	component: (resolve) => require(['@login/login.vue'],resolve),
// }

// export default router

module.exports = {
	path: '/login',
	component: (resolve) => require(['@views/login/login.vue'],resolve),
}
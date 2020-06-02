// const router = {
// 	path: '/mainEntry',
// 	component: () => import('@mainEntry/page/zafkIndex.vue'),
// }

// export default router

module.exports = {
	path: '/mainEntry',
	component: () => import('@mainEntry/page/zafkIndex.vue'),
}
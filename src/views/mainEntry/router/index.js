// export default {
// 	path: '/mainEntry',
// 	component: () => import('@mainEntry/page/zafkIndex.vue'),
// }

// module.exports = {
// 	path: '/mainEntry',
// 	component: () => import('@mainEntry/page/zafkIndex.vue'),
// }

const router = {
	path: '/mainEntry',
	component: () => import('@mainEntry/page/zafkIndex.vue'),
}

export default router
// 获取用户信息，码表，权限值等 需要全部获取才能跳转页面

import { getApiData, allApi, postApiData } from '@/axios/api';

export default function (userId, token) {
	let params = {} // new Object()
	allApi([
		getApiData('url', params),
		postApiData('url', params)
	]).then(res => {

	}).catch(err => {

	})
}
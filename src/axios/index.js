import axios from 'axios';
import { toLogin, getToken, removeCache } from '@/utils'
import { Message } from 'element-ui'

const axoiosInstance = axios.create({
	crossDomain: true,
	headers: {
		// "X-Requested-With": "XMLHttpRequest",
		// 'Access-Control-Allow-Origin': '*',
		// 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE',
		// 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, token',
		// 'Access-Control-Allow-Credentials': true,
		// 'Content-Type': 'application/json;charset=UTF-8',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	withCredentials: true,
});

//"X-Requested-With": "XMLHttpRequest"
// http request interceptor
axoiosInstance.interceptors.request.use(function (config) {
	config.headers["AuthorizationToken"] = getToken()
	if (localStorage.getItem("userInfo")) {
		config.headers["userInfo"] = localStorage.getItem("userInfo");
	}
	if (localStorage.getItem("JSESSIONID")) {
		config.headers["JSESSIONID"] = localStorage.getItem("JSESSIONID");
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

axoiosInstance.interceptors.response.use(function (response) {
	let code = response.data.code
	switch (code) {
		case 0:
			break;
		case 1000000:
			Message({
				message: '登陆过期,请重新登陆!',
				type: "warning"
			});
			setTimeout(function () {
				removeCache()
				toLogin()
			}, 500);
			break;
		default:
			console.error(`${response.config.url}接口错误:${response.data.message}`)
	}
	return response;
}, function (err) {
	const status = err && err.response && err.response.status;
	if (status) {
		let msg = ""
		switch (err.response.status) {
			case 401:
				msg = "无权限"
				break;
			case 404:
				msg = "请求资源未找到"
				break;
			case 500:
				msg = "服务器异常"
				break;
			case 40199:
				//当登陆信息过期时,跳转到登陆页面
				msg = "登陆信息过期"
				Message({
					message: msg,
					type: "warning"
				});
				setTimeout(function () {
					removeCache()
					toLogin()
				}, 500);
				break;
			default:
				msg = err.response.data
				break;
		}
		console.log(msg) //打印错误
	} else {
		console.log('无返回状态！')
	}
	return Promise.reject(err);
});

// http request
const $axios = function (url, method, params, setting) {
	return new Promise((resolve, reject) => {
		Object.assign(axoiosInstance.defaults, setting)
		axoiosInstance[method](url, params || {}).then((response) => {
			if (response.status === 200) {
				resolve(response.data);
			}
		}).catch((error) => {
			//			reject(error);  //注释掉后不知道会造成怎样的影响，但是去掉了浏览器打印的错误
		});
	});
};

export default $axios;

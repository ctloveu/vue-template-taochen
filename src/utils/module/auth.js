//module.exports = {}方式导出 单个文件需统一导出方式

import Cookies from 'js-cookie'

const TokenKey = 'token'

export default {
	getToken: () => {
		Cookies.get(TokenKey)
	},
	_getCookie: (name) => {
		Cookies.get(name)
	},
	setToken: (token) => {
		Cookies.set(TokenKey, token)
	},
	removeToken: () => {
		Cookies.remove(TokenKey)
	},
	removeCache: () => {
		sessionStorage.clear()
		localStorage.clear()
		Cookies.remove(TokenKey)
	}
}

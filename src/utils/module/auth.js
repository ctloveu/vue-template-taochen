import Cookies from 'js-cookie'

const TokenKey = 'token'

module.exports = {
	getToken: () => {
		return Cookies.get(TokenKey)
	},
	_getCookie: (name) => {
		return Cookies.get(name)
	},
	setToken: (token) => {
		return Cookies.set(TokenKey, token)
	},
	removeToken: () => {
		return Cookies.remove(TokenKey)
	},
	removeCache: () => {
		sessionStorage.clear()
		localStorage.clear()
		return Cookies.remove(TokenKey)
	}
}

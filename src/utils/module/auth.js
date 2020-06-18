import Cookies from 'js-cookie'

const TokenKey = 'token'

module.exports = {
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

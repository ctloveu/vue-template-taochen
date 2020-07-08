// 若配置文件放在该处,每次修改或切换接口需重新打包

//后台接口网关地址
const gatewayUrl = "url"

//mq  ***组件销毁之前断开mq  类似websocket
const mq = {
	ws: 'ws://' + 'url',
	userName: 'admin',
	passcode: 'admin'
}

export {
	gatewayUrl,
	mq
}

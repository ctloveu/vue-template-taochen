// 不用var声明的变量都会挂载都window下, 实际是创建了一个全局对象的属性, 该变量时可以删除的
//后台接口网关地址
__gatewayUrl__ = "url"

_baseBackApiUrl_ = {
    api1: __gatewayUrl__ + 'baidu',
    api2: __gatewayUrl__ + 'huya',
}

//mq  ***组件销毁之前断开mq  类似websocket
_mq_ = {
    ws: 'ws://' + 'url',
    userName: 'admin',
    passcode: 'admin'
}

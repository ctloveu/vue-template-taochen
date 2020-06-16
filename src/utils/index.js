
// 暴露全部功能函数，直接import { funtion_name} from '@utils'可引用

const requireFun = require.context('./', true, /\.(js)$/)

var objFun = {}
var isRequired = {}; //用于判断是否注册过相同的组件名

requireFun.keys().forEach(__dirname => {
    // 获取组件的配置
    let _config = requireFun(__dirname)
    _config = _config.default || _config  //export default 和 module.exports

    if (__dirname !== './index.js' && __dirname !== './global-f.js') {  //全局函数统一暴露 + 功能函数暴露
        Object.keys(_config).forEach(_apiName => {
            if (!isRequired[_apiName]) {
                objFun[_apiName] = _config[_apiName]
                isRequired[_apiName] = {
                    isRequired: true,
                    __dirname: __dirname
                }
            } else {
                // 给与命名冲突提示
                console.error(`${_config[_apiName]}\n函数命名冲突!\nold_function文件：${isRequired[_apiName].__dirname}\nnew_function：${__dirname}`)
            }
        })
    }  
})

isRequired = null  //手动清空变量

module.exports = objFun
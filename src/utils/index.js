
/* 
 *暴露全部功能函数，直接import { funtion_name} from '@utils'可引用
 *import和module.exports不能再同一个文件使用
 *原因：https://www.cnblogs.com/qingqingzou-143/p/7028683.html
 * 
 *单个模块导出方式有以下四种
 * module.exports =  {}
 * export default {}
 * export function funcName()
 * export { funcName }
 */
const requireFun = require.context('./', true, /\.(js)$/);

var objFun = {};
var isRequired = {}; //用于判断是否注册过相同的组件名

/**
 * 注入全局暴露函数
 */
try {
    const libraryUntils = require('@library/untils')
    Object.assign(objFun, libraryUntils)
    Object.keys(libraryUntils).forEach(_apiName => {
        isRequired[_apiName] = {
            isRequired: true,
            __dirname: "common-frontend全局函数"
        };
    })
} catch (error) {
    console.error(`公共库全局暴露函数引入失败`)
}

requireFun.keys().forEach(__dirname => {
    // 获取组件的配置
    let _config = requireFun(__dirname);
    _config = _config.default || _config;

    if (__dirname !== './index.js' && __dirname !== './global-f.js') {  //全局函数统一暴露 + 功能函数暴露
        Object.keys(_config).forEach(_apiName => {
            if (!isRequired[_apiName]) {
                objFun[_apiName] = _config[_apiName];
                isRequired[_apiName] = {
                    isRequired: true,
                    __dirname: __dirname
                };
            } else {
                // 给与命名冲突提示
                console.error(`${_config[_apiName]}\n函数命名冲突!\nold_function文件：${isRequired[_apiName].__dirname}\nnew_function：${__dirname}`);
            }
        })
    }
});

isRequired = null;  //手动清空变量

module.exports = objFun;
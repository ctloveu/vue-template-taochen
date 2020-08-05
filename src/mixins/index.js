
/** 
 * @file mixins出口文件
 * @author 陈涛
*/
var objFun = {};
var isRequired = {}; //用于判断是否注册过相同的组件名

/**
 * 注入公共库mixins
 */
try {
    const libraryMixins = require('@library/mixins')
    addMixins(libraryMixins.default || libraryMixins)
} catch (error) {
    console.error(`公共库mixins引入失败`)
}

const requireFun = require.context('./', true, /\.(js)$/);
addMixins(requireFun)

isRequired = null;  //手动清空变量

/**
 * 获取正确的文件名
 * @param {str} __filename 
 * @returns {str}
 */
function getFileName(__filename) {
    if (__filename.lastIndexOf('/') > -1) {
        let fileArr = __filename.split('/')
        let lastName = fileArr.pop(); //pop() 方法用于删除并返回数组的最后一个元素。
        //判断是否把组件名称命名为index.js 若是则返回index目录名称为__filename
        return lastName === 'index' ? fileArr.pop() : lastName
    }

    return __filename
}

function addMixins(requireFun) {
    requireFun.keys().forEach(__dirname => {
        // 获取组件的配置
        let _config = requireFun(__dirname);
        _config = _config.default || _config;
        if (__dirname !== './index.js') {
            const fileName = getFileName(__dirname.replace(/^\.\/(.*)\.\w+$/, '$1'))
            if (!isRequired[fileName]) {
                objFun[fileName] = _config
                isRequired[fileName] = {
                    isRequired: true,
                    __dirname: __dirname
                }
            } else {
                console.error(`${fileName}\nmixins命名冲突!\n公共库位置：${isRequired[fileName].__dirname}\n冲突位置：${__dirname}`);
            }
        }
    });
}

module.exports = objFun;
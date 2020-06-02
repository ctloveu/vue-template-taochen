// 全局组件注册
import Vue from 'vue';

// 处理首字母为大写  abc => Abc
function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 驼峰命名<=中横线命名
function camelCase(name) {
    const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    const MOZ_HACK_REGEXP = /^moz([A-Z])/;
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

// 获取正确的文件名
function getFileName(__filename) {
    if (__filename.lastIndexOf('/') > -1) {
        let fileArr = __filename.split('/')
        let lastName = fileArr.pop(); //pop() 方法用于删除并返回数组的最后一个元素。
        //判断是否把组件名称命名为index.vue 若是则返回index目录名称为__filename
        return lastName === 'index' ? fileArr.pop() : lastName
    }

    return __filename
}

function addComponent(requireComponent) {
    var components = {}; //用于判断是否注册过相同的组件名
    requireComponent.keys().forEach(__filename => {
        // 获取组件的配置
        let _config = requireComponent(__filename)
        // console.log(_config)

        let componentName = upperFirst(
            // 剥去文件名开头的 `./` 和结尾的扩展名
            camelCase(
                getFileName(
                    __filename.replace(/^\.\/(.*)\.\w+$/, '$1')
                )
            )
        )

        if (!components[componentName]) {
            components[componentName] = true;
            
            Vue.component(componentName,
                // 如果这个组件选项是通过 `export default` 导出的，
                // 那么就会优先使用 `.default`，
                // 否则回退到使用模块的根。
                _config.default || _config)
        }
        // console.log('componentName:' + componentName)
    })
}

/*
    require.context(arg1, arg2, arg3)
        arg1 - 读取文件的路径
        arg2 - 是否遍历文件的子目录
        arg3 - 匹配文件的正则
 */

const requireComponent = require.context('./', true, /\.(vue)$/)
// console.log(requireComponent.keys())

addComponent(requireComponent)

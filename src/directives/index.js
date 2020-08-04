// 全局指令注册 自动化添加该目录下所有指令
import Vue from 'vue';

var components = {}; //用于判断是否注册过相同的组件名

// 获取正确的文件名
function getFileName(__dirname) {
    if (__dirname.lastIndexOf('/') > -1) {
        let fileArr = __dirname.split('/')
        let lastName = fileArr.pop(); //pop() 方法用于删除并返回数组的最后一个元素。
        //判断是否把组件名称命名为index.vue 若是则返回index目录名称为__dirname
        return lastName === 'index' ? fileArr.pop() : lastName
    }

    return __dirname
}

function addDirectives(requireDirectives) {
    requireDirectives.keys().forEach(__dirname => {
        // 获取组件的配置
        let _config = requireDirectives(__dirname)

        if (__dirname !== './index.js') {
            let directiveName = getFileName(__dirname.replace(/^\.\/(.*)\.\w+$/, '$1'))

            if (!components[directiveName]) {
                components[directiveName] = true;

                Vue.directive(directiveName, {
                    ..._config.default || _config
                })
            }
        }
    })
}

try {
    const libraryDirectives = require('@library/directives')
    addDirectives(libraryDirectives.default || libraryDirectives)
} catch (error) {
    console.error(`公共库directives引入失败`)
}

/*
    require.context(arg1, arg2, arg3)
        arg1 - 读取文件的路径
        arg2 - 是否遍历文件的子目录
        arg3 - 匹配文件的正则
 */
const requireDirectives = require.context('./', true, /\.(js)$/)
addDirectives(requireDirectives)

components = null
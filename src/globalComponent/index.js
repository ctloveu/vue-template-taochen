/**
 * @file 全局组件注册入口文件
 * @author 陈涛
 */

import Vue from 'vue';
import { toUpperCaseFirst, camelCase } from "@/utils"

/**
 * 获取正确的文件名
 * @param {str} __filename 
 * @returns {str}
 */
function getFileName(__filename) {
    if (__filename.lastIndexOf('/') > -1) {
        let fileArr = __filename.split('/')
        let lastName = fileArr.pop(); //pop() 方法用于删除并返回数组的最后一个元素。
        //判断是否把组件名称命名为index.vue 若是则返回index目录名称为__filename
        return lastName === 'index' ? fileArr.pop() : lastName
    }

    return __filename
}

var components = {}; //用于判断是否注册过相同的组件名

/**
 * 注册为全局组件
 * @param {类数组} requireComponent 
 */
function addComponent(requireComponent) {
    requireComponent.keys().forEach(__filename => {
        // 获取组件的配置
        let _config = requireComponent(__filename)

        let componentName = toUpperCaseFirst(
            // 剥去文件名开头的 `./` 和结尾的扩展名 -- 组件的命名规则
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
        }else{
            console.error(`${componentName}：已存在同名组件`)
        }
    })
}

try {
    const libraryComponent = require('@library/globalComponents')
    addComponent(libraryComponent.default || libraryComponent)
} catch (error) {
    console.error(`载入公共库全局组件失败`)
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

components = null  //手动清楚components
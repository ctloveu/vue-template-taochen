/*
 *1.注入全局函数时注意箭头函数和非箭头函数的区别
 */
const requireFun = require.context('./globalFun/', true, /\.(js)$/)

export default function (Vue, optonis) {
  // 该位置最好一个函数都不去写

  /*
   * 判断值是否存在或者为undefined等
   */
  Vue.prototype.isNull = function (v) {
    return (v || v == '' || v == undefined || v == null || v == 'null') ? true : false
  }

  /*
   * 转换数据未百分比
   */
  Vue.prototype.toPercent = function (v) {
    return v == 0 ? 0 : Number(v * 100).toFixed(2) + '%'
  }

  /*
   * 获取对象的长度
   */
  Vue.prototype.getObjL = function (v) {
    return Object.getOwnPropertyNames(v).length
  }

  // 自动化构建注入全局函数
  var isPrototype = {}

  requireFun.keys().forEach(__dirname => {
    // 获取组件的配置
    let _config = requireFun(__dirname)

    Object.keys(_config).forEach(_apiName => {
      if (!isPrototype[_apiName]) {
        Vue.prototype[_apiName] = _config[_apiName]
        isPrototype[_apiName] = {
          isPrototype: true,
          __dirname: __dirname
        }
      } else {
        // 给与命名冲突提示
        console.log('该全局函数命名冲突!')
        console.log('old_function文件：' + isPrototype[_apiName].__dirname)
        console.log('new_function：' + __dirname)
      }
    })
  })

  isPrototype = null  //手动清空变量
}


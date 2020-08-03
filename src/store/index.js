/**
 * @file store主入口
 * @author 陈涛
 */

import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

var objStore = {}

// 自动构建module的store
const requireStore = require.context('./modules', true, /\.(js)$/)
requireStore.keys().forEach(__dirname => {
  let _config = requireStore(__dirname)
  objStore[__dirname.replace(/^\.\/(.*)\.\w+$/, '$1')] = _config.default || _config
})

// 自动构建各个功能模块的store
const moduleStore = require.context('../views', true, /\/store\.(js)$/)
moduleStore.keys().forEach(__dirname => {
  let _config = moduleStore(__dirname)
  objStore[__dirname.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0]] = _config.default || _config
})

let store = {
  modules: {
    ...objStore
  }
}

// 导入公共库store,需判断参数是否存在
try {
  const libraryStore = require('@library/store.js')
  if (libraryStore.state) {
    Object.assign(store.state, libraryStore.state)
  }
  if (libraryStore.getters) {
    Object.assign(store.getters, libraryStore.getters)
  }
  if (libraryStore.actions) {
    Object.assign(store.actions, libraryStore.actions)
  }
  if (libraryStore.mutations) {
    Object.assign(store.mutations, libraryStore.mutations)
  }
} catch (err) {
  console.error(`公共库store导入失败`)
}

export default new Vuex.Store(store)
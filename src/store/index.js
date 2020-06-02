import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'

// 自动化构建store
const requireStore = require.context('./modules', true, /\.(js)$/)
var objStore = {}

requireStore.keys().forEach(__dirname => {
  let _config = requireStore(__dirname)
  let obj = {}
  obj[__dirname.replace(/^\.\/(.*)\.\w+$/, '$1')] = _config.default || _config
})

const store = new Vuex.Store({
  modules: {
    ...objStore
  },
  getters
})

export default store
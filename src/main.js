/**
 * @file 项目入口文件
 * @description: 注意引入的顺序
 * @author 陈涛
 */
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

// 路由权限控制
import '@/permission';

// 样式导入
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
Vue.use(ElementUI, {
	locale
});

// font-awesome字体图标
import 'font-awesome/css/font-awesome.css';

/** 
 * @description: 注入公共库内容
 */

import '@/styles/index.scss'; // global css 全局样式最后注入较好

/**
 * 引入全局icon-svg组件
 * @description: import是静态引入的,不能在try中使用
 */
// import Icon from 'vue-svg-icon/Icon.vue'
try {
	const Icon = require('vue-svg-icon/Icon.vue')
	Vue.component('Icon', Icon.default || Icon)
} catch (error) {
	console.error(`全局SVG组价注入失败,检测当前SVG子仓库是否引入到项目`)
}

// 引入echarts
import echarts from 'echarts';
import "echarts-gl";
Vue.prototype.$echarts = echarts;

// 全局引入stomp.js
import Stomp from "@/assets/js/websocket/stomp.js";
Vue.prototype.$Stomp = Stomp;

import jquery from 'jquery';
window.$ = jquery;
window.jQuery = jquery;

//引入时间组件
import moment from "moment";
Vue.prototype.$moment = moment;

// 注入全局组件
import '@globalComponent';

//注入全局自定义功能函数
import fun from '@utils/global-f.js';
Vue.use(fun);

//注入全局自定义指令
import '@/directives';

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

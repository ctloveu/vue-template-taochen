import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

import '@/permission'; // permission control

// 样式导入
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
Vue.use(ElementUI, {
	locale
});

import 'font-awesome/css/font-awesome.css';

import '@/styles/index.scss'; // global css 全局样式最后注入较好

import '@/icons'; // icon

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

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

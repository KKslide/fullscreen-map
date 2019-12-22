import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex';
Vue.use(Vuex);

import $ from "jquery"
import jqCircle from "jquery-circle-progress"

import setCarousel from './js/setCarousel';
Vue.prototype.$setCarousel = setCarousel;

Vue.prototype.$axios = axios

Vue.config.productionTip = false;

// 引入echarts 其它组件使用 this.$echarts
// import echarts from 'echarts';
// import 'echarts-gl'
// Vue.prototype.$echarts = echarts;

window.chartTimer = {};
// 动态修改title和验证口令
router.beforeEach((to, from, next) => {
    // 清除各个组件中的定时器
    Object.keys(window.chartTimer).forEach(v => clearInterval(window.chartTimer[v]))
    // 清除轮播中的定时器
    clearTimeout(window.carousel)
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (to.meta.title) { document.title = to.meta.title; }

    if (isAdmin) {
        sessionStorage.setItem('toPage', to.path)
        next()
    } else {
        if (to.path == '/access') {
            next()
        } else {
            sessionStorage.setItem('toPage', to.path)
            next({ name: 'access' })
        }
    }
})

import storeCongfig from './store';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
    store: new Vuex.Store(storeCongfig)
})

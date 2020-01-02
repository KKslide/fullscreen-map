import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex';
Vue.use(Vuex);

import $ from "jquery"
import jqCircle from "jquery-circle-progress"

// 设置页面轮播(其实就是自动跳转)
import { setCarousel, deepClone } from './js/utils'
Vue.prototype.$setCarousel = setCarousel
Vue.prototype.$deepClone = deepClone

Vue.prototype.$axios = axios

Vue.prototype.$http = {}

if (process.env.NODE_ENV === "production") {
    console.log("你正在线上环境")
    Vue.prototype.$http = {
        "access": { "url": "./static/json/token.json", "method": "get" },
        "screenpic1": { "url": "http://10.30.80.71:8100/usp_ks/tx/GYL", "method": "post" },
        "screenpic2": { "url": "http://10.30.80.71:8100/usp_ks/tx/XSZC", "method": "post" },
        "screenpic3": { "url": "http://10.30.80.71:8100/usp_ks/tx/SZYH", "method": "post" },
        // "access": { "url": "./tx/Login", "method": "post" },
        // "screenpic1": { "url": "./tx/GYL", "method": "post" },
        // "screenpic2": { "url" : "./tx/XSZC", "method": "post" },
        // "screenpic3": { "url": "./tx/SZYH", "method":"post" },
    }
} else {
    console.log("你正在使用开发环境")
    Vue.prototype.$http = {
        "access": { "url": "./static/json/token.json", "method": "get" },
        "screenpic1": { "url": "./static/json/cc.json", "method": "get" },
        "screenpic2": { "url": "./static/json/screen2.json", "method": "get" },
        "screenpic3": { "url": "./static/json/screen3.json", "method": "get" },
        "screenpic4": { "url": "./static/json/screen4.json", "method": "get" },
    }
}

Vue.config.productionTip = false;

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

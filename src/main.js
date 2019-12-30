import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex';
Vue.use(Vuex);

import $ from "jquery"
import jqCircle from "jquery-circle-progress"

// 设置页面轮播(其实就是自动跳转)
import setCarousel from './js/setCarousel'
Vue.prototype.$setCarousel = setCarousel

Vue.prototype.$axios = axios

Vue.prototype.$http = {
    // "access": { "url": "./tx/Login", "method": "post" },
    // "screenpic1": { "url": "./tx/GYL", "method": "post" },
    // "screenpic2": { "url" : "./tx/XSZC", "method": "post" },
    // "screenpic3": { "url": "./tx/SZYH", "method":"post" },
    /* ***************************************************** */
    "access": { "url": "./static/json/token.json", "method": "get" },
    "screenpic1": { "url": "./static/json/cc.json", "method": "get" },
    "screenpic2": { "url": "./static/json/screen2.json", "method": "get" },
    "screenpic3": { "url": "./static/json/screen3.json", "method": "get" },
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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from "jquery"
import jqCircle from "jquery-circle-progress"

import setCarousel from './js/setCarousel';
Vue.prototype.$setCarousel = setCarousel;

import vueTouch from 'kim-vue-touch'
Vue.use(vueTouch)
import axios from 'axios'
Vue.prototype.$axios = axios

// element-ui 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 引入echarts 其它组件使用 this.$echarts
import echarts from 'echarts';
import 'echarts-gl'
Vue.prototype.$echarts = echarts;

// 动态修改title和验证口令
router.beforeEach((to, from, next) => {
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (to.meta.title) { document.title = to.meta.title; }

    if (isAdmin) {
        sessionStorage.setItem('toPage',to.path)
        next()
    } else {
        if (to.path == '/access') {
            next()
        } else {
            sessionStorage.setItem('toPage',to.path)
            next({ name: 'access' })
        }
    }
})

// Vue.prototype.resetSetItem = function (key, newVal) {
//     if (key === 'watchStorage') {
 
//         // 创建一个StorageEvent事件
//         var newStorageEvent = document.createEvent('StorageEvent');
//         const storage = {
//             setItem: function (k, val) {
//                 sessionStorage.setItem(k, val);
 
//                 // 初始化创建的事件
//                 newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
 
//                 // 派发对象
//                 window.dispatchEvent(newStorageEvent)
//             }
//         }
//         return storage.setItem(key, newVal);
//     }
//  }

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})

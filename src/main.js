// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from "jquery"
import jqCircle from "jquery-circle-progress"

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
    if (to.meta.title) { document.title = to.meta.title; }
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin) {
        next()
    } else {
        let tempToken = prompt('请输入口令');
        axios({
            // url:"./static/json/token.json",
            // method:'get'

            url: './tx/Login',
            method: 'post',
            data: { password: tempToken }
        }).then(res => {
            if (res.data.message) { // 
                sessionStorage.setItem('isAdmin', true)
                next()
            } else {
                alert('口令有误！请重新输入！')
                window.location.reload()
            }
        })
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})

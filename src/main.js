// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 动态修改title
router.beforeEach((to,from,next)=>{
    if(to.meta.title){ document.title = to.meta.title; }
    next();
})

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

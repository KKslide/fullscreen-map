import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'


// import DataAnalysis1 from '@/components/page/DataAnalysis1'
// import DataAnalysis2 from '@/components/page/DataAnalysis2'
// import DataAnalysis3 from '@/components/page/DataAnalysis3'

// import ScreenDisplay1 from '@/components/page/ScreenDisplay1'
// import ScreenDisplay2 from '@/components/page/ScreenDisplay2'
// import ScreenDisplay3 from '@/components/page/ScreenDisplay3'
// import ScreenDisplay4 from '@/components/page/ScreenDisplay4'


/* ********* 以下是正式使用的大屏 ********** */
// import ScreenPic0 from '@/components/bigScreen/ScreenPic0'
import ScreenPic1 from '@/components/bigScreen/ScreenPic1'
import ScreenPic2 from '@/components/bigScreen/ScreenPic2'
import ScreenPic3 from '@/components/bigScreen/ScreenPic3'
import ScreenPic4 from '@/components/bigScreen/ScreenPic4'
import ScreenPic5 from '@/components/bigScreen/ScreenPic5'


import Access from '@/components/bigScreen/Access'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/DataAnalysis1',
    //   name: 'DataAnalysis1',
    //   component: DataAnalysis1
    // }, {
    //   path: '/DataAnalysis2',
    //   name: 'DataAnalysis2',
    //   component: DataAnalysis2
    // }, {
    //   path: '/DataAnalysis3',
    //   name: 'DataAnalysis3',
    //   component: DataAnalysis3
    // }, {
    //   path: '/ScreenDisplay1',
    //   name: 'ScreenDisplay1',
    //   component: ScreenDisplay1
    // }, {
    //   path: '/ScreenDisplay2',
    //   name: 'ScreenDisplay2',
    //   component: ScreenDisplay2
    // }, {
    //   path: '/ScreenDisplay3',
    //   name: 'ScreenDisplay3',
    //   component: ScreenDisplay3
    // }, {
    //   path: '/ScreenDisplay4',
    //   name: 'ScreenDisplay4',
    //   component: ScreenDisplay4
    // },


    //大屏设计
    // {
    //   path: '/ScreenPic0',
    //   name: 'ScreenPic0',
    //   component: ScreenPic0
    // },
    {
      path: '/access',
      name: 'access',
      component: Access
    },
    {
      path: '/ScreenPic1',
      name: 'ScreenPic1',
      component: ScreenPic1,
      meta: {
        title: '温氏物联网金融',
        show:true
      }
    },
    {
      path: '/ScreenPic2',
      name: 'ScreenPic2',
      component: ScreenPic2,
      meta: {
        title: '线上资产业务监控大屏'
      }
    },
    {
      path: '/ScreenPic3',
      name: 'ScreenPic3',
      component: ScreenPic3,
      meta: {
        title: '数字银行监控大屏'
      }
    },
    // {
    //   path: '/ScreenPic4',
    //   name: 'ScreenPic4',
    //   component: ScreenPic4,
    //   meta: {
    //     title: '全局业务监控'
    //   }
    // },
    // {
    //   path: '/ScreenPic5',
    //   name: 'ScreenPic5',
    //   component: ScreenPic5
    // }
  ]
})

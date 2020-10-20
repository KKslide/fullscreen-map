import Vue from 'vue'
import Router from 'vue-router'

/* ********* 以下是正式使用的大屏 ********** */
import ScreenPic1 from '@/components/bigScreen/ScreenPic1'
import ScreenPic2 from '@/components/bigScreen/ScreenPic2'
import ScreenPic3 from '@/components/bigScreen/ScreenPic3'
import ScreenPic4 from '@/components/bigScreen/ScreenPic4'
import ScreenPic5 from '@/components/bigScreen/ScreenPic5'
import ScreenPic6 from '@/components/bigScreen/ScreenPic6'

/* 口令登陆页面 */
import Access from '@/components/bigScreen/Access'

Vue.use(Router)

export default new Router({
    routes: [
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
                show: true
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
                title: '线上存款监控大屏'
            }
        },
        {
            path: '/ScreenPic4',
            name: 'ScreenPic4',
            component: ScreenPic4,
            meta: {
                title: '移动支付业务情况'
            }
        },
        {
            path: '/ScreenPic5',
            name: 'ScreenPic5',
            component: ScreenPic5,
            meta: {
                title: '惠普金融业务大屏'
            }
        },
        {
            path: '/ScreenPic6',
            name: 'ScreenPic6',
            component: ScreenPic6,
            meta: {
                title: '喜之郎供应链业务'
            }
        }
    ]
})

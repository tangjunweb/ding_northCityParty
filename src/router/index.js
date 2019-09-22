import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            redirect: '/Home'
        },
        {
            path: '/Home',
            name: 'Home',
            meta: {
                title: '首页'
            },
            component: resolve => require(['@/views/home/index'], resolve)
        },
        {
            path: '/Education',
            name: 'education',
            meta: {
                title: '智慧教育'
            },
            component: resolve => require(['@/views/Education/Education'], resolve)
        },
        {
            path: '/Analysis',
            name: 'analysis',
            meta: {
                title: '智慧分析'
            },
            component: resolve => require(['@/views/Analysis/Analysis'], resolve)
        },
        {
            path: '/Server',
            name: 'server',
            meta: {
                title: '党建综合服务'
            },
            component: resolve => require(['@/views/Server/Server'], resolve)
        },
        {
            path: '/Propaganda',
            name: 'propaganda',
            meta: {
                title: '智慧宣传'
            },
            component: resolve => require(['@/views/Propaganda/Propaganda'], resolve)
        },
        {
            path: '/Manage',
            name: 'manage',
            meta: {
                title: '智慧管理'
            },
            component: resolve => require(['@/views/Manage/Manage'], resolve)
        },
        {
            path: '/Map',
            name: 'map',
            meta: {
                title: '党建服务品牌'
            },
            component: resolve => require(['@/views/map/map'], resolve)
        },
        {
            path: '/organazition',
            name: 'organazition',
            meta: {
                title: '特色组织生活'
            },
            component: resolve => require(['@/views/organazition/organazie'], resolve)
        },
        {
            path: '/keywork',
            name: 'keywork',
            meta: {
                title: '特色组织生活'
            },
            component: resolve => require(['@/views/keywork/index'], resolve)
        }
    ]
})
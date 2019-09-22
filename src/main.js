// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/css/normalize.css'
import '@/common/css/style.css'
import '@/common/fonts/font.css'

Vue.use(VueAMap);
Vue.use(ElementUI);
VueAMap.initAMapApiLoader({
    key: '3e2fe09b64ba28506acda9729430bdc3',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.OverView', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
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
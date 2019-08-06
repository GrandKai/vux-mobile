// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import axios from '@/utils/http'

import 'mint-ui/lib/style.css'

import { Tabbar, TabbarItem, Group, Cell, XHeader, Grid, GridItem, Search, Swiper, Toast, ToastPlugin, ViewBox, Sticky } from 'vux'
import { Swipe, SwipeItem, Loadmore, Cell as MTCell } from 'mint-ui'

Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.component('mt-loadmore', Loadmore)
Vue.component('mt-cell', MTCell)

Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-header', XHeader)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('search', Search)
Vue.component('swiper', Swiper)
Vue.component('toast', Toast)
Vue.component('view-box', ViewBox)
Vue.component('sticky', Sticky)

Vue.use(ToastPlugin)

FastClick.attach(document.body)

window.axios = axios
Vue.prototype.axios = axios
// api接口路径
Vue.prototype.apiUrl = process.env.API_URL
window.apiUrl = process.env.API_URL

Vue.config.productionTip = false

/* eslint-disable no-new */
const $vue = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
export const vue = $vue

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/HelloFromVux'
import Layout from '@/views/Layout'
import Index from '@/views/Index'

import Information from '@/views/business/Information'
import InformationList from '@/views/business/InformationList'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/helloWorld',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/information',
        name: 'Information',
        component: Information
      },
      {
        path: '/informationList',
        name: 'InformationList',
        component: InformationList
      }
    ]
  }

]
const router = new Router({
  mode: 'history',
  routes: routes
})
export default router

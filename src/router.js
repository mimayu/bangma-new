import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/login/register')
    },
    {
      path: '/visit',
      name: 'visit',
      component: () => import(/* webpackChunkName: "visit" */ './views/sale/visit')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ './views/sale/order')
    },
    {
      path: '/cancel',
      name: 'cancel',
      component: () => import(/* webpackChunkName: "cancel" */ './views/sale/cancel')
    },
    {
      path: '/allUser',
      name: 'allUser',
      component: () => import(/* webpackChunkName: "allUser" */ './views/sale/allUser')
    },
    {
      path: '/detection',
      name: 'detection',
      component: () => import(/* webpackChunkName: "detection" */ './views/sale/detection.vue')
    }
  ]
})

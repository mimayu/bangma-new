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
      path: '/reset',
      name: 'reset',
      component: () => import(/* webpackChunkName: "reset" */ './views/login/reset')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/sale/home')
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
      component: () => import(/* webpackChunkName: "detection" */ './views/sale/detection')
    },
    {
      path: '/signStatus',
      name: 'signStatus',
      component: () => import(/* webpackChunkName: "signStatus" */ './views/sale/signStatus')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import(/* webpackChunkName: "record" */ './views/sale/record')
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: () => import(/* webpackChunkName: "quotation" */ './views/sale/quotation')
    },
    {
      path: '/customInfo',
      name: 'customInfo',
      component: () => import(/* webpackChunkName: "customInfo" */ './views/sale/customInfo')
    },
     {
      path: '/quotationDetail',
      name: 'quotationDetail',
      component: () => import(/* webpackChunkName: "priceDetail" */ './views/sale/quotationDetail')
    },
    {
      path: '/testCamer',
      name: 'testCamer',
      component: () => import(/* webpackChunkName: "testCamer" */ './views/sale/testCamer')
    },
    {
      path: '/quotationList',
      name: 'quotationList',
      component: () => import(/* webpackChunkName: "quotation" */ './views/sale/quotationList')
    },
    {
      path: '/assign',
      name: 'assign',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/assign')
    },
    {
      path: '/allStaff',
      name: 'allStaff',
      component: () => import(/* webpackChunkName: "allStaff" */ './views/assign/allStaff')
    },
    {
      path: '/assignList',
      name: 'assignList',
      component: () => import(/* webpackChunkName: "assignList" */ './views/assign/assignList')
    },
    {
      path: '/addCustom',
      name: 'addCustom',
      component: () => import(/* webpackChunkName: "addCustom" */ './views/assign/addCustom')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/my/profile')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import(/* webpackChunkName: "my" */ './views/my/my')
    },
    {
      path: '/organization',
      name: 'organization',
      component: () => import(/* webpackChunkName: "organization" */ './views/my/organization')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "setting" */ './views/my/setting')
    },
    {
      path: '/job',
      name: 'job',
      component: () => import(/* webpackChunkName: "job" */ './views/my/job')
    }
    ,
    {
      path: '/remind',
      name: 'remind',
      component: () => import(/* webpackChunkName: "remind" */ './views/remind/remind')
    },
    {
      path: '/gzProgress',
      name: 'gzProgress',
      component: () => import(/* webpackChunkName: "gzProgress" */ './views/boss/gzProgress')
    },
    {
      path: '/salesSort',
      name: 'salesSort',
      component: () => import(/* webpackChunkName: "salesSort" */ './views/boss/salesSort')
    },
    {
      path: '/bossHome',
      name: 'bossHome',
      component: () => import(/* webpackChunkName: "bossHome" */ './views/boss/bossHome')
    },
    {
      path: '/reviewOver',
      name: 'reviewOver',
      component: () => import(/* webpackChunkName: "reviewOver" */ './views/boss/reviewOver')
      
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: () => import(/* webpackChunkName: "settlement" */ './views/boss/settlement')
      
    },
    {
      path: '/loss',
      name: 'loss',
      component: () => import(/* webpackChunkName: "settlement" */ './views/boss/loss')
      
    },
    {
      path: '/managerHome',
      name: 'managerHome',
      component: () => import(/* webpackChunkName: "managerHome" */ './views/manager/managerHome')
      
    },
    {
      path: '/managerList',
      name: 'managerList',
      component: () => import(/* webpackChunkName: "managerList" */ './views/manager/managerList')
      
    }
  ]
})

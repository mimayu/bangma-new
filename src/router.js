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
    /*
    * sale 基检状态 - > 预约
    */
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "sale" */ './views/sale/order')
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
    /** 
    * sale - > 开工实施 
    */
    {
      path: '/saleWorking',
      name: 'saleWorking',
      component: () => import(/* webpackChunkName: "saleWorking" */ './views/sale/saleWorking')
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
    /*
    * sale -> 报价详情
    */
    {
      path: '/quotationDetail',
      name: 'quotationDetail',
      component: () => import(/* webpackChunkName: "quotationDetail" */ './views/sale/quotationDetail')
    },
    {
      path: '/testCamer',
      name: 'testCamer',
      component: () => import(/* webpackChunkName: "testCamer" */ './views/sale/testCamer')
    },
    /*
    * sale -> 调整报价 
    */
    {
      path: '/quotationList',
      name: 'quotationList',
      component: () => import(/* webpackChunkName: "quotationList" */ './views/sale/quotationList')
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
    },{
      path: '/salesSortYj',
      name: 'salesSortYj',
      component: () => import(/* webpackChunkName: "salesSortYj" */ './views/boss/salesSortYj')
    },
    {
      path: '/bossHome',
      name: 'bossHome',
      component: () => import(/* webpackChunkName: "bossHome" */ './views/boss/bossHome')
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
    },
    /** 
    * boss - > 新进客户 
    */
    {
      path: '/bossAddCustom',
      name: 'bossAddCustom',
      component: () => import(/* webpackChunkName: "bossAddCustom" */ './views/boss/addCustom.vue')
    },
    /** 
    * boss - > 签约客户 
    */
    {
      path: '/bossSignCustom',
      name: 'bossSignCustom',
      component: () => import(/* webpackChunkName: "bossSignCustom" */ './views/boss/signCustom.vue')
    },
    /** 
    * boss - > 开工实施 
    */
    {
      path: '/bossWorking',
      name: 'bossWorking',
      component: () => import(/* webpackChunkName: "bossWorking" */ './views/boss/bossWorking.vue')
    },
    /** 
    * boss - > 完工
    */
    {
      path: '/bossFinish',
      name: 'bossFinish',
      component: () => import(/* webpackChunkName: "bossFinish" */ './views/boss/bossFinish.vue')
    },
    /** 
    * boss - > 审核完成
    */
    {
      path: '/bossAudit',
      name: 'bossAudit',
      component: () => import(/* webpackChunkName: "bossAudit" */ './views/boss/bossAudit.vue')
    },
    /** 
    * boss - > 结算
    */
    {
      path: '/bossSettle',
      name: 'bossSettle',
      component: () => import(/* webpackChunkName: "bossSettle" */ './views/boss/bossSettle')
    },
    /** 
    * boss - > 流失率
    */
    {
      path: '/bossLoss',
      name: 'bossLoss',
      component: () => import(/* webpackChunkName: "bossLoss" */ './views/boss/bossLoss')
    },
    /** 
    * boss - > 增加开工
    */
    {
      path: '/bossWorkingAdd',
      name: 'bossWorkingAdd',
      component: () => import(/* webpackChunkName: "bossWorkingAdd" */ './views/boss/bossWorkingAdd.vue')
    },
    /** 
    * boss - > 增加完工
    */
    {
      path: '/bossFinishAdd',
      name: 'bossFinishAdd',
      component: () => import(/* webpackChunkName: "bossFinishAdd" */ './views/boss/bossFinishAdd.vue')
    },
    /** 
    * common - > 合同取消
    */
    {
      path: '/commonCancel',
      name: 'commonCancel',
      component: () => import(/* webpackChunkName: "common" */ './views/common/cancel.vue')
    }
  ]
})

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
      path: '/uploadimg',
      name: 'uploadimg',
      component: () => import(/* webpackChunkName: "uploadimg" */ './views/sale/uploadimg')
    },
    {
      path: '/followup',
      name: 'followup',
      component: () => import(/* webpackChunkName: "followup" */ './views/sale/followup')
    },
    {
      path: '/tinggong',
      name: 'tinggong',
      component: () => import(/* webpackChunkName: "tinggong" */ './views/sale/tinggong')
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
    /** 
    * sale - > 签约
    */
    {
      path: '/signStatus',
      name: 'signStatus',
      component: () => import(/* webpackChunkName: "signStatus" */ './views/sale/signStatus')
    },
    /** 
    * sale - > 完工 
    */
    {
      path: '/saleFinish',
      name: 'saleFinish',
      component: () => import(/* webpackChunkName: "saleFinish" */ './views/sale/saleFinish')
    },
    /** 
    * sale - > 流失 
    */
   {
    path: '/saleLoss',
    name: 'saleLoss',
    component: () => import(/* webpackChunkName: "saleLoss" */ './views/sale/saleLoss')
  },
    {
      path: '/tinggonglist',
      name: 'tinggonglist',
      component: () => import(/* webpackChunkName: "tinggonglist" */ './views/sale/tinggonglist')
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
    /*
    * sale -> 取消报价
    */
    {
      path: '/quotationCancel',
      name: 'quotationCancel',
      component: () => import(/* webpackChunkName: "sale" */ './views/sale/quotationCancel')
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
        /** 
    * boss - > 工队人辅结算
    */
    {
      path: '/jiesuan',
      name: 'jiesuan',
      component: () => import(/* webpackChunkName: "jiesuan" */ './views/boss/jiesuan.vue')
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
      path: '/salesSortc',
      name: 'salesSortc',
      component: () => import(/* webpackChunkName: "salesSortYj" */ './views/boss/salesSortc')
    },
       {
      path: '/salesSortYj',
      name: 'salesSortYj',
      component: () => import(/* webpackChunkName: "salesSortYj" */ './views/boss/salesSortYj')
    },
    {
      path: '/bossHome',
      name: 'bossHome',
      component: () => import(/* webpackChunkName: "bossHome" */ './views/boss/bossHome')
    },
    /** 
    * boss - > 新进客户 
    */
    {
      path: '/bossAddCustom',
      name: 'bossAddCustom',
      component: () => import(/* webpackChunkName: "bossAddCustom" */ './views/boss/bossaddCustom.vue')
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
    * boss - > 增加复工
    */
    {
      path: '/bossFugongAdd',
      name: 'bossFugongAdd',
      component: () => import(/* webpackChunkName: "bossFugongAdd" */ './views/boss/bossFugongAdd.vue')
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
    * boss - > 增加付款
    */
   {
    path: '/bossFukuanAdd',
    name: 'bossFukuanAdd',
    component: () => import(/* webpackChunkName: "bossFukuanAdd" */ './views/boss/bossFukuanAdd.vue')
  },
    /** 
    * common - > 合同取消
    */
    {
      path: '/commonCancel',
      name: 'commonCancel',
      component: () => import(/* webpackChunkName: "common" */ './views/common/cancel.vue')
    },
    /** 
    * assign - > 输单员主页
    */
    {
      path: '/assignHome',
      name: 'assignHome',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/assignHome.vue')
    },
    /** 
    * assign - > 新建客户
    */
    {
      path: '/addCustom',
      name: 'addCustom',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/addCustom')
    },
    /** 
    * assign - > 预览客户
    */
   {
    path: '/previewCustom',
    name: 'previewCustom',
    component: () => import(/* webpackChunkName: "assign" */ './views/assign/previewCustom')
  },
    /** 
    * followuplist - > 预览客户
    */
   {
    path: '/followupList',
    name: 'followupList',
    component: () => import(/* webpackChunkName: "assign" */ './views/assign/followupList')
  },
    /** 
    * assign - > 员工列表
    */
    {
      path: '/addStaff',
      name: 'addStaff',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/addStaff')
    },
    /** 
    * assign - > 员工列表
    */
    {
      path: '/addLabourer',
      name: 'addLabourer',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/addLabourer')
    },
    /** 
    * assign - > 员工列表
    */
    {
      path: '/allStaff',
      name: 'allStaff',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/allStaff')
    },
    /** 
    * assign - > 长工列表
    */
   {
      path: '/allLabourer',
      name: 'allLabourer',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/allLabourer')
    },
    /** 
    * assign - > 已分配列表
    */
    {
      path: '/assignList',
      name: 'assignList',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/assignList')
    },
    /** 
    * assign - > 待分配列表
    */
    {
      path: '/underAssignList',
      name: 'underAssignList',
      component: () => import(/* webpackChunkName: "assign" */ './views/assign/underAssignList')
    },
    /** 
    * managerPaigong - > 派工操作
    */
    {
      path: '/managerPaigong',
      name: 'managerPaigong',
      component: () => import(/* webpackChunkName: "managerPaigong" */ './views/manager/managerPaigong')
    },
    /** 
    * assign - > 分配操作
    */
   {
    path: '/assign',
    name: 'assign',
    component: () => import(/* webpackChunkName: "assign" */ './views/assign/assign')
  },
    /*
    * manager - 工程部首页
    */
    {
      path: '/managerHome',
      name: 'managerHome',
      component: () => import(/* webpackChunkName: "manager" */ './views/manager/managerHome')
    },
    /*
    * manager -> 签约成功
    */
    {
      path: '/managerSign',
      name: 'managerSign',
      component: () => import(/* webpackChunkName: "manager" */ './views/manager/managerSign')
    },
    /*
    * manager -> 派工完成
    */
    {
      path: '/managerAssign',
      name: 'managerAssign',
      component: () => import(/* webpackChunkName: "manager" */ './views/manager/managerAssign')
    },
    /*
    * manager -> 开工实施
    */
    {
      path: '/managerWork',
      name: 'managerWork',
      component: () => import(/* webpackChunkName: "manager" */ './views/manager/managerWork')
    },
    /*
    * manager -> 完工·收款中
    */
   {
      path: '/managerDone',
      name: 'managerDone',
      component: () => import(/* webpackChunkName: "manager" */ './views/manager/managerDone')
    },
    /*
      * manager -> 完工·已结清
      */
    {
      path: '/managerFinish',
      name: 'managerFinish',
      component: () => import(/* webpackChunkName: "manager" */ './views/manager/managerFinish')
    },
    /** 
    * foreman - > 工长主页
    */
    {
      path: '/foremanHome',
      name: 'foremanHome',
      component: () => import(/* webpackChunkName: "foreman" */ './views/foreman/foremanHome')
    },
    /*
    * recommend -> 我的推荐
    */
    {
      path: '/foremanRecommend',
      name: 'foremanRecommend',
      component: () => import(/* webpackChunkName: "foreman" */ './views/foreman/foremanRecommend')
    },
    /*
    * recommend -> 我的推荐
    */
    {
      path: '/foremanBaoming',
      name: 'foremanBaoming',
      component: () => import(/* webpackChunkName: "foreman" */ './views/foreman/foremanBaoming')
    },
    /*
    * recommend -> 在建工地
    */
   {
      path: '/foremanConstruction',
      name: 'foremanConstruction',
      component: () => import(/* webpackChunkName: "foreman" */ './views/foreman/foremanConstruction')
    },
    /*
    * orderer - 主材下单模块
    */
    {
      path: '/ordererHome',
      name: 'ordererHome',
      component: () => import(/* webpackChunkName: "manager" */ './views/orderer/ordererHome')
    },
    /*
    * 主材确认待下单模块
    */
    {
      path: '/material',
      name: 'material',
      component: () => import(/* webpackChunkName: "material" */ './views/orderer/material')
    },
    /*
    * 无主材下单
    */
    {
      path: '/nomaterial',
      name: 'nomaterial',
      component: () => import(/* webpackChunkName: "nomaterial" */ './views/orderer/nomaterial')
    },
    /*
    * 主材下单列表
    */
    {
      path: '/orderlist',
      name: 'orderlist',
      component: () => import(/* webpackChunkName: "nomaterial" */ './views/orderer/orderlist')
    },
    /** 
    * supplement - > 主材补单
    */
    {
      path: '/supplement',
      name: 'supplement',
      component: () => import(/* webpackChunkName: "nomaterial" */ './views/orderer/supplement')
    },
    /** 
    * supervise - > 工长主页
    */
   {
    path: '/supervisorHome',
    name: 'supervisorHome',
    component: () => import(/* webpackChunkName: "foreman" */ './views/supervisor/supervisorHome')
  },
  ]
})

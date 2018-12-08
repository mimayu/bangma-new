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
      path: '/allUser',
      name: 'allUser',
      component: () => import(/* webpackChunkName: "visit" */ './views/sale/allUser')
    },
      {
      path: '/detection',
      name: 'detection',
      component: () => import(/* webpackChunkName: "visit" */ './views/sale/detection')
    }
  ]
})

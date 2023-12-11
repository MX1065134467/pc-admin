import Vue from 'vue'
import VueRouter from 'vue-router'
import Position from './modules/position'
import Resume from './modules/resume'
import Journey from './modules/journey'
import News from './modules/news'
import Issue from './modules/issue'
import System from './modules/system'
import videos from './modules/videos'
import Files from './modules/files'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/index')
  },
  {
    path: '/',
    component: _import('index'),
    redirect: '/home',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          firstMenu: '首页',
          title: '欢迎页'
        },
        component: _import('home/index')
      },
      // 职位管理
      ...Position,
      // 简历管理
      ...Resume,
      // 行程管理
      ...Journey,
      // 新闻管理
      ...News,
      // 问题管理
      ...Issue,
      // 系统管理
      ...System,
      // 视频管理
      ...videos,
      // 下载管理
      ...Files
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requiresAuth)) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router

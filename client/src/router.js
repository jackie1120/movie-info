import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { Notification } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/users/login',
      alias: '/login',
      name: 'login',
      component: () => import('./views/user/login')
    },
    {
      path: '/users/register',
      alias: '/register',
      name: 'register',
      component: () => import('./views/user/register')
    },
    {
      path: '/movie',
      component: () => import('./views/layout/movie'),
      children: [
        {
          path: 'list',
          name: 'movie-list',
          component: () => import('./views/movie/list')
        },
        {
          path: 'detail/:id',
          name: 'movie-detail',
          component: () => import('./views/movie/detail')
        },
        {
          path: 'create',
          name: 'movie-create',
          alias: 'edit',
          component: () => import('./views/movie/create'),
          meta: { auth: true }
        }
      ]
    },
    {
      path: '/',
      alias: '*',
      name: 'main',
      redirect: { name: 'movie-list' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((router) => router.meta.auth)) {
    if (store.state.isUserLogin) {
      next()
    } else {
      Notification({
        title: '提示',
        type: 'warning',
        message: '请登录后再访问该页面'
      })
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router

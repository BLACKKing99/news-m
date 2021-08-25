import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/'),
    meta: { requireAuth: false },  //添加一些额外的自定义数据
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    meta: { requireAuth: false },
    children: [
      {
        path: '',  //默认子路由,
        name: 'home',
        component: () => import('@/views/home/'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/'),
      },
      {
        path: '/answer',
        name: 'answer',
        component: () => import('@/views/answer/'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/'),
    meta: { requireAuth: false }
  },
  {
    path: '/detail/:detailId',
    name: 'detail',
    component: () => import('@/views/detail/'),
    // 将动态路由参数映射到组件props中
    props: true,
    meta: { requireAuth: false }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/'),
    meta: { requireAuth: true }
  },
  {
    path: '/userChat',
    name: 'userChat',
    component: () => import('@/views/userChat/'),
    meta: { requireAuth: true }
  },

]

const router = new VueRouter({
  routes
})



// to:要访问的页面路由信息
// from:来自那个页面的路由信息
// next:放行的标记
router.beforeEach((to, from, next) => {

  // 判断是否登录

  if (to.meta.requireAuth) {

    if (store.state.user) {
      return next()
    }
    // 校验登录状态，提示用户
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问,确认登录吗?',
    })
      .then(() => {
        router.replace({
          name: "Login",
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 取消了,中断路由导航
        next(false)
      })
  } else {
    // 不需要登录的页面直接过去
    next()
  }

})
export default router

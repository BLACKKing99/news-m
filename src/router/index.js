import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
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
    component: () => import('@/views/search/')
  },
  {
    path: '/detail/:detailId',
    name: 'detail',
    component: () => import('@/views/detail/'),
    // 将动态路由参数映射到组件props中
    props: true,
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/')
  }

]

const router = new VueRouter({
  routes
})

export default router

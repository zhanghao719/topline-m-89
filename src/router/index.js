import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表配置
const routes = [
  {
    // 路由传参
    // 方式一：params 参数，更严格一些
    //    配置路由路径规则
    //    例如：/login/:abc
    //    在组件中获取参数：this.$route.params.abc 或者通过 props 接收
    // 方式二：query 参数
    //    不需要配置路由规则
    //    /login?a=b&foo=bar&n=10
    //    在组件中获取 query 参数：this.$route.query.xxx
    // 使用建议：把非必须的参数配置为 query 参数，把必须的参数配置为 params 参数
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // 有默认子路由的不需要配置 name
    // name: 'tab-bar',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // 要注意路由匹配的优先级，从上到下
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  },
  {
    // 路由的匹配规则是从上到下的，越靠上面的优先级越高
    // /user/chat
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
    props: true
  },
  { // 我的作品
    path: '/my-article/:type?', // /my-article /my-article/a /my-article/b
    name: 'my-article',
    component: () => import('@/views/user-articles'),
    props: true
  }
  // { // 我的收藏
  //   path: '/my-article/collect',
  //   name: 'my-article-collect',
  //   component: () => import('@/views/user-articles')
  // },
  // { // 我的历史
  //   path: '/my-article/history',
  //   name: 'my-article-history',
  //   component: () => import('@/views/user-articles')
  // }
]

const router = new VueRouter({
  routes
})

export default router

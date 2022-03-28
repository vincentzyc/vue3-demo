import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "todo" */ '@/views/TodoList.vue')
  },
  {
    path: '/luckdraw',
    name: 'LuckDraw',
    component: () => import(/* webpackChunkName: "luckdraw" */ '@/views/LuckDraw.vue')
  },
  {
    path: '/address/list',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressList')
  },
  {
    path: '/address/edit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressEdit')
  },
  {
    path: '/chat/list',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chatpage" */ '@/views/chat')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

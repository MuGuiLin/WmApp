import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Store from '../views/Store.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/Mine.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/store',
    name: 'store',
    component: Store,
    redirect: 'goods',
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/ratings',
        name: 'ratings',
        component: () => import('../views/Ratings.vue')
      },
      {
        path: '/seller',
        name: 'seller',
        component: () => import('../views/Seller.vue')
      },
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const lazyLoad = (view) => {
  return () => import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: lazyLoad('Home'),
  },
  {
    path: '/foods',
    name: 'Foods',
    component: lazyLoad('Foods'),
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: lazyLoad('FoodDetail'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: lazyLoad('Cart'),
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: lazyLoad('OrderSuccess'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/layout",
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "about" */ '../views/layout')
  },
  {
    path: '/map',
    component: () => import(/* webpackChunkName: "about" */ '../views/MapView.vue')
  },
  {
    path: '/movie',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

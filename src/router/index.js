import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/about",
  },
  {
    path: '/home',
    component: HomeView,
    children:[
      {
        path: 'tab1',
        component: () =>  import(/* webpackChunkName: "home" */ '../views/home/HomeView1.vue'),
      },
      {
        path: 'tab2',
        component: () =>  import(/* webpackChunkName: "home" */ '../views/home/HomeView2.vue'),
      },
    ]
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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

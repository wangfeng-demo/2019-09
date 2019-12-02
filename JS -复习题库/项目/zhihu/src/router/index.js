import Vue from 'vue'
import VueRouter from 'vue-router'
//引入子路由映射表
import home from "./home"
import notify from './notify'
import vip from './vip'
import user from './user'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Home from '@/components/home/home.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    redirect: Home,
    children:home.concat(notify,vip,user)
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
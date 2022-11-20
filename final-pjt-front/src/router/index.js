import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '../views/MovieView.vue'
import DetailView from '@/views/DetailView'
import LogInView from '@/views/LogInView'
import SignupView from '@/views/SignupView'
import ProfileView from '@/views/ProfileView'
import MovieSearch from '@/views/MovieSearch'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/movie',
    name: 'movie',
    component: MovieView
  },
  {
    path: '/movies/:id',
    name: 'detail',
    component: DetailView,
  },
  {
    path: '/movies/search',
    name: 'search',
    component: MovieSearch,
  },
  {
    path: '/my',
    name: 'myprofile',
    component: ProfileView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

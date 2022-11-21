import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '../views/movie/MovieView.vue'
// import DetailView from '@/components/movie/DetailView'
import LogInView from '@/views/account/LogInView'
import SignupView from '@/views/account/SignupView'
import ProfileView from '@/views/account/ProfileView'
import MovieSearch from '@/views/movie/MovieSearch'

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
  // {
  //   path: '/movies/:id',
  //   name: 'detail',
  //   component: DetailView,
  // },
  {
    path: '/movies/search',
    name: 'search',
    component: MovieSearch,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

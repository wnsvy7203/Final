import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '../views/MovieView.vue'
import RandomView from '@/views/RandomView'
import WatchListView from '@/views/WatchListView'
import DetailMovie from '@/views/DetailMovie'
Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    name: 'movie',
    component: MovieView
  },
  {
    path: '/random',
    name: 'random',
    component: RandomView
  },
  {
    path: '/watch-list',
    name: 'WatchList',
    component: WatchListView
  },
  {
    path: 'movie/:id',
    name: 'DetailMovie',
    component: DetailMovie,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

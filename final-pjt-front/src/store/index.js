import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    MovieJsonData: [],
    randomMovie: null,
    movies:[],
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    getMovieJsonData(state) {
      return state.MovieJsonData
    },
    getMovie(state) {
      state.movies = state.MovieJsonData.slice(0, 21)
      return state.movies
    }
  },
  mutations: {
    GET_MOVIE_JSON_DATA(state, results) {
      state.MovieJsonData = results
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name:'movie'})
    },
  },
  actions: {
    getMovieJson(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
      })
        .then((response) => {
          context.commit('GET_MOVIE_JSON_DATA', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((response) => {
          context.commit('SAVE_TOKEN', response.data.key)
        })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((response) => {
          context.commit('SAVE_TOKEN', response.data.key)
        })
    },
  },
  modules: {
  }
})
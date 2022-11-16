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
    MovieJsonData: null,
    randomMovie: null,
    movies:[
    ],
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    getMovieJsonData(state) {
      return state.MovieJsonData
    },
    getRandomMovieData(state) {
      return state.randomMovie
    },
  },
  mutations: {
    GET_MOVIE_JSON_DATA(state, results) {
      state.MovieJsonData = results
    },
    GET_RANDOM_MOVIE_DATA(state, result) {
      state.randomMovie = result
    },
    CREATE_MOVIE(state,movieItem){
      state.movies.push(movieItem)
    },
    DELETE_MOVIE (state, movieItem) {
      const index = state.movies.indexOf(movieItem)
      state.movies.splice(index, 1)
    },
    UPDATE_MOVIE_STATUS (state, movieItem) {
      state.movies = state.movies.map((movie) => {
        if (movie === movieItem) {
          movie.isCompleted = !movie.isCompleted
        }
        return movie
      })
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name:'movie'})
    },
  },
  actions: {
    getMovieJson(context) {
      axios.get({
        method: 'get',
        url: API_URL + '/api/v1/movies/',
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          context.commit('GET_MOVIE_JSON_DATA', response.data.results)
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
    createMovie(context, movieTitle){
      const movieItem = {
        title: movieTitle,
        isCompleted: false,
      }
      context.commit('CREATE_MOVIE', movieItem)
    },
    deleteMovie(context, movieItem){
      context.commit('DELETE_MOVIE', movieItem)
    },
    updateMovieStatus (context, movieItem) {
      context.commit('UPDATE_MOVIE_STATUS', movieItem)
    },
  },
  modules: {
  }
})
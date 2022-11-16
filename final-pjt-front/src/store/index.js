import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'https://127.0.0.1:8000'
const API_KEY = '048f1b44f3f7ceec6752538826583420'

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
      router.push({ name: 'MovieView' })
    }
  },
  actions: {
    getMovieJson(context) {
      const url = 'https://api.themoviedb.org/3/movie/popular'
      const params= {
        api_key: API_KEY,
        language: 'ko-KR',
        region: 'KR',
        adult: 'true',
      }
      axios.get(url, { params })
      .then((response) => {
        console.log(response.data)
        context.commit('GET_MOVIE_JSON_DATA', response.data.results)
      })
    },
    getRandomJson(context) {
      const url = 'https://api.themoviedb.org/3/movie/top_rated'
      const params= {
        api_key: API_KEY,
        language: 'ko-KR',
        region: 'KR',
      }
      axios.get(url, { params })
      .then((response) => {
        context.commit('GET_RANDOM_MOVIE_DATA', _.sample(response.data.results))
        
      })
      .catch((error) => {
        error
        context.dispatch('getRandomJson')
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
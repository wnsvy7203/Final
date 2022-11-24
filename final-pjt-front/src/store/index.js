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
    token: null,
    comments: [],

    genres: [],
    rated: [1,2,3,4,5],
    payload: {
      username: null,
      password: null
    },
    searchQuery: null,
    likestatus: false,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    getMovieJsonData(state) {
      return state.MovieJsonData
    },

    getMovie(state) {
      state.movies = state.MovieJsonData.slice(0, 25)
      return state.movies
    },
    getComment(state){
      return state.comments
    },
    getSendQuery(state){
      return state.searchQuery
    }
  },
  mutations: {
    GET_MOVIE_JSON_DATA(state, results) {
      state.MovieJsonData = results
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'movie' })
    },
    SET_USER_DATA(state, payload) {
      state.payload = {
        username: payload.username,
        password: payload.password
      }
    },

    DELETE_TOKEN(state) {
      state.token = null
      state.payload.username = null
      state.payload.password = null
    },
    PICK_GENRE(state, res) {
      state.genres = res.data
      console.log(res.data)
    },
    CREATE_COMMENT(state, res){
      console.log(typeof res)
      state.comments.push(res)
    },
    GET_COMMENTS(state, res){
      state.comments = res
    },
    SEND_QUERY(state, query){
      state.searchQuery = query
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
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    signUp(context, payload) {
      // const local_genre = []
      console.log('PAYLOAD', payload)
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
          genre: payload.genre
        }
      })
        .then((response) => {
          context.commit('SAVE_TOKEN', response.data.key)
          context.commit('SET_USER_DATA', payload)
        })
        .then(() => {
          const push_genre = payload.genre
          console.log('TOKEN', this.state.token)
          axios({
            method: 'post',
            url: `${API_URL}/accounts/add_genres/`,
            headers: {
              Authorization: `Token ${this.state.token}`
            },
            data: {
              push_genre
            }
          })
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
          context.commit('SET_USER_DATA', payload)
          console.log(response)
        })
    },
    logOut(context){
      console.log(this.state.token)
      context.commit('DELETE_TOKEN')
      console.log(this.state.token)
    },
    getProfile(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then(res =>
          context.commit('GET_PROFILE', res.data)
        )
    },
    sendQuery(context, query){
      context.commit('SEND_QUERY', query)
    },
    likeMovie(context, likeItemSet){
      axios({
        method:'post',
        url: `${API_URL}/api/v1/movies/${this.movie.id}/like_users/`,
        data:{
          movie: likeItemSet.movie,
          likeStatus: likeItemSet.likeStatus
        },
        headers:{
          Authorization: `Token ${this.$store.state.token}`
        }
      })
      .then((res)=>{
        console.log('댓글',res)
        context.commit('LIKE_MOVIE', res)
      })
    },
    makeDefault(context) {
      if (this.getters.isLogin === true) {
        context.commit('DELETE_TOKEN')
      }
    }
  },
  modules: {
  }
})
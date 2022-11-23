import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_KEY = 'AIzaSyDlxxWeu6OMB8ZmSn-RPbwlzEqPSB0RReU'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    MovieJsonData: [],
    token: null,
    comments: [],
    youtubeVideos: [],
    genres: [],
    rated: [1,2,3,4,5],
    payload: {
      username: null,
      password: null
    },
    searchQuery: null,
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
    GET_YOUTUBE(state, res){
      state.youtubeVideos = res.data.items
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
    UPDATE_COMMENT(state, response){
      state.comments = state.comments.map((comment)=>{
        if (comment === response) {
          return { ...comment, content: response.content}
        }
      })
    }
    // DELETE_COMMENT(state, res){
    //   const index = state.comments.indexOf(res)
    // }
    // GET_USER(state,user){
    //   state.user_id = user.pk
    //   state.user_name = user.username
    // }
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
    getYoutube(context, title){
      const params={
        q: title + 'movie',
        key: YOUTUBE_KEY,
        part: 'snippet',
        type: 'video'
      }
      axios({
        method: 'get',
        url: YOUTUBE_URL,
        params,
      })
        .then(res =>{
          context.commit('GET_YOUTUBE', res)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    createComment(context, commentItemSet){
      console.log(commentItemSet)
      
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/movies/${commentItemSet.movie}/comments/`,
        data: {
          movie: commentItemSet.movie,
          content: commentItemSet.content,
        },
        headers: {
          Authorization: `Token ${commentItemSet.token}`
        }
      })
        .then(res => {
          console.log('res.data', res.data)
          context.commit('CREATE_COMMENT', res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getComment(context,token){
      axios({
        method:'get',
        url: `${API_URL}/api/v1/comments/`,
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then((res) =>{
          context.commit('GET_COMMENTS', res)
          console.log(res.data)
        })
        .catch(err=>{console.log(err)})
    },
    // deleteComment(context, commentItemSet){
    //   axios({
    //     method:'delete',
    //     url: `${API_URL}/api/v1/comments/${commentItemSet.comment_id}/`,
    //     headers: {
    //       Authorization: `Token ${commentItemSet.token}`
    //     }
    //   })
    //   .then((res)=>{
    //     context.commit('DELETE_COMMENT', res.data)
    //     console.log(res.data)
    //   })
    // },
    sendQuery(context, query){
      context.commit('SEND_QUERY', query)
    },
    updataComment(context, commentItemSet){
      axios({
        method:'put',
        url:`${API_URL}/api/v1/comments/${commentItemSet.comment_id}/`,
        data:commentItemSet,
        headers: {
          Authorization: `Token ${commentItemSet.token}`
        }
      })
      .then((res)=>{
        context.commit('UPDATE_COMMENT', res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    // getUser(context){
    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/accounts/my/`,
    //   })
    //   .then(res=>{
    //     console.log(res)
    //     context.commit('GET_USER', res.data)
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
    // }
  },
  modules: {
  }
})
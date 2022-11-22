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
    user_id: null,
    genres: [],
    rated: [1,2,3,4,5,6,7,8,9,10],
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
    CREATE_COMMENT(state, commentItem) {
      state.comments.push(commentItem)
    },
    GET_YOUTUBE(state, res){
      state.youtubeVideos = res.data.items
    },
    DELETE_TOKEN(state) {
      state.token = null
    },
    PICK_GENRE(state, local_genre) {
      state.genres = local_genre
      console.log('PICK_GENRE',state.genres)
    }
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
      const local_genre = []
      console.log(payload)
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
          context.commit('SAVE_TOKEN', response.data)
          console.log('DATA', response.data)
        
          for (let i=0; i<payload.genre.length; i++) {
            axios({
              method: 'get',
              url: `${API_URL}/api/v1/genres/`
            })
              .then((response) => {
                for (let j=0; j<response.data.length; j++) {
                  if (payload.genre[i] === response.data[j].name) {
                    local_genre.push(response.data[j].id)
                  }
                }
                context.commit('PICK_GENRE', local_genre)
              })
          }
        })
    },
    // pickGenre(context, genre_list) {
    //   const local_genre = []
    //   for (let i=0; i<genre_list.length; i++) {
    //     console.log(genre_list[i])
    //     axios({
    //       method: 'get',
    //       url: `${API_URL}/api/v1/genres/`,
    //     })
    //       .then((response) => {
    //         for (let j=0; j<response.data.length; j++) {
    //           if (genre_list[i] === response.data[j].name) {
    //             local_genre.push(response.data[j].id)
    //           }
    //         }
    //         context.commit('PICK_GENRE', local_genre)
    //       })
    //   }
    // },
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
          context.commit('SET_USER_DATA', response.user)
          console.log(response)
        })
    },
    logOut(context){
      console.log(this.state.token)
      context.commit('DELETE_TOKEN')
      console.log(this.state.token)
    },
    createComment(context, payload){
      const commentItem = {
        context: payload.comment,
        movie_id : payload.movie_id,
        isCompleted: false,
      }
      console.log(commentItem)
      context.commit('CREATE_COMMENT', commentItem)
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
    }
  },
  modules: {
  }
})
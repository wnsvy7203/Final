<template>
  <div class="container">
    <h1 class="mt-3">My Profile</h1>
    <div>
      찜한 영화
    </div>
    <div>
      선호 장르 추천 영화
      <div
        class="container"
        v-for="genre in pickedGenre"
        :key="genre.id"
      >
      </div>
    </div>
    <!-- <p>{{comment.username}}</p> -->
  </div>
</template>

<script>
import axios from 'axios'
// import _ from 'lodash'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  data() {
    return {
      token: null,
      movie_list: [],
    }
  },
  methods: {
    getMyName() {
      console.log(this.$store.state.token.username)
      axios({
        method: 'post',
        url: `${API_URL}/accounts/my/`,
        params: {
          username: this.$store.state.token.username
        },
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then(res => {
          console.log(res.data)
        })
    },
    pickedGenre() {
      for (let i=0; i<this.$store.state.genres.length; i++) {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/genres/${this.$store.state.genres[i]}/`,
        })
          .then(res => {
            // this.movie_list = _.sampleSize(res.data.array, 10)
            console.log(res.data)
          })
      }
      
    }
  },
  created() {
    this.getMyName()
    this.pickedGenre()
  }
}
</script>

<style>

</style>
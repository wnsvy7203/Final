<template>
  <div class="container">
    <h1 class="mt-3">My Profile</h1>
    <div>
      찜한 영화
    </div>
    <div>
      선호 장르 추천 영화
    </div>
    <!-- <p>{{comment.username}}</p> -->
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  data() {
    return {
      token: null
    }
  },
  methods: {
    getMyName() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/my/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then(res => {
          console.log(res.data)
          this.token = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.getMyName()
  }
}
</script>

<style>

</style>
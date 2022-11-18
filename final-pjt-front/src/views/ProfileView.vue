<template>
  <div class="container">
    <h1>My Profile</h1>
    <div>
      찜한 영화
    </div>
    <div>
      선호 장르 추천 영화
    </div>
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
        method: 'POST',
        url: `${API_URL}/accounts/my/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then(res => {
          console.log(res.data)
          this.token = res.data
          console.log(this.token)
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
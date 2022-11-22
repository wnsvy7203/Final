<!-- 여기서 Signup할 때, 다른 정보도 넘기도록 하자 -->
<!-- 지금 넘어가는 정보는 username, password -->

<template>
  <div class="my-3" style="color: white">
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="password1"><br>

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="password2">
      
      <input type="submit" value="SignUp">
    </form>

    <table>
        <tbody>
          <tr
            v-for="(list, idx) in genres"
            :key="idx">
            <td
              v-for="(item, idx) in list"
              :key="idx"
            >
              <button
                v-if="genre.includes(item)===false"
                @click="getGenres(item)"
              >{{ item }}</button>
              <button
                v-else
                @click="deleteGenres(item)"
              >{{ item }}</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>
  
<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'SignupView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      genre: [],
      genres: [
        ['액션', '모험', '애니메이션', '코미디'],
        ['범죄', '다큐멘터리', '드라마', '가족'],
        ['판타지', '역사', '공포', '음악'],
        ['미스터리', '로맨스', 'SF', 'TV 영화'],
        ['스릴러', '전쟁', '서부']
      ],
    }
  },
  methods: {
    getGenres(item) {
      if (this.genre.length < 3) {
        this.genre.push(item)
      }
      console.log(this.genre)
    },
    deleteGenres(item) {
      if (this.genre.includes(item)) {
        const idx = this.genre.indexOf(item)
        this.genre.splice(idx, 1)
      }
      console.log(this.genre)
    },
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      
      const local_genre = this.genre
      
      const genre = []
      
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/add_genres/`,
      })
        .then((response) => {
          for (let i=0; i<local_genre.length; i++) {
            for (let j=0; j<response.data.length; j++) {
              if (local_genre[i] === response.data[j].name) {
                genre.push(response.data[j].id)
              }
            }
          }
        })

      const payload = {
        username: username,
        password1: password1,
        password2: password2,
        genre: genre
      }
      this.$store.dispatch('signUp', payload)
    },

  }
}
  </script>
  
<style>
#username{
  background-color: white;
}

#password1{
  background-color: white;
}

#password2{
  background-color: white;
}
</style>
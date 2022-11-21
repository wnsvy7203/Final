<!-- 여기서 Signup할 때, 다른 정보도 넘기도록 하자 -->
<!-- 지금 넘어가는 정보는 username, password -->

<template>
  <div class="my-3">
      <h1 style="color: white">Sign Up Page</h1>
      <form @submit.prevent="signUp">
        <label for="username">username : </label>
        <input type="text" id="username" v-model="username"><br>
  
        <label for="password1"> password : </label>
        <input type="password" id="password1" v-model="password1"><br>
  
        <label for="password2"> password confirmation : </label>
        <input type="password" id="password2" v-model="password2">
        <br>
        <input type="submit" value="SignUp">
      </form>  
      <!-- <table>
        <tbody>
          <tr v-for="line in genres">
            <td v-for="item in line"><button>{{ item }}</button></td>
          </tr>
        </tbody>
        </table> -->
  </div>
</template>
  
<script>
export default {
  name: 'SignupView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      genre_pk: null,
      genres: [
        ['액션', '모험', '애니메이션', '코미디'],
        ['범죄', '다큐멘터리', '드라마', '가족'],
        ['판타지', '역사', '공포', '음악'],
        ['미스터리', '로맨스', 'SF', 'TV 영화'],
        ['스릴러', '전쟁', '서부']
      ]
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      
      const genre_pk = this.genre_pk

      const payload = {
        username: username,
        password1: password1,
        password2: password2,
        genre_pk: genre_pk
      }

      this.$store.dispatch('signUp', payload)
    },

  }
}
  </script>
  
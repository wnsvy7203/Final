<!-- 여기서 Signup할 때, 다른 정보도 넘기도록 하자 -->
<!-- 지금 넘어가는 정보는 username, password -->

<template>
  <div class="check container">
    
    <form @submit.prevent="signUp">
      <h2>Sign Up Page</h2>
      <div class="textForm">
        <input type="text" id="username" class="id"
        v-model="username" placeholder="아이디">
      </div>

      <div class="textForm">
        <input type="password" id="password1" class="pwd"
        v-model="password1" placeholder="비밀번호">
      </div>

      <div class="textForm">
        <input type="password" id="password2" class="pwd"
        v-model="password2" placeholder="비밀번호 확인">
      </div>
      <div>
        
      </div>
      <h2>선호 장르</h2>
      
        <table class="checkBox">
            <tbody>
              <tr style="width: 70px; height: 30px"
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
      
      <br>
    <input type="submit" value="SignUp" style="width:150px; height: 50px; font-size: 30px; margin: 30px;">
    </form>
    
    




    <!-- <div class="SignUpForm" style="color: white">
      <form @submit.prevent="signUp">
        <h1>Sign Up Page</h1>
        <label for="username">username : </label>
        <input type="text" id="username" v-model="username"><br>
  
        <label for="password1"> password : </label>
        <input type="password" id="password1" v-model="password1"><br>
  
        <label for="password2"> password confirmation : </label>
        <input type="password" id="password2" v-model="password2">
        <br>
        <input type="submit" value="SignUp">
      </form>
      
      <table>
          <tbody>
            <tr style="width: 70px; height: 30px"
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
    </div> -->
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
        url: `${API_URL}/api/v1/genres/`,
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
.check{
  background-color: white;
}

.SignUpForm{
  position:absolute;
  width:400px;
  height:400px;
  padding: 30px, 20px;
  background-color:#FFFFFF;
  text-align:center;
  top:40%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
  color:
}
.SignUpForm h2{
  text-align: center;
  margin: 30px;
}

.textForm{
  display:inline-flex;
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
  width: 75%;
}

.id{
  width: 75%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.pwd{
  width: 75%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.checkBox{
  display: inline;
  
}
</style>
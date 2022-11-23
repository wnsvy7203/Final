<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-black">
      <div class="container-fluid">
        <router-link :to="{ name: 'movie' }" class="navbar-brand" style="font-size: 50px; color:white;">SIXth Sense</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link style="color:white" :to="{ name: 'profile' }" class="nav-link active" v-if="isLogin===true"> 내 프로필 </router-link>
            </li>
            <li class="nav-item">
              <p class="nav-link active" style="color:white" @click="logOut" v-if="isLogin===true"> 로그아웃</p>
            </li>
            <li class="nav-item">
              <router-link style="color:white" :to="{ name: 'signup' }" class="nav-link active" v-if="isLogin!==true"> 회원가입 </router-link>
            </li>
            <li class="nav-item">
              <router-link style="color:white" :to="{ name: 'login' }" class="nav-link active" v-if="isLogin!==true"> 로그인 </router-link>
              
            </li>
            <li class="nav-item">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search nav-link active" viewBox="0 0 16 16" @click="moveSearch" style="width:50px ">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg> -->
              <img src="@/assets/images/search2.png" class="nav-link active" @click="moveSearch" style="width:50px">
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <!-- <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand class="col-4">
          <router-link :to="{ name: 'movie' }" class="navbar-brand" style="font-size: 50px">SIXth Sense</router-link>
        </b-navbar-brand>
  
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <div>
          <b-collapse id="nav-collapse" is-nav>
            Right aligned nav items
            <b-navbar-nav class="ml-auto">
              <div>
                
                <b-nav-form>
                <div style="display:flex">
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="query" @keyup="sendQuery"></b-form-input>
                
                
                  <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="moveSearch">SEARCH</b-button>

                </div>
                </b-nav-form>
              </div>
    
              <b-nav-item-dropdown
                right
                v-if="isLogin === true"
              >
                <template #button-content>
                  <em>user</em>
                </template>
                <b-dropdown-item><router-link :to="{ name: 'profile' }" class="dropdown-item"> 내 프로필 </router-link></b-dropdown-item>
                <b-dropdown-item @click="logOut"> 로그아웃</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown
                right
                v-else
              >
                <template #button-content>
                  <em>user</em>
                </template>
                <b-dropdown-item><router-link :to="{ name: 'signup' }" class="dropdown-item"> 회원가입 </router-link></b-dropdown-item>
                <b-dropdown-item><router-link :to="{ name: 'login' }" class="dropdown-item"> 로그인 </router-link></b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </div>
    </b-navbar> -->
    <router-view/>
    <v-app>
        <MyComponent/>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return{
      query: null,
    }
  },
  methods: {
    logOut() {
      const API_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then(
          this.$store.dispatch('logOut')
        )
        .then(
          this.$router.push({ name : 'movie' })
        )
        .catch(() => {}
        )
    },
    moveSearch(){
      this.$router.push({ name: 'search' })
    },
    sendQuery(){
      this.$store.dispatch('sendQuery', this.query)
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
}

</script>

<style>
#app {
  background-color: black;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  height: 95px;
}

nav a {
  font-weight: bold;
  color: #eee;
}

.NavBarStyle{
  display: flex;
  justify-content: space-around;
}
</style>

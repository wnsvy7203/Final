<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
<<<<<<< HEAD
      <b-navbar-brand>
        <router-link :to="{ name: 'movie' }" class="navbar-brand" style="font-size: 50px">SIXth Sense</router-link>
      </b-navbar-brand>
=======
      <div class="container">
        <b-navbar-brand class="col-4">
          <router-link :to="{ name: 'movie' }" class="navbar-brand" style="font-size: 50px">SIXth Sense</router-link>
        </b-navbar-brand>
  
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <div>
          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <div>
                
                <b-nav-form>
                <div style="display:flex">
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="query" @keyup="sendQuery"></b-form-input>
                
                
                  <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="moveSearch">SEARCH</b-button>
>>>>>>> 2cc4fe5ffd429f9f15330e59e326ca6c4e460528

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
    </b-navbar>
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

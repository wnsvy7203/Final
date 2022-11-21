<template>
  <div id="app">
    <nav class="navbar justify-content-end navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        
        <router-link :to="{ name: 'movie' }" class="navbar-brand" style="font-size: 50px">Best Film</router-link>
        
        <router-link :to="{ name: 'search' }" class="navbar-brand" style="font-size: 50px"> Search </router-link>
        
        <b-dropdown v-if="isLogin===true"
            id="dropdown-dropleft"
            dropleft text="Drop-Left"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
        >
          <template #button-content>
            <span class="navbar-toggler-icon"></span>
          </template>
            <b-dropdown-item-button><router-link :to="{ name: 'profile' }" class="dropdown-item"> Profile </router-link></b-dropdown-item-button>
        </b-dropdown>

        <b-dropdown v-else
          id="dropdown-dropleft"
          dropleft text="Drop-Left"
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
        >
          <template #button-content>
            <span class="navbar-toggler-icon"></span>
          </template>
          <b-dropdown-item-button><router-link :to="{ name: 'login' }" class="dropdown-item"> Login </router-link></b-dropdown-item-button>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button><router-link :to="{ name: 'signup' }" class="dropdown-item"> Signup </router-link></b-dropdown-item-button>
        </b-dropdown>
      </div>
      
    </nav>
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
        .catch(() => {}
        )
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

</style>

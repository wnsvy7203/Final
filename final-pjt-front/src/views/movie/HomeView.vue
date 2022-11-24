<template>
  <div>
    <img src="@/assets/image.jpg">
    <router-link :to="{ name: 'login' }" class="navbar-brand" style="font-size: 50px; color:white;">로그인</router-link>
    <router-link :to="{ name: 'signup' }">회원가입</router-link>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    methods: {
      logOut() {
        this.$store.dispatch('makeDefault')
      }
    },
    created() {
      this.logOut()
    }
  }

</script>

<style>

</style>

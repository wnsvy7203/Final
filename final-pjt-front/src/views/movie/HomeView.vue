<template>
  <div class="home">
    <div class="container">
      <b-button id="btn1" variant="light">
        <router-link :to="{ name: 'login' }" class="navbar-brand" style="font-weight: bold">로그인</router-link>
      </b-button>
      <b-button id="btn2" variant="light">
        <router-link :to="{ name: 'signup'}" class="navbar-brand" style="font-weight: bold">회원가입</router-link>
      </b-button>
    </div>
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
.home{
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/homeimage.png');
  background-size: cover;
}

#btn1{
  position: absolute;
  left: 900px;
  bottom: 200px;
  width: 300px;
  height: 50px;
  color:black;
  margin:15px;
}
#btn2{
  position: absolute;
  left: 1300px;
  bottom: 200px;
  width: 300px;
  height: 50px;
  color:black;
  margin:15px;
}
</style>

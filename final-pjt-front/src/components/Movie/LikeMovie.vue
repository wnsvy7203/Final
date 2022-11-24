<template>
  <div>
    <button class="buttonSize" style="color:#ea4335" @click="likeMovie">
      <img v-if="this.likestatus === false" src="@/assets/images/like_.png" style="width:100px">
      <img v-else src="@/assets/images/like_check.png" style="width:100px">
    </button>

    <!-- <span style="color: #ea4335" @click="likeMovie">
      <i class="far fa-heart"></i>
    </span>
    <span style="color: #ea4335" @click="likeMovie">
      <i class="fas fa-heart"></i>
    </span> -->
  </div>
</template>

<script>


export default {
  name: "LikeMovie",
  data(){
    return {
      likestatus: false,
    }
  },
  props: {
    movie: Object
  },
  methods: {
    likeMovie(){
      const likeItemSet = {
        content: this.content,
        movie: this.movie.id,
        likestatus: this.likestatus
      }
      this.$store.dispatch('likeMovie', likeItemSet)
    }
  }
    // likeMovie() {
    //   const commentItemSet = {
    //     content: this.content,
    //       movie: this.movie
    //     }
    //   axios({
        
    //     method: "post",
    //     url: `${API_URL}/api/v1/movies/${this.movie.id}/like_users/`,
    //     data: {
    //       movie: commentItemSet.movie,
    //     },
    //     headers:{
    //       Authorization: `Token ${this.$store.state.token}`
    //     }
    //   })
    //     .then(() => {
    //       if (this.likestatus === false){
    //         this.likestatus = true
    //       }else{
    //         this.likestatus = false
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    // },

}
</script>

<style>
.buttonSize{
  width: 100px;
}
</style>

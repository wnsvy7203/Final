<template>
  <div>
    <button style="color:#ea4335" @click="likeMovie2">
        <img v-if="this.likestatus === false" src="@/assets/images/like_.png">
        <img v-else src="@/assets/images/like_check.png">
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
import axios from "axios";
const API_URL = 'http://127.0.0.1:8000'

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
    likeMovie2(){
      if (this.likestatus === false){
        this.likestatus = true
        console.log(this.likestatus)
        this.$emit('delete-like')
      } else {
        this.likestatus = false
        console.log(this.likestatus)
        this.$emit('add-like')
        return 
      }
    },

    likeMovie() {
      const commentItemSet = {
        content: this.content,
          movie: this.movie.id,
          token: this.$store.state.token,
        }
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/`,
        data: {
          movie: commentItemSet.movie,
          token: commentItemSet.token
        },
      })
        .then(() => {
          if (this.hasUser) {
            this.$emit("delete-like");
          } else {
            this.$emit("add-like");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>

</style>

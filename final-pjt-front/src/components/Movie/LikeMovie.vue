<template>
  <div class="h2">
    <button style="color:#ea4335" @click="likeMovie2">
    <img :src="this.imgSrc">
    </button>

    <span style="color: #ea4335" @click="likeMovie">
      <i class="far fa-heart"></i>
    </span>
    <span style="color: #ea4335" @click="likeMovie">
      <i class="fas fa-heart"></i>
    </span>
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
      imgSrc:null,
    }
  },
  props: {
    movie: Object
  },
  methods: {
    likeMovie2(){
      if (this.likestatus === false){
        this.$emit('delete-like')
      }else{
        this.likestatus = false
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
        url: `${API_URL}/api/v1/movies/${commentItemSet.movie}/comments/URL이 없어요...`,
        data: {
          movie: commentItemSet.movie,
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

<style></style>

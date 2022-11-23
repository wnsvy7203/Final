<template>
  <div class="app">
    <input type="text" placeholder="댓글 내용" v-model="content">
    <button class="btn btn-create" @click="createComment">댓글 작성</button>

    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :movie="movie"
    />
  </div>
</template>

<script>
import CommentListItem from '@/components/Movie/CommentListItem'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
    name: "CommentList",
    components: {
      CommentListItem
    },
    data(){
      return{
        content: null,
        comments: [],
      }
    },
    props:{
        movie:Object,
    },
    methods: {
      getComment() {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/comments/`,
        })
          .then((res) =>{
              this.comments = res.data
          })
      },
      createComment() {
        const commentItemSet = {
          movie_pk: this.movie.id,
          content: this.content,
          token: this.$store.state.token,
        }
        axios({
          method: 'post',
          url: `${API_URL}/api/v1/movies/${commentItemSet.movie_pk}/comment_create/`,
          data: {
            movie_pk: commentItemSet.movie_pk,
            content: commentItemSet.content,
          },
          headers: {
            Authorization: `Token ${commentItemSet.token}`
          }
        })
          .then(
            this.getComment()
          )
      },
    },
    created(){
      this.getComment()
    }

}
</script>

<style>
.app{
  background-color: white;
  color: black
}
</style>
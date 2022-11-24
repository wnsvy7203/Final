<template>
  <div class="app">
    <input type="text" placeholder="댓글 내용" @keyup.enter="createComment" v-model="content">
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
    data() {
      return {
        content: null,
        comments: [],
      }
    },
    props:{
      movie: Object,
    },
    methods: {
      getComment () {
        if (this.movie.comment_set.length !== 0) {
          for (let i=0; i<this.movie.comment_set.length; i++) {
            axios({
              method: 'get',
              url: `${API_URL}/api/v1/comments/${this.movie.comment_set[i]}/`,
              headers: {
                Authorization: `Token ${this.$store.state.token}`
              }
            })
              .then(res => {
                this.comments.push(res.data)
              })
              .catch(() => {})
          }
        }
      },
      getCommentAll() {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movies/${this.movie.id}/comments/`,
        })
          .then(res => {
            this.comments = res.data
          })
      },
      createComment() {
        axios({
          method: 'post',
          url: `${API_URL}/api/v1/movies/${this.movie.id}/comment_create/`,
          data: {
            content: this.content,
          },
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          }
        })
      },
    },
    created() {
      this.getComment()
    },
}
</script>

<style>
.app{
  background-color: white;
  color: black
}
</style>
<template>
  <div>
    <div v-if="comment.movie===movie.id">
      작성자 : {{ comment.username }}<br>
              {{ comment.content }}
      <button class="btn btn-primary" @click="updateComment">댓글 수정</button>
      <button class="btn btn-danger" @click="deleteComment">X</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name:'CommentListItem',
  props: {
    comment: Object,
    movie: Object,
  },
  data(){
    return{
      content: this.comment.content
      
    }
  },
  methods:{
    errorMessage() {
      
    },
    updateComment() {
      const commentItemSet = {
        comment_pk: this.comment.id,
        content: this.comment.content,
        token: this.$store.state.token,
      }
      axios({
        method: 'put',
        url: `${API_URL}/api/v1/comments/${commentItemSet.comment_pk}/`,
        data: {
          comment_pk: commentItemSet.comment_pk,
          content: commentItemSet.content,
        },
        headers: {
          Authorization: `Token ${commentItemSet.token}`
        }
      })
        .then(res => {
          console.log('COMMENT', res)
        })
        .catch(() => {

        })
    },

    deleteComment() {
      const commentItemSet = {
        comment_pk: this.comment.id,
        content: this.comment.content,
        token: this.$store.state.token,
      }
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/comments/${commentItemSet.comment_pk}/`,
        headers:{
          Authorization: `Token ${commentItemSet.token}`
        }
      })
        .then(res => {
          console.log('DELETE', res)
        })
        .catch(() => {
          
        })
    }
  }
}
</script>

<style>

</style>
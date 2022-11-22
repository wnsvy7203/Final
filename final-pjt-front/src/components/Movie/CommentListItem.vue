<template>
  <div>
    <div v-if="comment.movie===movie.id">
      작성자 : {{comment.username}}<br>
              {{comment.content}}
      <!-- <button class="btn btn-primary" @click="updataComment">댓글 수정</button> -->
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
    comment:Object,
    movie: Object,
  },
  data(){
    return{
      content: this.comment.content
      
    }
  },
  methods:{
    // updataComment(){
    //   const commentItemSet = {
    //     content: this.comment.content,
    //     comment: this.comment.id,
    //     movie: this.movie,
    //     token: this.$store.state.token,
    //   }
      
    //   axios({
    //     method:'PUT',
    //     url: `${API_URL}/api/v1/comments/${commentItemSet.comment}/`,
    //     data: {
    //       content: commentItemSet.content,
    //       comment: commentItemSet.comment,
    //       movie: commentItemSet.movie,
    //     },
    //     headers: {
    //       Authorization: `Token ${commentItemSet.token}`
    //     }
    //   })
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {console.log(err)})
    // },

    deleteComment() {
      const commentItemSet = {
        content: this.comment.content,
        comment_id: this.comment.id,
        token: this.$store.state.token,
      }
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/comments/${commentItemSet.comment_id}/`,
        headers:{
          Authorization: `Token ${commentItemSet.token}`
        }
      })
        .then(res =>{
          console.log(res)
          // const index = res.data.indexOf(res)
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  }
}
</script>

<style>

</style>
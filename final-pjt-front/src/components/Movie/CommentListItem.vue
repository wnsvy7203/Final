<template>
  <div>
    <div v-if="comment.movie===movie.id">
      작성자 : {{comment.username}}<br>
              {{comment.content}}
      <input type="text" v-if="updatedStatus===true" v-model="updateContent" @keyup.enter="updateComment">
      <button class="btn btn-primary" @click="turnOn" v-if="updatedStatus===false">댓글 재작성</button>

      <button class="btn btn-primary" @click="updateComment" v-if="updatedStatus===true">수정</button>
      <button class="btn btn-danger" @click="deleteComment">삭제</button>
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
    return {
      content: this.comment.content,
      updatedStatus: false,
      updateContent: null,
    }
  },
  
  methods: {
    turnOn() {
      if (this.updatedStatus === false) {
        this.updatedStatus = true
      } else {
        this.updatedStatus = false
      }
    },
    updateComment() {
      const commentItemSet = {
        comment_pk: this.comment.id,
        content: this.updateContent,
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
          console.log('격렬하게 바꾸고 싶다', res.data)
          this.updateContent = null
          this.updatedStatus = false
          this.$emit('emit-data')
        })
    },
    deleteComment() {
      const commentItemSet = {
        comment_pk: this.comment.id,
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
          console.log('격렬하게 지우고 싶다', res.data)
          this.updateContent = null
          this.$emit('emit-data')
        })
    },
  }
}
</script>

<style>

</style>
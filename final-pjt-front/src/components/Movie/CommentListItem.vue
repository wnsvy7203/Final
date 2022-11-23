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
    return{
      content: this.comment.content,
      updatedStatus: false,
      updateContent: null,
    }
  },
  
  methods:{
    turnOn(){
      if (this.updatedStatus === false){
        this.updatedStatus=true
      } else{
        this.updatedStatus = false
      }
    },
    updateComment(){
      console.log(this.updateContent)
      const CommentItemSet = {
        movie: this.movie.id,
        content: this.updateContent,
        comment_id: this.comment.id,
        token: this.$store.state.token,
      }
      this.$store.dispatch('updataComment',CommentItemSet)
    },
        .then(() =>{
          
          console.log('r')
        })
    }
  }
}
</script>

<style>

</style>
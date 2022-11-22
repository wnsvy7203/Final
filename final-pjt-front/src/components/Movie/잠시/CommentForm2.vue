<template>
    <div class="app">
      <input type="text" class="input-box" placeholder="댓글 내용" v-model="content">
      <button class="btn btn-create" @click="createComment">댓글 작성</button>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'CommentForm',
    data() {
      return { 
        content: null,        
      }
    },
    props:{
      movie:  Object,
    },
    methods: {
      createComment() {
        const commentItemSet = {
          content: this.content,
          movie: this.movie.id,
          
          token: this.$store.state.token,
        }
        this.$store.dispatch('createComment', commentItemSet)
        this.content = null
      },
    },
  }
  </script>
  
  <style>
  .app{
    background-color: white;
  }
  </style>
  
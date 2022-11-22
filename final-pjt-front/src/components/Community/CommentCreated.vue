<template>
    <div>
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
    methods: {
      setToken() {
        const token = localStorage.getItem('jwt')
        const config = {
          Authorization: `JWT ${token}`
        }
        return config
      },
      createComment() {
        const commentItemSet = {
          content: this.content,

          token: this.setToken()
        }
        this.$store.dispatch('CommunitycreateComment', commentItemSet)
        this.commentItem.content = null
      },
    },
  }
  </script>
  
  <style>
  
  </style>
  
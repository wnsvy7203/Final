<template>
  <div class="app">
    <input type="text" placeholder="댓글 내용" @keyup.enter="createComment" v-model="content">
    <button class="btn btn-create" @click="createComment">댓글 작성</button>

    <CommentListItem
    v-for="comment in this.comments"
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
        comments: this.$store.state.comments
      }
    },
    props:{
        movie:Object,
    },
    methods: {
    createComment() {
        const commentItemSet = {
            content: this.content,
            movie: this.movie.id,
            token: this.$store.state.token,
        }
        axios({
            method: 'post',
            url: `${API_URL}/api/v1/movies/${commentItemSet.movie}/comments/`,
            data: {
                movie: commentItemSet.movie,
                content: commentItemSet.content,
            },
            headers: {
              Authorization: `Token ${commentItemSet.token}`
            }
        })
        .then((res)=>{
            this.comments.push(res.data)

        })
        .catch(err => {
            console.log(err)
        })
    },
    getComment(){
        const token = this.$store.state.token
        axios({
            method: 'get',
            url: `${API_URL}/api/v1/comments/`,
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) =>{
                this.comments = res.data
            })
      }
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
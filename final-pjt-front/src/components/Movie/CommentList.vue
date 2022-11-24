<template>
  <div class="app">
    <div class="container ">
      <div class="card " >
        <div class="card-body"><textarea class="form-control " row="1" placeholder="댓글" @keyup.enter="createComment" v-model="content"></textarea>
          <b-button id="btn" variant="outline-dark" @click="createComment" >등록</b-button>
        </div>
      </div>
      <div class="card">
    <div class="card-header">댓글리스트
      <CommentListItem
        v-for="comment in this.comments"
        :key="comment.id"
        :comment="comment"
        :movie="movie"
        @emit-data="showAgain"
      />

    </div>
        <!-- <div class="card-header">댓글리스트
          <ul id="comment--box" class="list-group">
            <li id="comment--1" class="list-group-item d-flex justify-content-between">
              <div>댓글 내용입니다.</div>
              <div class="d-flex">
                <div class="font-italic">작성자 : 기면지 </div>
                <button class="badge">삭제</button>
              </div>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    </div>
    <!-- <input type="text" placeholder="댓글 내용" @keyup.enter="createComment" v-model="content">
    <button class="btn btn-create" @click="createComment">댓글 작성</button> -->
  
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
      return {
        content: null,
        comments: []
      }
    },
    props:{
      movie: Object,
    },
    methods: {
      getCommentAll() {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movies/${this.movie.id}/comments`,
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          }
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
          .then(() => {
            this.getCommentAll()
          })
          .then(() => {
            this.content = null
          })
      },
      showAgain() {
        this.getCommentAll()
      }
    },
    created() {
      this.getCommentAll()
    },

}
</script>

<style>
.app{
  background-color: white;
  color: black
}

</style>
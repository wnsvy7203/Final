<template>
  <div class="container">
    <div class="card-header">
          <ul id="comment--box" class="list-group">
            <li id="comment--1" class="list-group-item d-flex justify-content-between align-items-center">
              <div v-if="comment.movie===movie.id">{{comment.content}}</div>
              <div class="d-flex">
                <div class="font-italic owner" v-if="(comment.movie===movie.id) && (updatedStatus === false)">작성자 : {{comment.username}} </div>
                <input class="form-control " row="1" type="text" v-if="updatedStatus===true" v-model="updateContent" @keyup.enter="updateComment">

                
                <div v-if="comment.user === user_">
                  <b-button id="btn" variant="outline-dark" @click="turnOn" v-if="updatedStatus===false">재작성</b-button>
                  <b-button id="btn" variant="outline-dark" @click="updateComment" v-if="updatedStatus===true">수정</b-button>
                  <b-button id="btn" variant="outline-dark" @click="deleteComment">삭제</b-button>
                  
                </div>
              </div>
            </li>
          </ul>
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
  data() {
    return {
      user_: null,
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
    requested() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/my/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then(res => {
          console.log('요청 유저', res.data)
          this.user_ = res.data.id
        })
    }
  },
  created() {
    this.requested()
  }
}
</script>

<style>
#btn {
  width: 75px;
  align-items: center;
}
.owner{
  align-items: center;
  margin: 10px;
}

</style>
<template>
  <div>
    <label for="comment">리뷰 작성</label>
    <input type="text"
    v-model.trim="comment"
    
    class="input1">
    <label for="rated">평점</label>
    <select name="rated" v-model="myMovieRate">
      <option v-for="(rate,idx) in this.$store.state.rated"
      :key="idx">
    {{rate}}</option>
    </select>
    <div class="text-white st"><button @click="createComment" class="btn btn-secondary btn-xl" type="submit">작성</button></div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
    name:'CommentCreate',
    props:{
        movie:Object,
    },
    data(){
        return{
            comment: '',
            myMovieRate: 0,
        }
    },
    methods:{
      getToken(){
        const token = localStorage.getItem('jwt')

        const config ={
          headers: {
            Authorization: `JWT ${token}`
          }
        }
        return config
      },
      createComment(){
        const config = this.getToken()

        const commentItem = {
          comment: this.comment,
          rank:this.myMovieRate,
          movie: this.movie.id,
        }
        console.log(commentItem)
        if (commentItem.title){
          axios.post(`http://127.0.0.1:8000/api/v1/movies/${this.movie.id}/comments`, commentItem, config)
            .then(()=>{
              this.$emit('comment-updated')
              this.comment = ""
              this.rank = 0
            })
            .catch(err => {
              console.log(err)
            })
        }
          // const url =  'http://127.0.0.1:8000/api/v1/comments/'
          // axios({
          //     method:'post',
          //     url: url,
          //     headers:{
          //         Authorization: `Token ${ this.$store.state.token }`
          //     }
          // })
          //     .then((res)=>{
          //         this.comments.push(res)
          //         console.log(this.comment)
          //     })

          //     .catch((err)=>{
          //         console.log(err)
          //     })
        }   
    }
}
</script>

<style>
.input1{
    color:white
}
</style>
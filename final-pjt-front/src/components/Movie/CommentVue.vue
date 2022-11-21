<template>
  <div>
    <input type="text"
    v-model.trim="this.comment"
    @keyup.enter="createComment(comment)"
    class="input1">
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'CommentVue',
    props:{
        movie:Object,
    },
    data(){
        return{
            comment: null,
            comments: [],
        }
    },
    methods:{
        createComment(){
            const url =  'http://127.0.0.1:8000/api/v1/comments/'
            axios({
                method:'post',
                url: url,
                headers:{
                    Authorization: `Token ${ this.$store.state.token }`
                }
            })
                .then((res)=>{
                    this.comments.push(res)
                    console.log(this.comment)
                })

                .catch((err)=>{
                    console.log(err)
                })
        }   
    }
}
</script>

<style>
.input1{
    color:white
}
</style>
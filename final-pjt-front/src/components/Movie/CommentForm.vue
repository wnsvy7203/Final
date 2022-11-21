<template>
  <div>
    <input type="text"
    v-model.trim="comment"
    @keyup.enter="createComment"
    id="input1">
    <p>{{movie.id}}</p>
  </div>
</template>

<script>
export default {
    name: 'CommentForm',
    data(){
        return {
            
            comment:null,
        }
    },
    props:{
        movie: Object,
    },

    methods:{
        createComment(){
            const payload={
                comment:this.comment,
                movie_id: this.movie.id,
            }
            this.$store.dispatch('createComment', payload)
            this.comment=null
        }
    }
}
</script>

<style>
#input1 {
    background-color: white;
    color: black;
    
}
</style>
<template>
  <div>
    <p>댓글 리스트</p>
    <div>
      <CommentListItem
      v-for="(comment,index) in newComments"
      :key="index"
      :comment="comment"
      />
    </div>
  </div>
  
</template>

<script>
import CommentListItem from '@/components/Movie/CommentListItem'
export default {
    name:'CommentList',
    components:{
      CommentListItem
    },
    props:{
        movie: Object,
    },
    data(){
      return {
        comments: this.$store.state.comment,
      }
    },
    computed:{
      newComments() {
        return this.$store.state.comments.filter(this.commentFilter)
      }
    },
    methods: {
      commentFilter(comment) {
        return (comment.movie_id === this.movie.id)
      }
    }
}
</script>

<style>

</style>
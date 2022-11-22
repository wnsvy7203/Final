<template>
  <div>
    <CommentListItem
    :movie="movie"
    v-for="(comment, idx) in comments"
    :comment="comment"
    :key="idx"
    />
  </div>
</template>

<script>
import CommentListItem from '@/components/Movie/CommentListItem'
export default {
  name:'CommentList',
  props:{
    movie:Object,
  },
  components:{
    CommentListItem,
  },
  computed:{
    comments(){
      return this.$store.getters.getComment.data
    }
  },
  created() {
    const token = this.$store.state.token
    this.$store.dispatch('getComment', token)
  }
}
</script>

<style>

</style>
<template>
  <div>
    <CommentCreate
    @comment-updated="commentsUpdated"
    :movie=movie
    />

    <CommentList2
    :comments="comments"
    :movie="movie"
    />
  </div>
</template>

<script>
import axios from 'axios';
import CommentCreate from '@/components/Movie/CommentCreate.vue'
import CommentList2 from '@/components/Movie/CommentList2'
export default {
    name:'CommentVue',
    props:{
        movie:Object
    },
    components:{
      CommentCreate,
      CommentList2,
    },
    data(){
      return {
        comments: [],
      }
    },
    methods:{
      getToken: function () {
        const token = localStorage.getItem('jwt')

        const config = {
          headers: {
            Authorization: `JWT ${token}`
          },
        }
        return config
      },
      getComments: function () {
      const config = this.getToken()

      axios.get(`http://127.0.0.1:8000/api/v1/movies/${this.movie.id}/comments`, config)
      .then((res) => {
        // console.log(res)
        this.comments = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    commentsUpdated: function () {
      this.getComments()
    },
    }
}
</script>

<style>

</style>
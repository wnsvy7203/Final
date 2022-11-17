<template>
  <div>
    <img :src="imgSrc" style="width: 300px">
    <p class="fonts">{{ movie.title }}</p>
    <p class="str fonts arrange">{{ movie.overview }}</p>
    <p>평점 : {{ movie.vote_average }}</p>
    <VideoDetail/>
    <!-- <iframe
      :src="getYoutubeKey()" 
    ></iframe> -->
    <CommentForm
    :movie="movie"
    />
    <CommentList
    :movie="movie"
    />
    
  </div>
</template>

<script>
import VideoDetail from '@/components/VideoDetail'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
// const API_KEY = process.env.VUE_APP_TMDB_API_KEY

export default {
  name: 'DetailView',
  components: {
    VideoDetail,
    CommentForm,
    CommentList,
  },
  data() {
    return {
      movie: this.$route.params.movie,
      comment: this.$store.state.comment
    }
  },
  computed: {
    imgSrc() {
      console.log(this.movie)
      return 'https://image.tmdb.org/t/p/original/'+this.movie.poster_path
    },
    background() {
      return 'https://image.tmdb.org/t/p/original/'+this.movie.backdrop_path
    },

  },
}
</script>

<style>
.fonts {
  font-weight: bold;
}

.str{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

</style>


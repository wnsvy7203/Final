<template>
  
  <div>
    <img :src="imgSrc" style="width: 300px">  
    <p class="fonts">{{ movie.title }}</p>
    <p class="fonts str fonts arrange">{{ movie.overview }}</p>
    <h5 style="margin-bottom:10px" class="content-font">평점 : {{ movie.vote_average }}점</h5>
    <p>{{movie}}</p>
    <DetailVideoView
    :movie="movie"/>
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
import DetailVideoView from '@/components/DetailVideoView'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
// const API_KEY = process.env.VUE_APP_TMDB_API_KEY

export default {
  name: 'DetailView',
  components: {
    DetailVideoView,
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


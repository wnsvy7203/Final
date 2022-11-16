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
  </div>
</template>

<script>
import VideoDetail from '@/components/VideoDetail'

// const API_KEY = process.env.VUE_APP_TMDB_API_KEY

export default {
  name: 'DetailView',
  components: {
    VideoDetail
  },
  data() {
    return {
      movie: this.$route.params.movie
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
  // methods: {
  //   getYoutubeKey() {
  //     return `https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=${API_KEY}&language=ko-KR`
  //   },
  // },
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


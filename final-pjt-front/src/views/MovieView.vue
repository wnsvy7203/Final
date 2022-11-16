<template>
  <div class="row mt-3 mx-3" style="">
    
    <carousel :autoplay="true" :nav="false">
    <p v-for="(movie,index) in totalMovie"
    :key="index">
      <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`">
    </p> 
    </carousel>

    <div>
    <MovieCard :movie="movie"/>
    </div>


  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import carousel from 'vue-owl-carousel'

export default {
  name:'MovieView',
  data(){
      return {
          movie: this.$route.params.movie
      }
  },

  components: {
    MovieCard,
    carousel
  },

  computed: {
    totalMovie() {
      console.log(this.$store.state.MovieJsonData)
      return this.$store.state.MovieJsonData
    },
    // getMovie() {
    //   return this.$store.getters.getMovieJsonData
    // },
  },
  beforeMount() {
    this.$store.dispatch('getMovieJson')
  }
}
</script>

<style>



</style>

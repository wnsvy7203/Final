<template>
  <div class="row mt-3 mx-3" style="width:100%; height:30%">
    <carousel :nav="false">
    <p 
      v-for="(movie, index) in totalMovie"
      :key="index">
      <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"

      @mouseup="moveDetail(movie)">

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
  name: 'MovieView',
  data() {
    return {
      movie: null,
    }
  },
  components: {
    MovieCard,
    carousel
  },
  methods: {
    moveDetail() {
      this.$router.push({ name:'DetailMovie', params: { movie: this.movie } })
    },
  },
  computed: {
    totalMovie() {
      this.$store.dispatch('getMovieJson')
      return this.$store.getters.getMovie
    }
  },
}
</script>

<style>



</style>

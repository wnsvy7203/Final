<template>
  <div class="row mt-3 mx-3" style="width:100%; height:30%">
    <carousel :nav="false">
    <p 
      v-for="(movie, index) in totalMovie"
      :key="index"
    >
      <img
        :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
        @mouseup="moveDetail(movie)"
      >
    </p>
    </carousel>
    <div>
      <MovieDetail :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail';
import router from '@/router'
import carousel from 'vue-owl-carousel'

export default {
  name: 'MovieView',
  data() {
    return {
      movie: null,
    }
  },
  components: {
    MovieDetail,
    carousel
  },
  methods: {
    moveDetail(movie) {
      router.push({ name: 'detail', params: { movie } })
    },
    getMovieJson(){
      this.$store.dispatch('getMovieJson')
    }
  },
  computed: {
    totalMovie() {
      return this.$store.getters.getMovie
    }
  },
  created() {
    this.getMovieJson()
  }
}
</script>

<style>



</style>

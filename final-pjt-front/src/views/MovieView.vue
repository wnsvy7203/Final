<template>
  <div class="row mt-3 mx-3 d-flex justify-content-center" style="width: 50%; height: 30%">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(movie, index) in totalMovie"
        :key="index"
        :img-src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
        html="moveDetail"
        >
      </b-carousel-slide>
    </b-carousel>
    <MovieDetail :movie="movie"/>
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail';
import router from '@/router'

export default {
  name: 'MovieView',
  data() {
    return {
      movie: null,
      slide: 0,
      sliding: null
    }
  },
  components: {
    MovieDetail,
  },
  methods: {
    // doMouseOver(movie) {
    //   movie.
    // },
    moveDetail(movie) {
      router.push({ name: 'detail', params: { movie } })
    },
    getMovieJson() {
      this.$store.dispatch('getMovieJson')
    },
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
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

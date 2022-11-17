<template>
  <div class="row mt-3 mx-3 d-flex" style="height: 30%">
    <b-carousel
      id="carousel-1"
      class="justify-content-center"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      style="text-shadow: 1px 1px 2px #333; width: 100%; height: 30%"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="movie in totalMovie"
        :key="movie.id"
      >
        <template #img>
          <img
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            @click="moveDetail(movie)"
            style="width: 100%; height: 70%;"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
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
  methods: {
    moveDetail(movie) {
      router.push({ name: 'detail', params: { movie, id: movie.id } })
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

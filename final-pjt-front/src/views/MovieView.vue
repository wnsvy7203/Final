<template>
  <div v-if="totalMovie"

  class="row mt-3 mx-3 d-flex justify-content-center" style="width: 50%; height: 30%">
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
        v-for="(movie) in totalMovie"
        :key="movie.id"
      >
        <template #img>
          <img
          :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" @click="moveDetail(movie)"
          width="100%"
          height="100%"
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

      slide: 0,
      sliding: null
    }
  },
  components: {
    
  },
  methods: {
    // doMouseOver(movie) {
    //   movie.
    // },
    moveDetail(movie) {
      console.log(movie.id)      
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

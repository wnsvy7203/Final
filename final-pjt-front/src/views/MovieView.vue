<template>
  <div id="app" >
    <h1>인기 영화</h1>
    <div class="mt-3 mx-3">
      <vue-glide class="glide__track"
        data-glide-el="track"
        ref="slider"
        type="carousel"
        :breakpoints="{3000: {perView: 7}, 1100: {perView: 6}, 600: {perView: 3}}"
      >
        <vue-glide-slide 
          v-for="movie in totalMovie"
          :key="movie.id">
          
          <img
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            @click="moveDetail(movie)"
            style="width: 100%; height: 70%;"
            
          >
        </vue-glide-slide>
      </vue-glide>
    </div>

    <!-- 다음 영화 목록 -->
    <div>
      <h1> 다음 영화 리스트</h1>
    </div>



  </div>
</template>

<script>
import router from '@/router'
import { Glide, GlideSlide } from 'vue-glide-js'


export default {
  name: 'MovieView',
  components:{
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  }, 
  methods: {
    moveDetail(movie) {
      router.push({ name: 'detail', params: { movie, id: movie.id } })
    },
    getMovieJson() {
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

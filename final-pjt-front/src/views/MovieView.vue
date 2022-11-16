<template>
  <div class="row mt-3 mx-3" style="width:100%; height:30%">
    
    <carousel :nav="false">
    <p v-for="(movie,index) in totalMovie"
    :key="index">
      <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
      @click="moveDetail">
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
  methods:{
    moveDetail(){
            this.$router.push({name:'DetailMovie', params: {movie: this.movie}})
            console.log(this.movie.id)
        }
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

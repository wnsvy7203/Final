<template>
  <div>
    <MovieListItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
    />
  </div>
</template>

<script>
import MovieListItem from './MovieListItem.vue'

export default {
    name:'MovieList',
    components:{
        MovieListItem
    },
    computed: {
        movies(){
            return this.$store.movies
        }
    }
}
</script>

<style>

</style>
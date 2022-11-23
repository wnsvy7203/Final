<template>
  <div class="search my-5" >
    <div class="row row-cols-1 row-cols-md-5 gy-3">
      <div v-if="movies">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"  
        />
      </div>
      <div v-else class="search">
        <h1>검색 결과가 없습니다</h1>
      </div>
      

    </div>
  </div>

</template>
<script>
import axios from 'axios'

import MovieCard from '@/components/Movie/MovieCard'
const API_KEY = '048f1b44f3f7ceec6752538826583420'

export default {
  name: 'MovieSearch',
  data () {
    return {
      query: this.$store.state.searchQuery,
      movies: '',
    }
  },
  components:{
    MovieCard
  },
  methods:{
    getResult() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.query}`)
        .then(response => {
          this.movies = response.data.results
          console.log(this.movies)
        })
    }
  },
}

</script>

<style>
.search{
  color:white
}

.imgmouserOver{
  width: 100%;
  height: auto;
  margin: 0px auto;
}
.imgmouserOver:hover img{
  transform: scale(1.5,1.5); transition-duration: 0.5s;
  opacity: 1;
}

#input1{
  background-color: white;
  color: black
}
</style>
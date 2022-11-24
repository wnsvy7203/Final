<template>
  <div class="search my-5 container" style="min-height:100vh; " >
    <input type="text" id="input1" v-model="query" @keyup="getResult(query)"
    placeholder="제목을 검색해보세요">
    <div class="lineUp row row-cols-1 row-cols-md-5 gy-3">
      
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"  
      />
      
      <div v-if="!this.movies" style="height:75vh; ">
        <div style=" margin-top:40%; ">검색 결과가 없습니다</div>
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
      query: null,
      movies: '',
    }
  },
  components:{
    MovieCard
  },
  methods:{
    getResult(query) {
      console.log(query)
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`)
        .then(response => {
          this.movies = response.data.results
          console.log(response.data)
          console.log(this.movies)
        })
    }
  },
}

</script>

<style>
.search{
  color:white;

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
  width:400px;
  height:40px;
  font-size: 20px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: white;
  color: black;
  margin-bottom: 50px;
}
.lineUp{
  display: flex;
  margin-left: 5rem;
  margin-right: 5rem;
}
</style>
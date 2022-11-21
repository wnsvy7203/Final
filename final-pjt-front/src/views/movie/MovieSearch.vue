<template>
  <div class="search">
    
    <input type='text' v-model='query' @keyup='getResult(query)'>
    <div v-for="result in results"
    :key="result.id"
    class="d-inline-flex"
    >
    <span class="imgmouserOver">
      <img v-bind:src="'http://image.tmdb.org/t/p/w500/'+result.poster_path" width='50%'
      @click="moveDetail(result)">
      <p>{{ result.title }}</p>

    </span>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import router from '@/router'

const API_KEY = '048f1b44f3f7ceec6752538826583420'

export default {
  name: 'MovieSearch',
  data () {
    return {
      query: '',
      results: '',
    }
  },
  methods:{
    getResult(query) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then(response => {
          this.results = response.data.results
        })
        console.log(this.results)
    },
    moveDetail(movie) {
      router.push({ name: 'detail', params: { movie, id: movie.id } })
    },
  }
}

</script>

<style>
.imgmouserOver{
  width: 100%;
  height: auto;
  margin: 0px auto;
}
.imgmouserOver:hover img{
  transform: scale(1.5,1.5); transition-duration: 0.5s;
  opacity: 1;
}
</style>
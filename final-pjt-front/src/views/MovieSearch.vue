<template>
  <div class="search">
    <input type='text' v-model='query' @keyup='getResult(query)'>
    <div v-for="result in results"
    :key="result.id"
    class="d-inline-flex"
    >
    <span>
      <img v-bind:src="'http://image.tmdb.org/t/p/w500/'+result.poster_path" width='75%'>
      <p>{{ result.title }}</p>

    </span>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

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
    }
  }
}

</script>
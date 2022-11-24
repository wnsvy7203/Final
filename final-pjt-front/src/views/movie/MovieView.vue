<template>
  <div id="app" >
    <h1 style="color:white; margin:50px">인기 영화</h1>
    <div class="row row-cols-1 row-cols-md-5 gy-3 imgmouserOver">
      <MovieCard
        v-for="(movie, idx) in totalMovie"
        :key="idx"
        :movie="movie"/>
    </div>
    <div data-app>
      <MyComponent/>
    </div>
  </div>
</template>

<script>

import MovieCard from '@/components/Movie/MovieCard'

export default {
  name: 'MovieView',
  components: {
    
    MovieCard,
    
  },
  methods: {
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
.imgmouserOver{
  width: 100%;
  height: auto;
  margin: 0px auto;
}

.imgmouserOver:hover img{
  transform: scale(1.5,1.5); transition-duration: 0.5s;
  opacity: 1;
}

.info {
  color: #fff;
  position: absolute; left: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.35s ease-in-out;
}

.info h3 {
  font-size: 24px;
  padding-bottom: 0.4em;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
}

</style>

<template>
  <div class="card justify-content-center">
    <div v-if="movie" class="cards arrange2">
      <br>
      <img
        :src="imgSrc" style="width: 300px"
        @click="moveDetail"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props:{
      movie: Object
  },
  computed: {
    getMovie() {
      return this.$store.getters.getMovieJsonData
    },
    imgSrc() {
      return 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path
    },        
  },
  methods: {
    MovieJson() {
      this.$store.dispatch('getMovieJson')
    },
    moveDetail() {
      this.$router.push({ name:'DetailView', params: { movie: this.movie } })
    }
  },
  
}
</script>

<style>
.str {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.cards {
  width: 600px;
}

.fonts {
  font-weight: bold;
}

.arrange {
  padding-left: 40px;
}
.arrange2 {
  padding-left: 100px;
}
</style>
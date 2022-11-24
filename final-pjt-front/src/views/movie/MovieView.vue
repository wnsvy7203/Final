<template>
  <div id="app" >
    <div class="row row-cols-1 row-cols-md-5 gy-3 imgmouserOver">
      <MovieCard
        v-for="(movie, idx) in totalMovie"
        :key="idx"
        :movie="movie"/>
    </div>
    
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
          :key="movie.id"
          class="imgmouserOver"
          >
          <div>
            <MovieCard
              :movie="movie"
            />
          </div>
        </vue-glide-slide>
      </vue-glide>
    </div>

    
    <div>
      <h1> 다음 영화 리스트</h1>
    </div>
    <div data-app>
      <MyComponent/>
    </div>
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import MovieCard from '@/components/Movie/MovieCard'

export default {
  name: 'MovieView',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
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

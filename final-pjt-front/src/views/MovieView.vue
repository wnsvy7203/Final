<template>
  <div id="app" >
<<<<<<< HEAD
    
=======
>>>>>>> 31df5b3b801762cc46b85fa37bdd596b4554b57a
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
<<<<<<< HEAD
          :key="movie.id"
          class="box">
          <div class="imgmouserOver">
            
            <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" style="width: 100%; "
            @click="moveDetail(movie)">
            
          </div>
          <div class="info">
            <h3>제목출력</h3>
          </div>
        </vue-glide-slide>
      </vue-glide>

=======
          :key="movie.id">
          
          <img
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            @click="moveDetail(movie)"
            style="width: 100%; height: 70%;"
            
          >
        </vue-glide-slide>
      </vue-glide>
>>>>>>> 31df5b3b801762cc46b85fa37bdd596b4554b57a
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
<<<<<<< HEAD
    
  }, 
  data(){
    return{
      modalState: false,
    }
  },
=======
>>>>>>> 31df5b3b801762cc46b85fa37bdd596b4554b57a
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

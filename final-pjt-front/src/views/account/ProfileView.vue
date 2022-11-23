<template>
  <div class="container profileStyle">
    <h1 class="mt-3">My Profile</h1>
    <div>
      {{this.username}}님이 찜한 영화

    </div>

    <div v-if="movie_list[0]">
      <h1 id="first">{{movie_name[0]}} 영화</h1>
      <div class="row row-cols-1 row-cols-md-5 gy-3">
        <br>
        <MovieCard
        v-for="movie in movie_list[1]" 
        :key="movie.id"
        :movie="movie"
        />          
      </div>
    </div>
    <!-- 3d 캐러셀 -->
    <!-- <div id="example">
      <carousel-3d :disable3d="true" :space="365" :clickable="false" :controls-visible="true">
        <slide v-for="(movie, i) in movie_list[0]" :index="i"
        :key="i">
          <MovieCard
            :movie="movie"
          />
        </slide>
      </carousel-3d>
    </div> -->

    <!-- 글라이드 -->
    <!-- <div class="mt-3 mx-3">
      <vue-glide class="glide__track"
        data-glide-el="track"
        ref="slider"
        type="carousel"
        :breakpoints="{3000: {perView: 7}, 1100: {perView: 6}, 600: {perView: 3}}"
      >
        <vue-glide-slide 
          v-for="movie in movie_list[0]"
          :key="movie.id"
          style="width:250px;"
          class="imgmouserOver"
          >
          <div>
            <MovieCard
              :movie="movie"
            />
          </div>
        </vue-glide-slide>
      </vue-glide>
    </div> -->

    <!-- <div v-if="movie_list[0]">
      <h1>(장르) 영화</h1>
      <div class="row row-cols-1 row-cols-md-5 gy-3">
        <br>
        <MovieCard
        v-for="movie in movie_list[0]" 
        :key="movie.id"
        :movie="movie"
        />          
      </div>
    </div> -->
    

    <div v-if="movie_list[1].length">
      <h1 id="second">{{movie_name[1]}} 영화</h1>
      <div class="row row-cols-1 row-cols-md-5 gy-3">
        <br>
        <MovieCard
        v-for="movie in movie_list[1]" 
        :key="movie.id"
        :movie="movie"
        />          
      </div>
    </div>

    <div v-if="movie_list[2].length">
      <h1 id="third">{{movie_name[2]}} 영화</h1>
      <div class="row row-cols-1 row-cols-md-5 gy-3">
        <br>
        <MovieCard
        v-for="movie in movie_list[2]" 
        :key="movie.id"
        :movie="movie"
        />          
      </div>
    </div>

          
    <!-- <div
      v-if="movie_pk.length !== 0"
      class="row row-cols-1 row-cols-md-5 gy-3 imgmouserOver"
    >
      선호 장르 추천 영화
      <hr>
      <div>
        <div v-for="movie in movie_list[0]"
        :key="movie.id"
        {{movie}} 
        >

        </div>
      </div>
        <MovieCard
          v-for="(movie, idx) in list"
          :key="idx"
          :movie="movie"
          

        />
        <hr>
      </div>
    </div>
    <div
      v-else
    >
      선호 장르가 없습니다
      <hr>
      <MovieCard
        v-for="(movie, idx) in totalMovie"
        :key="idx"
        :movie="movie"
      />
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import MovieCard from '@/components/Movie/MovieCard'
// import { Glide, GlideSlide } from 'vue-glide-js'
// import { Carousel3d, Slide } from 'vue-carousel-3d';

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  components: {
    MovieCard,
    // [Glide.name]: Glide,
    // [GlideSlide.name]: GlideSlide,
    // Carousel3d,
    // Slide,
  },
  data() {
    return {
      token: null,
      movie_pk: [],
      movie_name: [],
      movie_list: {
        0: [],
        1: [],
        2: [],
      },
      else_movie_list: [],
      username: this.$store.state.payload.username
    }
  },
  methods: {
    getMyMovie() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/my/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
      })
        .then(res => {
          this.movie_pk = res.data.like_genres
        })
        .then(() => {
          if (this.movie_pk.length !== 0) {
            for (let i=0; i<this.movie_pk.length; i++) {
              axios({
                method: 'get',
                url: `${API_URL}/api/v1/genres/${this.movie_pk[i]}/`,
                
              })
                .then(res => {
                  this.movie_name.push(res.data.name)
                  console.log('GENRE_NAME', res.data.name)
                  this.movie_list[i] = _.sampleSize(res.data.genre_movies, 10)
                  console.log('MOVIE', this.movie_list[i], typeof this.movie_list[i])
                })
            }
          }
        })
    },
    totalMovie() {
      this.else_movie_list = _.sampleSize(this.$store.state.MovieJsonData, 10)
    }
  },
  created() {
    this.getMyMovie()
    .then(
      console.log(this.movie_list)
    )
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap');


.profileStyle{
  background-color: black;
  color: white;
}

.list0{
  width:100px;
  border: 1px solid red;
}

#first{
  
  margin: 50px;
}

#second{
  margin: 50px;
}

#third{
  margin: 50px;
}

</style>


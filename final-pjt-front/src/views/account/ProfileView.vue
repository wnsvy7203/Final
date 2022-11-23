<template>
  <div class="container profileStyle">
    <h1 class="mt-3">My Profile</h1>
    <div>
      {{this.username}}님이 찜한 영화
    </div>
    <div
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

      <div>

      </div>
      <div
        v-for="(list, idx) in movie_list"
        :key="idx"
      >
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
        v-for="(movie, idx) in else_movie_list"
        :key="idx"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import MovieCard from '@/components/Movie/MovieCard'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  components: {
    MovieCard
  },
  data() {
    return {
      token: null,
      movie_pk: [],
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
    this.totalMovie()
  },
}
</script>

<style>
.profileStyle{
  background-color: white;
  color: black
}
</style>
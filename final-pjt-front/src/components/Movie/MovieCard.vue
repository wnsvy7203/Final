<template>
  <div class="col-mb-6 movie-detail">
    <v-dialog v-model="dialog"
    hide-overlay
    transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-img :src="imgSrc" alt="없음"
        v-bind="attrs"
        v-on="on">    
      </v-img>
    </template>
    <div class="movie-card">
      <div :style="{'background-image' : `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}" 
      class="bgImg">
        <div class="movie-toolbar">
          <v-btn
            icon
            dark
            @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <!-- <img id="logo-image" src="@/assets/images/logo.png"/> -->
        </div>
        <!-- 팝업 창 -->
        <div class="movie-body">
          <div class="movie-poster">
            <img :src="imgSrc" alt="포스터 없음">
          </div>
          <div class="movie-info">
            <!-- info header -->
            <div class="movie-upper">
              <div class="movie-info-header">
                <div class="movie-info-header-left">
                  <div class="movie-title">
                    {{ movie.title }}
                  </div>
                  <div
                  v-if="movie.released_date"
                  class="movie-release-date">
                    {{ movie.released_date }}
                    
                  </div>
                  <!-- <div
                  v-if="movie.genres">
                    {{ movie.genres }}
                  </div> -->
                </div>
                <div class="movie-info-header-right">
                  <div class="movie-vote">
                    평점 : {{ movie.vote_average }}
                  </div>
                  <!-- <img id="movie-star" src="@/assets/images/star.png"> -->
                </div>
              </div>
              <!-- info overview -->
              <div class="movie-overview-header">
                
              </div>
              <hr>
              <div
                v-if="movie.overview"
                class="movie-overview-body">
                {{ movie.overview }}
              </div>
              <div v-else
                class="movie-overview-body">
                해당 영화는 줄거리가 제공되지 않습니다.
              </div>
            </div>
            <br>
            <div>
            </div>
            <div class="movie-lower">
              <!-- youtube -->
              <div class="movie-youtube-area">
                <LikeMovie
                :movie="movie"
                />
                <h3>
                  관련 영상
                </h3>
                <hr>
                <YoutubeList
                :movie="movie"/>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div style="color:white;">
        <CommentList
        :movie="movie"
        />
      </div>
    </div>
    </v-dialog>
  </div>
</template>

<script>

import YoutubeList from '@/components/Movie/YoutubeList'
import CommentList from '@/components/Movie/CommentList'
import LikeMovie from '@/components/Movie/LikeMovie'

export default {
  name:'MovieCard',
  props:{
    movie: Object
  },
  components: {
    CommentList,
    YoutubeList,
    LikeMovie,
},
  data(){
    return{
      dialog: false,
      likeUserId : [],
    }
  },
  methods:{
    addLike(){

    }
  },
  computed: {
  imgSrc: function () {
    return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
  },
},


}
</script>

<style>

.movie-detail {
  position: relative;
  display: block;
  flex: 1 1 0px;
  transition: transform 500ms;
}

.movie-detail:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition-duration: 0.5s
}

.movie-card {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 2rem;
  min-height: 100%;
  height: auto;
  background-color: #000000;
}

.movie-toolbar {
  height: 56px;
}

.movie-body {
  display: flex;
  flex-flow: row wrap;
  margin: 1rem;
}

.movie-info {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  margin: 1rem 0 0 4rem;
  width: 60%;
  color: white;
}

.movie-info-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 80px;
}
.movie-poster > img {
  width: 500px;
}

.movie-title {
  font-size: 50px;
}

.movie-info-header-right {
  font-size: 25px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.movie-overview-header {
  font-size: 30px;
}

.bgImg{
  height: 100vh;
    background: no-repeat center;
    background-size: cover;
    width: 100%;
    height: auto;

}

</style>

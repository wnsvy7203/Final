<template>
<div class="movie-detail">
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
      <div :style="{'background-image' : `url(https://image.tmdb.org/t/p/original/${movie.get_backdrop_path})`}" 
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
            <div class="movie-lower">
              <!-- youtube -->
              <div class="movie-youtube-area">
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
        <CommentForm
        :movie="movie"
        />
        <CommentList
        :movie="movie"
        />    
      </div>
    </div>
    comment
    
    </v-dialog>

    
  </div>
</template>

<script>
import CommentForm from '@/components/Movie/CommentForm'
import CommentList from '@/components/Movie/CommentList'
import YoutubeList from '@/components/Movie/YoutubeList'

export default {
    name:'MovieSearchItem',
    props:{
        result:Object
    },
    components:{
      CommentForm,
      CommentList,
      YoutubeList,
    },
    data(){
      return {
        dialog: false
      }
    }
}
</script>

<style>

</style>
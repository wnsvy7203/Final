<template>
  <!-- <div :style="{ backgroundImage : `url(${this.background})`}"> -->
    <div>
    <div>
      <img :src="imgSrc" style="width: 300px">
      <p class="fonts">{{ movie.title }}</p>
      <p class="str fonts arrange">{{ movie.overview }}</p>
      <p>평점 : {{movie.vote_average}}</p>
      <VideoDetail/>
      <!-- <iframe width="100%" height="100%" :src="youtube()"></iframe> -->
      <iframe
      :src="getYoutubeKey()"
      ></iframe>
      <p></p>
    </div>
  </div>
</template>

<script>
// const API_URL = 'http://127.0.0.1:8000'
// import axios from 'axios';
import VideoDetail from '@/components/VideoDetail'

const API_KEY = '54f36fb75007c2e17a09cf9651dcdae2'
// const YoutubeUrl = `https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=${API_KEY}&language=en-US`

export default {
    name: 'DetailMovie',
    components:{
        VideoDetail
    },
    data(){
        return {
            movie: this.$route.params.movie
        }
    },
    create(){
        this.getMovieDetail()
    },
    computed:{
        imgSrc(){
            return 'https://image.tmdb.org/t/p/original/'+this.movie.poster_path
        },
        background(){
            return 'https://image.tmdb.org/t/p/original/'+this.movie.backdrop_path
        },
    },
    methods: {
        getYoutubeKey() {
            // console.log(YoutubeUrl)
            return `https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=${API_KEY}&language=en-US`
        //   return `https://www.youtube.com/embed/${src}`;
        },
        // youtubeUrl(){
        //     return `https://www.youtube.com/embed/${YoutubeUrl.result[0].key}?autoplay=1`
        // }
    

        // getMovieDetail(){
        //     axios({
        //         method: 'get',
        //         url: `${API_URL}/api/v1/movies/${this.$route.params.id}`
                
        //     })
        //         .then((res) =>{
        //             console.log(this.$route.params.id)
        //             console.log(res)
                    
        //         })
        //         .catch((err) =>{
        //             console.log(err)
        //         })
        // }

    }
}
</script>

<style>
.fonts {
    font-weight: bold;
}
.str{text-overflow: ellipsis;

white-space: nowrap;

overflow: hidden}



</style>


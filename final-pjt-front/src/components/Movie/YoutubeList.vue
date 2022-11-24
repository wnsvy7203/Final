<template>
  <ul class="youtube-list">
    <YoutubeListItem class="container"
    v-for="(video) in this.youtubeVideo"
    :key="video.idx"
    :video="video"
    />    
    
  </ul>
</template>

<script>
import YoutubeListItem from '@/components/Movie/YoutubeListItem'
import axios from 'axios'

const API_KEY = '048f1b44f3f7ceec6752538826583420'
export default {
  name: 'YoutubeList',
  props: {
    movie: Object,
  },
  components:{
    YoutubeListItem
  },
  data(){
    return{
      youtubeVideo: [],
    }
  },
  methods:{
    getYoutubeKey(){
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.movie.get_id}/videos?api_key=${API_KEY}&language=en-US`
      })
      .then(res => {
        
        this.youtubeVideo = res.data.results.slice(0,3)
      })
    }
  },
  created(){
    this.getYoutubeKey()
  }

  // created(){
  //   this.$store.dispatch('getYoutube', this.movie)
  // }
}
</script>

<style>
.youtube-list{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  list-style-type: none;
  padding-left: 0;
}


</style>
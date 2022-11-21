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
      youtubeVideo: this.$store.state.youtubeVideos
    }
  },
  created(){
    this.$store.dispatch('getYoutube', this.movie.title)
  }
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
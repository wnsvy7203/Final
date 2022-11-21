<template>
  <div>
    <YoutubeListItem
    v-for="(video) in this.youtubeVideo"
    :key="video.idx"
    :video="video"
    
    />
    
  </div>
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
</style>
<template>
  <span class="youtube-video">
    <v-dialog 
    v-model="dialog"
    hide-overlay
    width="1000px"
    >

      <template 
      v-slot:activator="{on, attrs}">
      
      <img :src="imgSrc" alt="없어용"
      v-bind="attrs"
      v-on="on"
      width="160px" 
      >
      {{ video }}
      </template>

      <div class="video-container">
        <iframe :src="YoutubeUrl"></iframe>
      </div>      
    </v-dialog>
  </span>
</template>

<script>
export default {
  name: 'YoutubeListItem',
  data(){
    return{
      dialog: false
    }
  },
  props:{
    video: Object,
  },
  computed:{
    imgSrc(){
      return this.video.snippet.thumbnails.high.url

    },
    YoutubeUrl(){
      const videoId = this.video.id.videoId
      return `https://www.youtube.com/embed/${videoId}`
    }
  }
}
</script>

<style>
.youtube-video{
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 500ms;
  
}

.youtube-video:hover{
  cursor: pointer;
  transform: scale(1.2);
  transition-duration: 0.5s
}

.video-container {
  position: relative;   /* iframe을 container를 기준으로 위치를 지정 */
  padding-top: 56.25%;  /* 유튜브 비디오 비율을 맞추기 위한 높이 설정 */
}

.video-container > iframe {
  position: absolute;   /* container를 기준으로 위치를 지정*/
  top: 0;               /* container의 가장 위쪽으로 위치를 지정 */
  left: 0;
  width: 100%;
  height: 100%;
}


</style>
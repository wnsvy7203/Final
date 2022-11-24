<template>
  <div class="flex-container">
    <div class="youtube-video">
      <iframe :src="YoutubeUrl" frameborder="0"></iframe>
    </div>
    <!-- <span class="youtube-video">
      <v-dialog 
      v-model="dialog"
      hide-overlay
      width="1000px"
      >
      
      <template 
      v-slot:activator="{on, attrs}">
      <iframe :src="YoutubeUrl" frameborder="0"></iframe>
      <img :src="imgSrc"
      v-bind="attrs"
      v-on="on"
      >
    </template>
    <div class="youtube-dialog-card">
      <div class="video-container">
            <p>가나다라</p>
          <iframe :src="YoutubeUrl"></iframe>
          </div>      
        </div>
      </v-dialog>
    </span> -->
  </div>

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
    // imgSrc(){
    //   return this.video.snippet.thumbnails.high.url

    // },
    YoutubeUrl(){
      const videoId = this.video.key
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
.youtube-video > img {
  height: fit-content;
  width: 200px;
  border: 1px solid #eee;
}

.video-container {
  position: relative;   /* iframe을 container를 기준으로 위치를 지정 */
  padding-top: 56.25%;  /* 유튜브 비디오 비율을 맞추기 위한 높이 설정 */
}

.youtube-dialog-card {
  display: flex;
  flex-flow: column wrap;
  background-color: #000000;
}

.video-container > iframe {
  position: absolute;   /* container를 기준으로 위치를 지정*/
  top: 0;               /* container의 가장 위쪽으로 위치를 지정 */
  left: 0;
  width: 100%;
  height: 100%;
}


</style>
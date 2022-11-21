<template>
  <span class="youtube-video">
    <v-dialog 
    v-model="dialog"
    hide-overlay
    width="1000px"
    >

      <template 
      v-slot:activator="{on, attrs}">
      
      <img :src="imgSrc"
      v-bind="attrs"
      v-on="on"
      >
      </template>
      <div class="youtube-dialog-card">

        <div class="video-container">
        <iframe :src="YoutubeUrl"></iframe>
        </div>      
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
.youtube-video > img {
  height: fit-content;
  width: 200px;
  border: 1px solid #eee;
}

.video-container {
  display: flex;
  flex-flow: column wrap;
  background-color: #000000;
}

.youtube-dialog-card {
  display: flex;
  flex-flow: column wrap;
  background-color: #000000;
}

.youtube-container > iframe {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
}


</style>
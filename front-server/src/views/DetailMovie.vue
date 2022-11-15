<template>
  <div>
    <img :src="imgSrc" style="width: 300px">
    <p class="fonts">{{ movie.title }}</p>
    <p class="str fonts arrange">{{ movie.overview }}</p>
    <p>평점 : {{movie.vote_average}}</p>
  </div>
</template>

<script>
// const API_URL = 'http://127.0.0.1:8000'
// import axios from 'axios';

export default {
    name: 'DetailMovie',
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
        }
    },
    methods: {
        

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

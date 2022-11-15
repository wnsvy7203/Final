<template>
  <div>
    <h1>Detail</h1>
    <p></p>
  </div>
</template>

<script>
const API_URL = 'http://127.0.0.1:8000'
import axios from 'axios';

export default {
    name: 'DetailMovie',
    data(){
        return {
            movie: null,
        }
    },
    create(){
        this.getMovieDetail()
    },
    methods: {
        getMovieDetail(){
            axios({
                method: 'get',
                url: `${API_URL}/movies/${this.$route.params.id}`
            })
                .then((res) =>{
                    console.log(res)
                    
                })
                .catch(err =>{
                    console.log(err)
                })
        }

    }
}
</script>

<style>

</style>

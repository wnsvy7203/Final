<template>
  <div>
    {{ movie.id }}
    <p>{{ movie.title}}</p>
    <router-link :to="{name:'DetailMovie', params:{id: article.id}}">[Detail]</router-link>
  </div>
</template>

<script>
export default {
    name:'MovieListItem',
    props:{
        movie: Object,
    }
}
</script>

<style>

</style>
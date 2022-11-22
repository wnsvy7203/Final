<template>
  <div>
    <ul>
        <li>
            <p>{{comment.context}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'CommentListItem',
    props:{
        comment: Object,
    },
    methods:{

    }
}
</script>

<style>

</style>
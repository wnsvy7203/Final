<template>
    <div>
        <p>{{comment.movie}}</p>
        <p>{{movie.id}}</p>
        <div >
            <ul class="app" v-if="comment.movie===movie.id">
                <li>{{comment.content}}</li>
            <!-- <button class="btn btn-primary" @click="updateComment">댓글 수정</button>
            <button class="btn btn-danger" @click="deleteComment">댓글 삭제</button> -->
          </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'CommentListItem',
    props:{
        comment: Object,
        movie: Object
    },
    data(){
        return{
            content: this.comment.content
        }
    },
    
}
</script>

<style>
.app{
    color: black
}
</style>
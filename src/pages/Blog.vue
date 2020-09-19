<template>
    <div class="blog">
        <!-- Main Blog Post -->
        <h1>{{post.title}}</h1>
        <p>Author: {{post.creator.name}}</p>
        <p>{{post.body}}</p>
        <!-- comments form -->
        <form class="form-inline d-flex flex-column" @submit.prevent="createComment">
            <div class="form-group d-flex flex-column align-items-start w-75">
                <textarea type="text" v-model="newComment.body" class="form-control w-100" placeholder="Your Text Here"
                    aria-describedby="helpId"></textarea>
            </div>
            <div v-if="this.newComment.body">
                <button type="submit" class="btn btn-success">Post Comment!</button>
            </div>
        </form>
        <!-- comments Display -->
        <comment-component v-for="comment in comments" :key="comment.id" :commentProp="comment" />
    </div>
</template>

<script>
    import commentComponent from "../components/CommentComponent";
    export default {
        name: "blog",
        mounted() {
            this.$store.dispatch("makeActiveBlog", this.$route.params.id);
            this.$store.dispatch("getComments", this.$route.params.id)
        },
        data() {
            return {
                newComment: {
                    body: null,
                    blog: this.$route.params.id,
                    creatorEmail: this.$store.state.profile.email,
                }
            };
        },
        computed: {
            post() {
                return this.$store.state.activeBlog;
            },
            comments() {
                this.newComment = {};
                return this.$store.state.comments;
            }
        },
        methods: {
            createComment() {
                if (this.newComment.body) {
                    this.$store.dispatch("createComment", this.newComment);
                }
                else {
                    console.log('Invalid Input: Title and Body are required fields');
                }
            },
        },
        components: {
            commentComponent
        }
    };
</script>
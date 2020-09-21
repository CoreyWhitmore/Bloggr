<template>
    <div class="blog">
        <!-- Main Blog Post -->

        <div v-if="!editMode" class="card">
            <img :src="post.imgUrl" alt="">
            <div class="card-body">
                <h1>{{post.title}}</h1>
                <p>Tags: {{post.tags}}</p>
                <p>Author: {{post.creator.name}}</p>
                <p>{{post.body}}</p>
                <div v-if="isCreator" class="d-flex justify-content-end">
                    <p>(_<i class="fas fa-pencil-alt" @click="toggleEdit"></i></p>
                    <p>) (</p>
                    <router-link :to="{name:'Home'}">
                        <p><i class="fa fa-trash text-dark" aria-hidden="true" @click="deleteBlog"></i>)</p>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- Edit Blog Form -->
        <div v-if="editMode" class="card">
            <form class="form-inline d-flex flex-column" @submit.prevent="editBlog">
                <div class="form-group d-flex flex-column">
                    <input type="text" v-model="post.title" class="form-control w-100" aria-describedby="helpId" />
                    <textarea type="text" v-model="post.body" class="form-control" placeholder="Your Text Here"
                        aria-describedby="helpId"></textarea>
                    <input type="text" class="form-control" v-model="post.imgUrl" placeholder="Img Url"
                        aria-describedby="helpId" />
                    <div class="form-check">
                        <label class="form-check-label active" for="publishCheck">
                            <input class="form-check-input active" type="checkbox" checked="checked" value=""
                                v-model="post.published" id="publishCheck">
                            Publish?
                        </label>
                    </div>
                </div>
                <div v-if="this.post.title && this.post.body">
                    <button @click="editBlog" type="submit" class="btn btn-success">Save</button>
                    <button @click="cancelEdit" class="btn btn-danger">Cancel</button>
                </div>
            </form>
        </div>
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
            this.$store.dispatch("getProfile")
        },
        data() {
            return {
                editMode: false,
                newComment: {
                    body: null,
                    blog: this.$route.params.id,
                    creatorEmail: this.$store.state.profile.email,
                    blogId: this.$store.state.activeBlog.id
                }
            };
        },
        computed: {
            post() {
                return this.$store.state.activeBlog;
            },
            comments() {
                return this.$store.state.comments;
            },
            blog() {
                return this.$store.state.activeBlog
            },
            isCreator() {
                return this.$store.state.profile.email == this.post.creatorEmail;
            },
        },
        methods: {
            createComment() {
                if (this.newComment.body) {
                    let storeComment = {
                        body: this.newComment.body,
                        blog: this.$route.params.id,
                        creatorEmail: this.$store.state.profile.email,
                    }
                    this.$store.dispatch("createComment", storeComment);
                }
                else {
                    console.log('Invalid Input: Title and Body are required fields');
                }
            },
            toggleEdit() {
                if (this.editMode) {
                    this.editMode = false
                }
                else {
                    this.editMode = true
                }
            },
            cancelEdit() {
                this.$store.dispatch("makeActiveBlog", this.$route.params.id);
                if (this.editMode) {
                    this.editMode = false
                }
                else {
                    this.editMode = true
                }
            },
            editBlog() {
                this.$store.dispatch("editBlog", this.blog)
                this.toggleEdit()
            },
            deleteBlog() {
                this.$store.dispatch("deleteBlog", this.blog.id)
            },
        },
        components: {
            commentComponent
        }
    };
</script>
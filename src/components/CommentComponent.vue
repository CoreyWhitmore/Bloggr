<template>
    <div class="comment-component">
        <div class="card text-dark">
            <div v-if="!editMode" class="card-body">
                <p>{{commentProp.creator.name}}</p>
                <p>{{this.comment.body}}</p>
                <div v-if="isCreator" class="d-flex justify-content-end">
                    <p>(_<i class="fas fa-pencil-alt" @click="toggleEdit"></i></p>
                    <p>) (</p>
                    <p><i class="fa fa-trash" aria-hidden="true" @click="deleteComment"></i>)</p>
                </div>
            </div>
            <!-- Edit Blog Form -->
            <div v-if="editMode" class="card">
                <form class="form-inline d-flex flex-column" @submit.prevent="editComment">
                    <div class="form-group d-flex flex-column">
                        <textarea type="text" v-model="comment.body" class="form-control"
                            aria-describedby="helpId"></textarea>
                    </div>
                    <div v-if="this.comment.body">
                        <button @click="editComment" type="submit" class="btn btn-success">Save</button>
                        <button @click="cancelEdit" class="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment-component",
        props: ["commentProp", "blogIdProp"],
        mounted() {
            this.$store.dispatch("getProfile")
        },
        data() {
            return {
                editMode: false,
                comment: {
                    body: this.commentProp.body,
                    id: this.commentProp.id,
                    blogId: this.blogIdProp
                },
            }
        },
        computed: {
            isCreator() {
                return this.$store.state.profile.email == this.commentProp.creatorEmail;
            }
        },
        methods: {
            editComment() {
                this.$store.dispatch("editComment", this.comment)
                this.toggleEdit()
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
                this.body = this.commentProp.body
                if (this.editMode) {
                    this.editMode = false
                }
                else {
                    this.editMode = true
                }
            },
            deleteComment() {
                this.$store.dispatch("deleteComment", this.comment.id)
            }
        }
    };
</script>
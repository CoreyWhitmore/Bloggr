<template>
    <div class="comment-component">
        <div class="card text-dark">
            <div v-if="!editMode" class="card-body">
                <p>{{commentProp.creator.name}}</p>
                <p>{{this.comment.body}}</p>
            </div>
            <!-- Edit Blog Form -->
            <div v-if="editMode" class="card">
                <form class="form-inline d-flex flex-column" @submit.prevent="editComment">
                    <div class="form-group d-flex flex-column">
                        <textarea type="text" v-model="this.comment.body" class="form-control"
                            aria-describedby="helpId"></textarea>
                    </div>
                    <div v-if="this.comment.body">
                        <button @click="toggleEdit" type="submit" class="btn btn-success">Save</button>
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
        data() {
            return {
                editMode: false,
                comment: {
                    body: this.commentProp.body,
                    id: this.commentProp.id,
                    blogId: this.blogIdProp
                }
            }
        },
        methods: {
            editComment() {
                this.$store.dispatch()
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
        }
    };
</script>
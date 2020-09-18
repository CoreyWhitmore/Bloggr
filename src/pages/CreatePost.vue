<template>
    <div class="create-blog">
        <form class="form-inline d-flex flex-column" @submit.prevent="createBlog">
            <div class="form-group d-flex flex-column">
                <input type="text" v-model="newBlog.title" class="form-control w-100" placeholder="Title"
                    aria-describedby="helpId" />
                <textarea type="text" v-model="newBlog.body" class="form-control" placeholder="Your Text Here"
                    aria-describedby="helpId"></textarea>
                <input type="text" class="form-control" v-model="newBlog.imgUrl" placeholder="Img Url"
                    aria-describedby="helpId" />
                <div class="form-check">
                    <label class="form-check-label active" for="publishCheck">
                        <input class="form-check-input active" type="checkbox" checked="checked" value=""
                            v-model="newBlog.published" id="publishCheck">
                        Publish?
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-success">Create Post!</button>
        </form>
    </div>
</template>

<style>
    textarea {
        resize: none;
        height: 20vh;
    }
</style>


<script>
    export default {
        name: "create-blog",
        data() {
            return {
                newBlog: {

                },
            };
        },
        methods: {
            createBlog() {
                if (this.newBlog.title && this.newBlog.body) {
                    this.$store.dispatch("createBlog", this.newBlog);
                }
                else {
                    console.log('Invalid Input: Title and Body are required fields');
                }
            },
        },

    };
</script>
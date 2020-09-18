<template>
  <div class="home">
    <!-- form for creating new blog -->
    <div class="row">
      <div class="col mt-3">
        <router-link :to="{ name: 'CreatePost' }" class="btn btn-primary">Create Post</router-link>
      </div>
    </div>
    <!-- draws blogs to screen -->
    <blog-component v-for="blog in blogs" :key="blog.id" :blogProp="blog" />
  </div>
</template>

<script>
  import blogComponent from "../components/blogComponent";
  export default {
    name: "home",
    mounted() {
      this.$store.dispatch("getAllBlogs")
    },
    computed: {
      blogs() {
        return this.$store.state.blogs;
      },
    },
    components: {
      blogComponent
    }
  };
</script>
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "../services/AxiosService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    comments: [],
    activeBlog: {
      creator: { name: "" }//prevents error when loading first blog of session
    },
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog
    },
    setComments(state, comments) {
      state.comments = comments
    },
    addComment(state, comment) {
      console.log("index.addComment");
      state.comments = [...state.comments, comment]
    },
    deleteBlog(state, blogId) {
      state.activeBlog = null
      state.blogs.filter(blog => blog.id != blogId)
    },
    editComment(state, comment) {
      state.comments.filter(c => comment.id != c.id)
      state.comments = [...state.comments, comment]
    },
    deleteComment(state, id) {
      state.comments.filter(c => c.id != id)
    }
  },
  actions: {
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlogs({ commit }) {
      try {
        let res = await api.get("blogs")
        commit("setBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({ commit }, blog) {
      try {
        let res = await api.post("blogs", blog)
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async makeActiveBlog({ commit }, blogId) {
      try {
        let res = await api.get("blogs/" + blogId)
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createComment({ commit, dispatch }, comment) {
      try {
        console.log(comment);
        let res = await api.post("comments", comment)
        dispatch('getComments', comment.blog)
      } catch (error) {
        console.error(error)
      }
    },
    async getComments({ commit, dispatch }, blogId) {
      try {
        let res = await api.get("blogs/" + blogId + "/comments")
        commit("setComments", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async editBlog({ commit, dispatch }, blog) {
      try {
        let res = await api.put("blogs/" + blog.id, blog)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBlog({ commit, dispatch }, blogId) {
      try {
        await api.delete("blogs/" + blogId)
        commit("deleteBlog", blogId)
      } catch (error) {
        console.error(error)
      }
    },
    async editComment({ commit, dispatch }, comment) {
      await api.put('comments/' + comment.id, comment)
      commit("editComment", comment)
    },
    async deleteComment({ commit, dispatch }, id) {
      try {
        await api.delete('comments/' + id)
        commit("deleteComment", id)
      } catch (error) {
        console.error(error)
      }
    }
  },
});

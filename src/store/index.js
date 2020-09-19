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
      console.log(state.comments);
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
    async createComment({ commit }, comment) {
      try {
        console.log("index.createComment");
        let res = await api.post("comments", comment)
        commit("addComment", comment)
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
    }
  },
});

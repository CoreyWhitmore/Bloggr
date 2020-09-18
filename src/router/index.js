import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import Profile from "../pages/Profile.vue";
// @ts-ignore
import Blog from "../pages/Blog.vue";
// @ts-ignore
import CreatePost from "../pages/CreatePost.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    beforeEnter: authGuard,
  },
  {
    path: "/blog/:id",
    name: "Blog",
    component: Blog,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

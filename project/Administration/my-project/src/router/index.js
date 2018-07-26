import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Content from "../components/Content.vue";

import Admin from "../components/content/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/content"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/content",
    component: Content
  }
];

export default new VueRouter({
  routes
});

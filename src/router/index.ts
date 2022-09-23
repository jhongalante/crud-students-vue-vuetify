import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import RegisterStudent from "../views/RegisterStudent.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register/student",
    name: "Register",
    component: RegisterStudent,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

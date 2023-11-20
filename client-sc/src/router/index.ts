import { createPinia, type Pinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import authGuards from "@/helpers/auth.guards";

/** Routes */
import HomeView from "@/views/HomeView.vue";
/** Baths */
import AllBathView from "@/views/AllBathsView.vue";
/** Auth */
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    /** Login Form  */
    {
      path: "/login",
      name: "Login",
      beforeEnter: authGuards.redirectLoggedInUser, // redirect if user is logged in
      component: Login,
    },
    /** Register Form */
    {
      path: "/register",
      name: "Register",
      beforeEnter: authGuards.redirectLoggedInUser, // redirect if user is logged in
      component: Register,
    },
    /** All Baths */
    {
      path: "/all-baths",
      name: "All-baths",
      component: AllBathView,
    },
  ],
});

export default router;

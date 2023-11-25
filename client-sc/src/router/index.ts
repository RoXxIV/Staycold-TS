import { createPinia, type Pinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import authGuards from "@/helpers/auth.guards";

/** Routes */
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
/** Baths */
import AllBathView from "@/views/AllBathsView.vue";
/** Auth */
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import ConfirmMail from "@/views/auth/ConfirmMail.vue";

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
    /** Confirmation user account view  */
    {
      path: "/confirm-mail-redirection/:confirmationCode",
      name: "Confirm-mail",
      component: ConfirmMail,
    },
    /** redirect incorrect routes to 404  */
    { path: "/:pathMatch(.*)*", name: "Not-found", component: NotFoundView },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
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
    /** Formulaire de connexion */
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    /** Formulaire d'inscription' */
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    /** Liste de toutes les baignades */
    {
      path: "/all-baths",
      name: "All-baths",
      component: AllBathView,
    },
  ],
});

export default router;

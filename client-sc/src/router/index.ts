import { createPinia, type Pinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import authGuards from "@/helpers/auth.guards";

/** Routes */
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ContactFormView from "@/views/ContactFormView.vue";
/** Baths */
import AllBathView from "@/views/AllBathsView.vue";
/** Auth */
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import ConfirmMailView from "@/views/auth/ConfirmMailView.vue";
import ResetPasswordView from "@/views/auth/ResetPasswordView.vue";
import SetNewPasswordView from "@/views/auth/SetNewPasswordView.vue";

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
      component: LoginView,
    },
    /** Register Form */
    {
      path: "/register",
      name: "Register",
      beforeEnter: authGuards.redirectLoggedInUser, // redirect if user is logged in
      component: RegisterView,
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
      component: ConfirmMailView,
    },
    /** Reset password view  */
    {
      path: "/reset-password",
      name: "Reset-password",
      component: ResetPasswordView,
    },
    /** Set new password view  */
    {
      path: "/set-new-password/:confirmationCode",
      name: "Set-new-password",
      component: SetNewPasswordView,
    },
    /** Contact form view  */
    {
      path: "/contact-form",
      name: "Contact-form",
      component: ContactFormView,
    },
    /** redirect incorrect routes to 404  */
    { path: "/:pathMatch(.*)*", name: "Not-found", component: NotFoundView },
  ],
});

export default router;
